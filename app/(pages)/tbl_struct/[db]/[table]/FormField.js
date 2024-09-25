'use client'
export function FormField(props) {

  const checkEmpty = (e) => {
    e.preventDefault()
    checkEmpty(e.target, 'fieldsNum')
  }

  const selectOnFocus = (e) => {
    //get('f3').checked = true
  }

  return (
    <>
      <form action={props.addTableUrl} method="post" onSubmit={checkEmpty}>
        <input type="hidden" name="action" value="fieldsAdd" />
        Добавить полей &nbsp; <input name="fieldsNum" type="text" defaultValue="1" size="5" /> &nbsp;
        <input name="afterOption" type="radio" value="end" defaultChecked id="f1" /> <label htmlFor="f1">в конец </label>
        <input name="afterOption" type="radio" value="start" id="f2" /> <label htmlFor="f2">в начало</label>
        <input name="afterOption" type="radio" value="field" id="f3" />  <label htmlFor="f3">после </label>
        <select name="afterField" onFocus={selectOnFocus}>
          {Object.values(props.data).map((table) =>
            <option key={table.Field}>{table.Field}</option>
          )}
        </select>&nbsp;
        <input type="submit" value="Добавить!" />
      </form>
    </>
  )
}