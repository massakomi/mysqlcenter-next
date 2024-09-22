'use client'

import {useRouter} from "next/navigation";

export function SearchInTable() {

  const router = useRouter()

  const clearVal = (e) => (e.target.value = '')

  const appendQuery = (e) => {
    e.target.action = e.target.action + '&query='+e.target.query.value
  }

  let table = router.table;
  let forms = []
  let db = ''
  if (table !== '') {
    let url = `?s=tbl_data&db=${db}&table=${table}`
    forms.push(
      <form key="f1" action={url} method="post" className="d-inline me-1" onSubmit={appendQuery.bind(this)}>
        <input type="text" name="query" defaultValue="Поиск по таблице" onFocus={clearVal.bind(this)} />
      </form>
    )
  }
  let url = `?s=search&db=${db}`
  forms.push(
    <form key="f2" action={url} method="post" className="d-inline me-1" onSubmit={appendQuery.bind(this)}>
      <input type="text" name="query" defaultValue="Поиск по базе" onFocus={clearVal.bind(this)} />
    </form>
  )
  return <>{forms}</>
}