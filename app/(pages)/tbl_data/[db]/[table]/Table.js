'use client'

import TableHeader from "@/app/(pages)/tbl_data/[db]/[table]/TableHeader";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setMessages} from "@/lib/features/messagesReducer";
import {htmlspecialchars} from "@/app/ui/functions";
import {useParams, useSearchParams} from "next/navigation";
import {customAction} from "@/app/ui/actions";


export default function Table(props) {

  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMessages(props.messages))
  }, []);


  if (!props.fields) {
    return ''
  }

  // Собираем массив имён полей, и также массив имён только ключевых полей
  let primaryKeys = [], fieldNames = []
  Object.values(props.fields).map(function(v) {
    fieldNames.push(v.Field)
    if (v.Key.indexOf('PRI') > -1) {
      primaryKeys.push(v.Field)
    }
  })

  const fieldsForHeader = (props) => {
    let fields = props.fields;
    if (props.directSQL) {
      fields = []
      for (let field in props.data[0]) {
        let a = {}
        a.Field = field;
        a.Type = $.isNumeric(props.data[0][field]) ? 'int' : 'varchar';
        fields.push(a)
      }
    }
    return fields;
  }

  const deleteRow = async (idRow, event) => {
    if (!confirm('Подтвердите...')) {
      return false;
    }
    let json = await customAction('deleteRow', {db: params.db, table: params.table, row: idRow})
    dispatch(setMessages(json.messages))
    event.target.closest('tr').remove()
  }

  // определение уникального ид ряда
  const getIdRow = (row, primaryKeys) => {
    let pkValues = []
    if (primaryKeys.length > 0) {
      for (let pkCurrent of primaryKeys) {
        if (!row[pkCurrent]) {
          console.log(`Hey! Ключевого поля ${pkCurrent} не найдено в таблице!?`)
          continue;
        }
        pkValues.push(`${pkCurrent}="${row[pkCurrent]}"`);
      }
    } else {
      for (let pkCurrent of fieldNames) {
        if (!row[pkCurrent]) {
          continue;
        }
        pkValues.push(`${pkCurrent}="${row[pkCurrent]}"`);
      }
    }
    return encodeURIComponent(pkValues.join(' AND '));
  }

  let fields = fieldsForHeader(props);

  // Собираем ряды
  let trs = []
  for (let row of props.data) {

    let idRow = getIdRow(row, primaryKeys)

    // создание ссылок на действия
    let values = [
      <input name="row[]" type="checkbox" value={idRow} className="cb" id={`c${idRow}`} />,
      <a href={`/tbl_change/${params.db}/${params.table}/?row=${idRow}`} title="Редактировать ряд"><img src={`/images/edit.gif`} alt="" border="0" /></a>,
      <span onClick={deleteRow.bind(this, idRow)} title="Удалить ряд"><img src={`/images/close.png`} alt="" border="0" role="button" /></span>
    ]

    // загрузка данных
    let i = 0
    for (let key in row) {
      let type = "varchar";
      if (fields[i]) {
        type = fields[i].Type
      }
      let val = processRowValue(row[key], type, props.textCut)
      values.push(val)
      i ++
    }

    let tds = [];
    let z = 0;
    for (let value of values) {
      tds.push(<td key={z}>{value}</td>)
      z ++;
    }
    trs.push(
      <tr key={trs.length}>{tds}</tr>
    )
  }

  return (
    <TableHeader {...props} fieldsEx={fields}>
      {trs}
    </TableHeader>
  );
}


/**
 * (для tbl_data и tbl_compare) Обрабатывает значения полей базы данных перед выводом их в виде таблицы.
 * Обработка заключается в: для текстовых - htmlspecialchars+обрезка, для даты - отображение в поле id=tblDataInfoId
 * для нулевых значений - значение возвращается оформленным курсивом.
 *
 * @package data view
 * @return string Обработанное значение
 * @param value
 * @param type
 * @param textCut
 */
function processRowValue(value, type, textCut) {
  if (value === null) {
    value = <i>NULL</i>
  } else {
    // Тексты
    if (type.match(/(blob|text|char)/i)) {
      value = htmlspecialchars(value)
    }
    if (value.length > textCut) {
      let fullText = new URL(location.href).searchParams.get('fullText');
      if (fullText == '') {
        value = value.substring(0, textCut)
      }
    }
    // дата
    if (type.match(/(int)/i) && value.length === 10 && $.isNumeric(value)) {
      //$e = ' onmouseover="get(\'tblDataInfoId\').innerHTML=\''.date(MS_DATE_FORMAT, $v).'\'" onmouseout="get(\'tblDataInfoId\').innerHTML=\'\'"';
      //$v = '<span className="dateString"'.$e.'>'.$v.'</span>';
    }
  }
  return value
}