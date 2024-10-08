'use client'
import {useParams, useRouter} from 'next/navigation'

export function FormField(props) {
  const params = useParams()
  const router = useRouter()

  const goToTblAdd = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const queryString = new URLSearchParams(formData).toString()
    let path = `/tbl_add/${params.db}/${params.table}/?${queryString}`
    router.push(path)
  }

  const selectOnFocus = (e) => {
    document.getElementById('f3').checked = true
  }

  return (
    <>
      <form onSubmit={goToTblAdd}>
        <input type="hidden" name="action" value="fieldsAdd" />
        Добавить полей &nbsp; <input name="fieldsNum" type="number" required defaultValue="1" min="1" size="5" className="w-12" /> &nbsp;
        <label className='me-1'>
          <input name="afterOption" type="radio" value="end" defaultChecked /> в конец{' '}
        </label>
        <label>
          <input name="afterOption" type="radio" value="start" /> в начало
        </label>
        <label>
          <input name="afterOption" type="radio" value="field" /> после{' '}
        </label>
        <select name="afterField" onFocus={selectOnFocus}>
          {Object.values(props.data).map((table) => (
            <option key={table.Field}>{table.Field}</option>
          ))}
        </select>
        &nbsp;
        <input type="submit" value="Добавить!" />
      </form>
    </>
  )
}
