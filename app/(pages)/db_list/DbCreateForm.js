export function DbCreateForm(props) {
  return  (
    <fieldset className="msGeneralForm">
      <legend>Создание базы данных</legend>
      <form action="?s=tbl_list&action=dbCreate" method="post">
        <input name="dbName" type="text" defaultValue="" />
        <button type="submit">Создать!</button>
      </form>
    </fieldset>
  )
}