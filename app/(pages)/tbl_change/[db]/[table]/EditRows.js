'use client';

import AddRow from '@/app/(pages)/tbl_change/[db]/[table]/AddRow';
import {Fragment} from 'react';
import {tblChange} from '@/app/ui/actions';
import {setMessages} from '@/lib/features/messagesReducer';
import {useParams, useRouter} from 'next/navigation';
import {useDispatch} from 'react-redux';

export default function EditRows(props) {

  const params = useParams()
  const dispatch = useDispatch();
  const router = useRouter();

  const executeAction = async (event) => {
    event.preventDefault()
    let formData = new FormData(event.target);
    const json = await tblChange(params, formData)
    dispatch(setMessages(json.messages))
    setTimeout(function() {
      if (formData.get('afterInsert') === 'tbl_data') {
        router.push(`/tbl_data/${params.db}/${params.table}`);
      }
      if (formData.get('afterInsert') === 'tbl_list') {
        router.push(`/tbl_list/${params.db}`);
      }
      if (formData.get('afterInsert') === 'tbl_change') {
        router.push(`/tbl_change/${params.db}/${params.table}`);
      }
      dispatch(setMessages([]))
    }, 2000);
  }

  let outerRows = []
  let j = 0
  for (let j = 0; j < props.tableData.length; j++) {
    let data = props.tableData[j]

    let pk = []
    let tableInnerRows = Object.keys(data).map((field, i) => {
      let value = data[field]
      let key = props.fields[field].Key;
      if (key.indexOf('PRI') > -1) {
        pk.push(field+'="'+value+'"')
      }
      return <AddRow key={'row'+i} name={field} fields={props.fields} value={value} i={i} j={j} />
    });

    let cond = pk.join(' AND ')
    if (pk.length === 0) {
      for (let field of Object.keys(props.fields)) {
        let value = data[field]
        if (value == null) {
          continue;
        }
        pk.push(field+'="'+value+'"')
      }
    }
    let hiddenInput = (<input name="cond[]" type="hidden" value={cond} />)

    let tableInner = (
      <Fragment key={"row-"+j}>{hiddenInput}
        <table className='mb-3'>
          <tbody>
          <tr className="editHeader">
            <td>Поле</td>
            <td>Ноль</td>
            <td>Ряд #<span>{j + 1}</span></td>
            <td>Функция </td>
          </tr>
          {tableInnerRows}
          </tbody>
        </table>
      </Fragment>)
    outerRows.push(tableInner)
    j ++
  }

  return (
    <form onSubmit={executeAction} className="tableFormEdit">
      <input type="hidden" name="action" value="rowsEdit" />
      {outerRows}

      <label htmlFor="f3"><input name="option" type="radio" value="save" id="f3" defaultChecked /> сохранить</label>	<br /> или <br />
      <label htmlFor="f4"><input name="option" type="radio" value="insert" id="f4" /> вставить новый ряд</label>	<br />

      <br />
      после вставки
      <input name="afterInsert" type="radio" id="f2" value="tbl_data" defaultChecked /> <label htmlFor="f2">обзор таблицы</label>
      <input name="afterInsert" type="radio" id="f3" value="tbl_list" /> <label htmlFor="f3">список таблиц</label>
      <input name="afterInsert" type="radio" id="f4" value="tbl_change" /> <label htmlFor="f4">вставить новую запись</label>

      <input tabIndex="100" type="submit" value="Изменить данные!" className="submit" />
    </form>
  );
}
