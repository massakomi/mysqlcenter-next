'use client'
import {customAction} from '@/app/ui/actions'
import {setMessages} from '@/lib/features/messagesReducer'
import {useDispatch} from 'react-redux'
import {useParams, useRouter} from 'next/navigation'
import {setValue} from '@/lib/features/paramsReducer';

export default function FieldSet(props) {
  const dispatch = useDispatch()
  const params = useParams()
  const router = useRouter();


  const executeAction = async (action, event) => {
    event.preventDefault()
    let formData = new FormData(event.target)
    dispatch(setValue({loading: true}))
    let json = await customAction(action, formData)
    dispatch(setValue({loading: false}))
    dispatch(setMessages(json.messages))
    if (action === 'dbRename' || action === 'dbCopy') {
      setTimeout(function () {
        router.push(`/actions/${formData.get('newName')}`);
      }, 1000)
    }
  }

  return (
    <fieldset className="msGeneralForm">
      <legend>{props.title}</legend>
      <form onSubmit={executeAction.bind(this, props.action)}>
        <input type="hidden" name="db" value={params.db} />
        {props.children}
        <input type="submit" value="Выполнить!" />
      </form>
    </fieldset>
  )
}
