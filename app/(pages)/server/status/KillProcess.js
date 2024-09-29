'use client'
import {customAction} from '@/app/ui/actions'
import {setMessages} from '@/lib/features/messagesReducer'
import {useDispatch} from 'react-redux'

export function KillProcess(props) {
  const dispatch = useDispatch()

  const killProcess = async (id) => {
    let json = await customAction('killProcess', {id})
    dispatch(setMessages(json.messages))
  }

  return (
    <>
      <button onClick={killProcess.bind(this, props.id)}>
        Kill
      </button>
    </>
  )
}