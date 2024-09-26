'use client'
import Table from '@/app/ui/Table'
import {useParams} from 'next/navigation'
import {useState} from 'react'
import {querySwr} from '@/app/ui/functions';

export function Info() {
  const params = useParams()

  const [act, setAct] = useState('')
  let { props, error, isLoading } = querySwr({s: 'actions', db: params.db, act})

  return (
    <fieldset className="msGeneralForm">
      <legend>Информация о базе данных</legend>
      {isLoading ? <>Загрузка...</> : <Table data={props.dbInfo} />}
      <br />
      <span onClick={() => setAct('fullinfo')} className="grey" role="button">
        Показать полную информацию
      </span>
    </fieldset>
  )
}