import {customAction, invalidatePath} from '@/app/ui/actions';
import {setMessages} from "@/lib/features/messagesReducer";
import {useDispatch} from "react-redux";
import Link from "next/link";
import {setValue} from '@/lib/features/paramsReducer';

export default function Table(props) {

  const dispatch = useDispatch()
  let databases = props.databases;
  const executeAction = async (db, i) => {
    if (!confirm('Подтвердите...')) {
      return false;
    }
    dispatch(setValue({loading: true}))
    let json = await customAction('dbDelete', {db})
    dispatch(setValue({loading: false}))
    dispatch(setMessages(json.messages))
    if (json.status === true) {
      await invalidatePath('/db_list')
    }
  }

  const dbHide = async (db, action, event) => {
    let json = await customAction('dbHide', `db=${db}&act=${action}`)
    dispatch(setMessages(json.messages))
    if (json.status === true) {
      await invalidatePath('/db_list')
    }
  }

  let mscExists = databases.includes('mysqlcenter')
  let rows = []
  for (let i = 0; i < databases.length; i++) {
    let db = databases[i];
    let classes = []
    let action = '';
    if (mscExists && props.hiddens.includes(db)) {
      classes.push('grey')
      action = 'show'
    }
    let href = `/tbl_list/${db}/`
    let idRow = "db"+db;
    rows.push(
      <tr key={i}>
        <td><input name="databases[]" type="checkbox" value={db} className="cb" /></td>
        <td><Link href={href} title="Структура БД" id={idRow} className={classes.join(' ')}>{db}</Link></td>
        <td>
          <span role="button" onClick={() => executeAction(db, i)} title={'Удалить '+db}><img src={"/images/close.png"} alt="" border="0" /></span> &nbsp;
          <Link href={`/actions/${db}/`} title="Изменить"><img src={"/images/edit.gif"} alt="" border="0" /></Link> &nbsp;
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