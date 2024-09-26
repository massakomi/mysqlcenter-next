'use client';
import AddRow from '@/app/(pages)/tbl_change/[db]/[table]/AddRow';
import {useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import {useDispatch} from 'react-redux';
import {tblChange} from '@/app/ui/actions';
import {setMessages} from '@/lib/features/messagesReducer';

export default function AddRows(props) {

  const [msRowsInsert, setRowsInsert] = useState(props.msRowsInsert);

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

  const addDataRow = (inc) => {
    setRowsInsert(msRowsInsert + inc)
  }

  let outerRows = []
  for (let j = 0; j < msRowsInsert; j++) {
    let tableInnerRows = Object.values(props.fields).map((field, i) =>
      <AddRow key={field.Field} name={field.Field} i={i} j={j} fields={props.fields} />
    );
    let tableInner = (
      <table style={{marginBottom: '10px'}}>
        <tbody>
        <tr className="editHeader">
          <td>Поле</td>
          <td>Ноль</td>
          <td>Ряд #<span>{j + 1}</span></td>
          <td>Функция</td>
        </tr>
        {tableInnerRows}
        </tbody>
      </table>)
    outerRows.push(<tr key={"row-"+j}><td className="inner">{tableInner}</td></tr>)
  }

  return (
    <form onSubmit={executeAction} className="tableFormEdit">
      <input type="hidden" name="action" value="rowsAdd" />
      <img src="/images/nolines_plus.gif" alt="" border="0" onClick={addDataRow.bind(this, 1)} title="Добавить поле" style={{cursor: 'pointer'}} />
      <img src="/images/nolines_minus.gif" alt="" border="0" onClick={addDataRow.bind(this, -1)} title="Удалить поле" style={{cursor: 'pointer'}} /><br />
      <table id="tableDataAdd">
        <tbody>
        {outerRows}
        </tbody>
      </table>
      <br />
      после вставки
      <input name="afterInsert" type="radio" id="f2" value="tbl_data" defaultChecked /> <label htmlFor="f2">обзор таблицы</label>
      <input name="afterInsert" type="radio" id="f3" value="tbl_list" /> <label htmlFor="f3">список таблиц</label>
      <input name="afterInsert" type="radio" id="f4" value="tbl_change" /> <label htmlFor="f4">вставить новую запись</label>
      <br /><br />
      <input tabIndex="100" type="submit" value="Вставить данные!" />
    </form>
  );
}

