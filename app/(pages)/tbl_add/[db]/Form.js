'use client'

import TableName from "./TableName";import DrawFields from "./DrawFields";
import {addRowWithInputs, removeRow} from "@/app/ui/functions";
import {tblAdd} from "@/app/ui/actions";
import {useParams} from "next/navigation";
import {setMessages} from "@/lib/features/messagesReducer";
import {useDispatch} from "react-redux";

export default function Form(props) {

  const params = useParams()
  const dispatch = useDispatch();

  const executeAction = async (event) => {
    event.preventDefault()
    let formData = new FormData(event.target);
    const json = await tblAdd(params, formData)
    dispatch(setMessages(json.messages))
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