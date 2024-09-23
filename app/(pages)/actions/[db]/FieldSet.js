'use client'
import {customAction} from "@/app/ui/actions";
import {setMessages} from "@/lib/features/messagesReducer";
import {useDispatch} from "react-redux";
import {useParams, useRouter} from "next/navigation";

export default function FieldSet(props) {

  const dispatch = useDispatch();
  const params = useParams();
  const router = useRouter()

  const executeAction = async (action, event) => {
    event.preventDefault()
    let formData = new FormData(event.target);
    let json = await customAction(action, formData);
    dispatch(setMessages(json.message))
    if (action === 'dbRename' || action === 'dbCopy') {
      router.push(`/actions/${formData.get('newName')}`)
    }
  }

  return (
    <fieldset className="msGeneralForm">
      <legend>{props.title}</legend>
      <form onSubmit={executeAction.bind(this, props.action)}>
        <input type="hidden" name="db" value={params.db} />
        {props.children}
        <input type="submit" value="Выполнить!" style={{marginLeft: '5px'}} />
      </form>
    </fieldset>
  )
}