import CharsetSelector from '@/app/(pages)/actions/[db]/CharsetSelector'
import {actionPage} from '@/app/ui/actions'
import {Info} from '@/app/(pages)/actions/[db]/Info'
import FieldSet from '@/app/(pages)/actions/[db]/FieldSet'

export const metadata = {
  title: 'Операции над базой ?',
}

export default async function Page({params}) {
  let props = await actionPage(params)
  if (!props.dbInfo) {
    return <>База не найдена</>
  }

  //<input name="auto" type="checkbox" value="1" checked> Добавить значение AUTO_INCREMENT<br>
  //<input name="limit" type="checkbox" value="1"> Добавить ограничения<br>

  return (
    <div>
      <h1>{`Операции над базой ${params.db}`}</h1>
      <FieldSet title="Переименовать базу данных в:" action="dbRename" {...props}>
        <input name="newName" type="text" required defaultValue={params.db} />
      </FieldSet>
      <FieldSet title="Копировать базу данных в:" action="dbCopy" {...props}>
        <input name="newName" required type="text" defaultValue={params.db + '_copy'} />
        <br />
        <input name="option" type="radio" value="struct" /> Только структуру <br />
        <input name="option" type="radio" value="all" defaultChecked /> Структура и данные <br />
        <input name="option" type="radio" value="data" /> Только данные <br />
      </FieldSet>
      <FieldSet title="Изменить кодировку базы данных:" action="dbCharset" {...props}>
        <CharsetSelector charsets={props.charsets} value={props.dbInfo.DEFAULT_CHARACTER_SET_NAME} />
      </FieldSet>
      <Info {...props} />
    </div>
  )
}




