'use client'

import {customAction, invalidatePath} from "@/app/ui/actions";
import {setMessages} from "@/lib/features/messagesReducer";
import {useParams, useRouter} from "next/navigation";
import {useDispatch} from "react-redux";

export default function KeyForm(props) {

  let types = ['PRIMARY KEY','INDEX','UNIQUE','FULLTEXT']
  const params = useParams();
  const dispatch = useDispatch();
  const router = useRouter()

  const addRow = (tableId) => {

  }
  const removeRow = (tableId) => {

  }

  const addKey = async (event) => {
    event.preventDefault()
    let formData = new FormData(event.target)
    formData.set('db', params.db)
    formData.set('table', params.table)
    const json = await customAction('addKey', formData);
    dispatch(setMessages(json.messages))
    if (json.status) {
      let url = `/tbl_struct/${params.db}/${params.table}`;
      await invalidatePath(url)
      setTimeout(function() {
        router.push(url)
      }, 1000);
    }
  }

  return (
    <>
      <form onSubmit={addKey} className="tableFormEdit">

        имя индекса:
        <input type="text" required name="keyName" defaultValue={props.keyName} /><br /><br />
        тип индекса:
        <select name="keyType" value={props.keyType}>
          {types.map((t) =>
            <option key={t}>{t}</option>
          )}
        </select>

        <br /><br />

        <img src="/images/nolines_plus.gif" alt="" border="0" onClick={addRow.bind(this, 'tableFormEdit', 'last')} title="Добавить поле" style={{cursor: 'pointer'}}  />
        <img src="/images/nolines_minus.gif" alt="" border="0" onClick={removeRow.bind(this, 'tableFormEdit')}  title="Удалить поле" style={{cursor: 'pointer'}} /><br />

        <table id="tableFormEdit">
          <tbody>
          <tr>
            <th>Поле</th>
            <th>Размер</th>
          </tr>
          <tr>
            <td>
              <select name="field[]">
                {Object.keys(props.fieldRows).map((field) =>
                  <option value={field} key={field}>{props.fieldRows[field]}</option>
                )}
              </select>
            </td>
            <td><input type="text" name="length[]" size="10" /></td>
          </tr></tbody>
        </table>

        <input type="submit" value="Выполнить" className="submit" />
      </form>
    </>
  )
}