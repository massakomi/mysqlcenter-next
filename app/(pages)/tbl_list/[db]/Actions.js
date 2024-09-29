'use client'

import {chbx_action, checkedCheckboxes, prepareAction} from '@/app/ui/functions'
import {useParams, useRouter, useSearchParams} from 'next/navigation'
import {customAction, invalidatePath} from '@/app/ui/actions';
import {setMessages} from '@/lib/features/messagesReducer'
import {useDispatch} from 'react-redux'
import DateSelector from '@/app/(pages)/tbl_list/[db]/DateSelector'
import {useState} from 'react';

export default function Actions({setTables, tables}) {
  const dispatch = useDispatch()
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filtered, setFiltered] = useState(false);

  if (searchParams.get('action')) {
    return <></>
  }

  const executeAction = async (act, event) => {
    let {action, formData} = prepareAction(act, event, 'table[]', params)
    if (!formData) {
      alert('Не выбраны таблицы')
      return
    }
    formData.set('db', params.db)
    let json = await customAction(action, formData)
    dispatch(setMessages(json.messages))
    if (json.status === true) {
      await invalidatePath(`/tbl_list/${params.db}`)
      setTimeout(function() {
        location.reload()
      }, 2000);
    }
  }

  const executeAllAction = async (event) => {
    let formData = new FormData()
    formData.set('db', params.db)
    formData.set('act', event.currentTarget.value)
    let json = await customAction('dbAllAction', formData)
    dispatch(setMessages(json.messages))
  }

  const redirectAction = async (act, url, e) => {
    const checked = checkedCheckboxes()
    if (act === 'export_all') {
      router.push(`/export/${params.db}/?tables=${checked.join(',')}`)
    }
  }

  const chbxAction = (opt, e) => {
    e.preventDefault()
    chbx_action(opt, 'table[]')
  }

  const makeInnodb = async () => {
    let json = await customAction('dbAllAction', `db=${params.db}&act=makeInnodb`)
    dispatch(setMessages(json.messages))
  }

  const filterByDate = () => {
    let year = document.querySelector('[name="ds_year"]').value
    let month = document.querySelector('[name="ds_month"]').value
    let day = document.querySelector('[name="ds_day"]').value
    let h = document.querySelector('[name="ds_hour"]').value
    let m = document.querySelector('[name="ds_minut"]').value
    let s = document.querySelector('[name="ds_second"]').value
    let date = new Date(year, month, day, h, m, s)

    let tablesFiltered = Object.values(tables).filter((table, key) => {
      let now = new Date(table.Update_time)
      return now > date
    })
    setTables(tablesFiltered)
    setFiltered(true)
  }

  const resetFilter = () => {
    setTables([...tables])
    setFiltered(false)
  }

  return (
    <>
      <div className="chbxAction">
        <img src={`/images/arrow_ltr.png`} alt="" />
        <span role="button" onClick={chbxAction.bind(this, 'check')} id="chooseAll" className="mr-2">
          выбрать все
        </span>
        <span role="button" onClick={chbxAction.bind(this, 'uncheck')}>
          очистить
        </span>
      </div>

      <div className="imageAction">
        <u>Выбранные</u>
        <img src={`/images/close.png`} alt="" onClick={executeAction.bind(this, 'delete_all')} />
        <img src={`/images/delete.gif`} alt="" onClick={executeAction.bind(this, 'truncate_all')} />
        <img src={`/images/copy.gif`} alt="" onClick={executeAction.bind(this, 'copy_all')} />
        <img src={`/images/b_tblexport.png`} alt="" onClick={redirectAction.bind(this, 'export_all')} />

        <span role="button" className="mx-2" onClick={makeInnodb}>
          Конвертировать все в Innodb
        </span>

        <select name="act" onChange={executeAllAction.bind(this)}>
          <option></option>
          <option value="check">проверить</option>
          <option value="analyze">анализ</option>
          <option value="optimize">оптимизировать</option>
          <option value="repair">починить</option>
          <option value="flush">сбросить кэш</option>
        </select>
      </div>

      <form className="showtableupdated">
        Показать таблицы обновлённые с <DateSelector />
        <input type="button" value="Показать!" onClick={filterByDate.bind(this)} />
        <input type="button" value="Сбросить!" hidden={!filtered} onClick={resetFilter} />
      </form>
    </>
  )
}