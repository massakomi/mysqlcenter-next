'use client'
import {configPage} from '@/app/ui/actions'
import {setMessages} from '@/lib/features/messagesReducer'
import {useDispatch} from 'react-redux'

export function Buttons() {
  const dispatch = useDispatch()

  const update = async (event) => {
    event.preventDefault()
    let formData = new FormData(event.target.closest('form'))
    let json = await configPage('', formData)
    dispatch(setMessages(json.messages))
  }

  const restore = async (event) => {
    let json = await configPage('restore')
    dispatch(setMessages(json.messages))
  }

  return (
    <>
      <input type="button" onClick={update.bind(this)} value="Изменить" className="submit" />
      <p className='text-center float-end'>
        <input type="button" onClick={restore} value="Восстановить значения по умолчанию" />
      </p>
    </>
  )
}