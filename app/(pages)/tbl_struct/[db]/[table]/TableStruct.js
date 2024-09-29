'use client'

import {wordwrap} from "@/app/ui/functions";
import Link from "next/link";
import {customAction, invalidatePath} from "@/app/ui/actions";
import {setMessages} from "@/lib/features/messagesReducer";
import {useParams, usePathname, useRouter} from "next/navigation";
import {useDispatch} from "react-redux";

export default function TableStruct(props) {

  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter()

  const deleteField = async (field, event) => {
    if (!confirm('Подтвердите...')) {
      return ;
    }
    let formData = new FormData()
    formData.set('db', props.db)
    formData.set('table', props.table)
    formData.set('field', field)
    const json = await customAction('deleteField', formData);
    dispatch(setMessages(json.messages))
    await invalidatePath(pathname)
    setTimeout(function() {
      location.reload()
    }, 2000);
  }


  const listItems = Object.values(props.data).map((v, k) => {
    let key = v.Key;
    if (key === 'PRI') {
      key = <img src="/images/acl.gif" alt="" border="0" />
    }
    for (let keyObject of props.dataKeys) {
      if (keyObject.Column_name === v.Field) {
        let foreignKeys = props.foreignKeys[v.Field]
        if (keyObject.Key_name.indexOf('FK') === 0 || (foreignKeys && foreignKeys.CONSTRAINT_TYPE === 'FOREIGN KEY')) {
          key = <span title={foreignKeys && foreignKeys.REFERENCED_TABLE_NAME ? foreignKeys.REFERENCED_TABLE_NAME : keyObject.Table}>FK</span>
        }
      }
    }
    let editUrl = `/tbl_add/${props.db}/${props.table}/?fields=${encodeURIComponent(v.Field)}`
    return (
      <tr id={"f-"+v.Field} key={v.Field}>
        <td><input name="field[]" id={"field"+k} type="checkbox" value={v.Field} className="cb" /></td>
        <td>{v.Field}</td>
        <td>{wordwrap(v.Type)}</td>
        <td>{v.Null}</td>
        <td>{v.Default}</td>
        <td>{key}</td>
        <td>{v.Extra}</td>
        <td><Link href={editUrl} title="Редактировать ряд"><img src="/images/edit.gif" alt="" /></Link></td>
        <td><span role="button" onClick={deleteField.bind(this, v.Field)} title="Удалить ряд"><img src="/images/close.png" alt="" /></span></td>
      </tr>
    )
  });

  return (
    <table className="contentTable">
      <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Поле</th>
        <th>Тип</th>
        <th>NULL</th>
        <th>По умолчанию</th>
        <th>Ключ</th>
        <th>Дополнительно</th>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
      </tr></thead>
      <tbody>
      {listItems}
      </tbody>
    </table>
  )
}
