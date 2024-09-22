import {dbDelete, dbHide} from "@/app/ui/actions";
import {useState} from "react";
import {setMessages} from "@/lib/features/messagesReducer";
import {useDispatch} from "react-redux";

export default function Table(props) {

  const dispatch = useDispatch()
  const [databases, setDatabases] = useState(props.databases);
  const dbDeleteConfirm = (db, i) => {
    if (!confirm('Подтвердите...')) {
      return false;
    }
    dbDelete(db).then((json) => {
      if (json.status === true) {
        databases.splice(i, 1)
        dispatch(setMessages(json.message))
        setDatabases([...databases])
      }
    })
  }

  let mscExists = databases.includes('mysqlcenter')
  let rows = []
  for (let i = 0; i < databases.length; i++) {
    let db = databases[i];
    let styles = {}
    let action = '';
    if (mscExists && props.hiddens.includes(db)) {
      styles = {color: '#ccc'}
      action = 'show'
    }
    let href = `/tbl_list/${db}/`
    let idRow = "db"+db;
    rows.push(
      <tr key={i}>
        <td><input name="databases[]" type="checkbox" value={db} className="cb" /></td>
        <td><a href={href} title="Структура БД" id={idRow} style={styles}>{db}</a></td>
        <td>
          <span role="button" onClick={() => dbDeleteConfirm(db, i)} title={'Удалить '+db}><img src={"/images/close.png"} alt="" border="0" /></span> &nbsp;
          <a href={`/actions/${db}/`} title="Изменить"><img src={"/images/edit.gif"} alt="" border="0" /></a> &nbsp;
          {mscExists ?
            <span role="button" onClick={dbHide.bind(this, db, action)} title={'Спрятать/показать ' + db}><img src={"/images/open-folder.png"} alt="" border="0" width="16" /></span> : null}
        </td>
      </tr>
    )
  }

  return (
    <table className="contentTable" id="structureTableId">
      <thead>
      <tr>
        <th></th>
        <th>Название</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {rows}
      </tbody>
    </table>
  );
}