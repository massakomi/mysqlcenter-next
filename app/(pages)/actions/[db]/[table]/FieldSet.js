'use client'
import {customAction} from '@/app/ui/actions'
import {setMessages} from '@/lib/features/messagesReducer'
import {useDispatch} from 'react-redux'
import {useParams, useRouter} from 'next/navigation'

export default function FieldSet(props) {
  const dispatch = useDispatch()
  const params = useParams()

  const executeAction = async (action, event) => {
    event.preventDefault()
    let formData = new FormData(event.target)
    let json = await customAction(action, formData)
    dispatch(setMessages(json.messages))
    redirect(action, formData, params)
  }

  return (
    <fieldset className="msGeneralForm">
      <legend>{props.title}</legend>
      <form onSubmit={executeAction.bind(this, props.action)}>
        <input type="hidden" name="db" value={params.db} />
        <input type="hidden" name="table" value={params.table} />
        {props.children}
        <input type="submit" value="Выполнить!" style={{marginLeft: '5px'}} />
      </form>
    </fieldset>
  )
}

function redirect(action, formData, params) {
  let redirect
  if (action === 'tableRename') {
    redirect = `/actions/${params.db}/${formData.get('newName')}`
  }
  if (action === 'tableMove' || action === 'tableCopyTo') {
    redirect = `/actions/${formData.get('newDB')}/${formData.get('newName')}`
  }
  setTimeout(function () {
    if (redirect) {
      location.href = redirect
    }
  }, 1000)
}
