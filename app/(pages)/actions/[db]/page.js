import CharsetSelector from '@/app/(pages)/actions/[db]/CharsetSelector'
import {Info} from '@/app/(pages)/actions/[db]/Info'
import FieldSet from '@/app/(pages)/actions/[db]/FieldSet'

export const metadata = {
  title: 'Операции над базой ?',
}

export default async function Page({params}) {
  //<input name="auto" type="checkbox" value="1" checked> Добавить значение AUTO_INCREMENT<br>
  //<input name="limit" type="checkbox" value="1"> Добавить ограничения<br>

  return (
    <div>
      <h1>{`Операции над базой ${params.db}`}</h1>
      <FieldSet title="Переименовать базу данных в:" action="dbRename">
        <input name="newName" type="text" className="mr-2" required defaultValue={params.db} />
      </FieldSet>
      <FieldSet title="Копировать базу данных в:" action="dbCopy">
        <input name="newName" required type="text" defaultValue={params.db + '_copy'} className="block mb-2" />
        <input name="option" type="radio" value="struct" /> Только структуру <br />
        <input name="option" type="radio" value="all" defaultChecked /> Структура и данные <br />
        <div className='mb-2'>
          <input name="option" type="radio" value="data" /> Только данные
        </div>
      </FieldSet>
      <FieldSet title="Изменить кодировку базы данных:" action="dbCharset">
        <CharsetSelector />
      </FieldSet>
      <Info />
    </div>
  )
}
