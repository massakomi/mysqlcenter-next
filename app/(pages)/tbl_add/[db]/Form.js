'use client'

import TableName from "./TableName";import DrawFields from "./DrawFields";
import {addRowWithInputs, removeRow} from "@/app/ui/functions";
import {invalidatePath, tblAdd} from '@/app/ui/actions';
import {useParams, useRouter} from 'next/navigation';
import {setMessages} from "@/lib/features/messagesReducer";
import {useDispatch} from "react-redux";

export default function Form(props) {

  const params = useParams()
  const dispatch = useDispatch();
  const router = useRouter();


  const executeAction = async (event) => {
    event.preventDefault()
    let formData = new FormData(event.target);
    const json = await tblAdd(params, formData)
    dispatch(setMessages(json.messages))
    if (json.status === true) {
      let path;
      if (!params.table) {
        await invalidatePath(`/tbl_list/${params.db}`)
        path = `/tbl_list/${params.db}`
      } else {
        path = `/tbl_struct/${params.db}/${formData.get('table_name')}`
      }
      setTimeout(function() {
        router.push(path);
      }, 2000);
    }
  }

  if (props.array.length === 0) {
    return <>Поле не существует</>
    //getArrayFromPost(); ??? что это
  }

  return (
    <form onSubmit={executeAction} className="tableFormEdit" >
      <TableName {...props} />
      {props.afterSql && <input type="hidden" name="afterSql" value={props.afterSql} /> }
      <input type="hidden" name="action" value={props.action} />

      <img src={`/images/nolines_plus.gif`} alt="" border="0" onClick={addRowWithInputs.bind(this, 'tableFormEdit')} title="Добавить поле" role='button' />
      <img src={`/images/nolines_minus.gif`} alt="" border="0" onClick={removeRow.bind(this, 'tableFormEdit')}  title="Удалить поле" role='button' /><br />
      <DrawFields {...props} />

      <input tabIndex="100" type="submit" value="Выполнить!" className="submit" />
    </form>
  );
}