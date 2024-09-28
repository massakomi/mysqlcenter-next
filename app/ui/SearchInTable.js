'use client'

import {useParams, useRouter} from "next/navigation";

export function SearchInTable() {

  const params = useParams();
  if (!params.db) {
    return ;
  }

  const clearVal = (e) => (e.target.value = '')

  let forms = []
  if (params.table !== undefined) {
    forms.push(
      <form key="f1" action={`/tbl_data/${params.db}/${params.table}/`} method="get" className="inline me-1">
        <input type="text" name="query" defaultValue={`Поиск по таблице`} onFocus={clearVal.bind(this)} />
      </form>
    )
  }
  forms.push(
    <form key="f2" action={`/search/${params.db}/`} method="get" className="inline me-1">
      <input type="text" name="query" defaultValue="Поиск по базе" onFocus={clearVal.bind(this)} />
    </form>
  )
  return <>{forms}</>
}