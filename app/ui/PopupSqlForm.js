'use client'
import {useEffect, useRef, useState} from 'react';
import {sqlPage} from '@/app/ui/actions'
import {setMessages} from '@/lib/features/messagesReducer'
import {useDispatch} from 'react-redux'
import {useParams, usePathname, useRouter} from 'next/navigation';

export function PopupSqlForm() {
  const [opened, setOpened] = useState(false)
  const dispatch = useDispatch()
  const textareaRef = useRef(false)
  const params = useParams()
  const router = useRouter();
  const pathname = usePathname()
  if (!params.db) {
    return
  }

  /*useEffect(() => {
    if (opened) {
      textareaRef.current.focus()
      cannot update a component (`HotReload`) while rendering a different component (`PopupSqlForm`).
       To locate the bad setState() call inside `PopupSqlForm`, follow the stack trace as described in
    }
  }, [opened]);*/

  const sql = async (event) => {
    event.preventDefault()
    let formData = new FormData(event.target)
    router.push(`/sql/${params.db}`)
    // document.getElementById('sqlContent').value = formData.get('sql')
    // select * from a_config
    //document.getElementById('sqlSubmit').click()
    //let json = await sqlPage(formData)
    //dispatch(setMessages(json.messages))
  }

  return (
    <>
      <span className="me-3 hiddenText" onClick={() => setOpened(!opened)} title="Кликните, чтобы открыть форму быстрого запроса">
        quick-sql
      </span>
      <form onSubmit={sql.bind(this)} hidden={!opened} className="text-right popupGeneralForm tableFormEdit">
        <input type="submit" value="Отправить запрос!" />
        <textarea name="sql" rows="15" wrap="off" ref={textareaRef}></textarea>
        <span onClick={() => setOpened(false)}>закрыть</span>
        <input type="hidden" name="db" value={params.db} />
      </form>
    </>
  )
}
