import HtmlSelector from "@/app/(pages)/search/[db]/HtmlSelector";
import {exportSpPage} from "@/app/ui/actions";
import {FormSpecial} from "./FormSpecial";
export default async function Page({params}) {

  const props = await exportSpPage(params.db)

  const trs = Object.values(props.data).map((item, i) => {

    let valueTable, where, valueMax, pKey
    let checkedStruct = false;
    let checkedData = true;
    // let tprefix = item.Name.substr(0, iten.Name.indexOf('_'))

    // Определение видимости таблицы
    let configInfo = props.configSet[item.Name];
    if (!configInfo) {
      checkedData = false
    } else {
      // Определение необхдоимости экспорта данных и стр-ры
      if (configInfo.struct == 1) {
        checkedStruct = true
      }
      if (configInfo.data != 1) {
        checkedData = false
      }
      // Определение верхнего значение PK
      valueMax = configInfo.pk_top == 0 ? null : configInfo.pk_top;
      where = configInfo.where_sql;
    }

    // Определение ключевого поля и создание массива полей
    let fnames = []
    for (let field in item.Fields) {
      fnames.push(field)
      if (item.Fields[field].Key.indexOf('PRI') > -1) {
        pKey = field;
      }
    }
    // Создание ряда
    valueTable = item.Name
    if (!checkedData && !checkedStruct) {
      valueTable = <span className='text-slate-500'>{valueTable}</span>
    } else {
      valueTable = <b>{valueTable}</b>
    }

    return (
      <tr key={i}>
        <td><label htmlFor={`row${i}`}>{valueTable}</label></td>
        <td>
          <input name={`struct[${i}]`} type="checkbox" value="1" id={`row${i}`} className="cb" defaultChecked={checkedStruct} />
          <input name={`table[${i}]`} type="hidden" value={item.Name} />
        </td>
        <td><input name={`data[${i}]`} type="checkbox" value="1" id={`row2${i}`} className="cb" defaultChecked={checkedData} /></td>
        <td><HtmlSelector data={fnames} name={`from[${i}]`} value={pKey} /></td>
        <td><input name={`from[${i}]`} type="text" size="5" defaultValue="1" /> - <input name="to['.$i.']" type="text" size="5" defaultValue={valueMax} /></td>
        <td><input name={`where[${i}]`} type="text" size="40" defaultValue={where} /></td>
      </tr>
    )
  });

  props.setsArray.unshift('Загрузить установку')

  return (
    <>
      <h1>Специальный экспорт данных</h1>
      <form method="post" action="" name="formExport">
        <FormSpecial {...props} />
        <table className="contentTable">
          <thead>
          <tr>
            <th>Таблица</th>
            <th>Структ</th>
            <th>Данные</th>
            <th>Поле</th>
            <th>Диапазон</th>
            <th>WHERE</th>
          </tr></thead>
          <tbody>
          {trs}
          </tbody>
        </table>

      </form>
    </>
  )
}