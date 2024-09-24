'use client'
import ExportOptions from "@/app/(pages)/export/ExportOptions";

export function FormSpecial(props) {

  const createSet = () => {
    var m = prompt('Введите имя для установки', 'Новая')
    if (m) {
      target.value = m;
    } else {
      return false;
    }
  }

  const selectSet = () => {
    window.location = '?db=<?=$msc->db?>&s=<?=$msc->page?>&set=' + target.options[target.selectedIndex].value
  }

  // {new URL(location.href).searchParams.get('set')}
  return (
    <>
      <input type="hidden" name="exportSpecial" value="1" />
      <ExportOptions fields={props.fields} dirImage={props.dirImage} structChecked={props.structChecked} />
      <p><input type="submit" value="Выполнить" /></p>
      <select onChange={selectSet} defaultValue="url">
        {Object.values(props.setsArray).map((v) =>
          <option key={v.toString()}>{v}</option>
        )}
      </select>
      <input type="submit" name="save" value="Сохранить изменения" />
      <input type="submit" name="new" value="Создать новую установку" onClick={createSet} />
      <input type="submit" name="delete" value="Удалить установку" />
    </>
  )
}