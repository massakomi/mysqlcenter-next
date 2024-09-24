import FieldSet from "./FieldSet";
import HtmlSelector from "@/app/(pages)/search/[db]/HtmlSelector";
import CharsetSelector from "@/app/(pages)/actions/[db]/CharsetSelector";
import {TableActions} from "@/app/(pages)/actions/[db]/[table]/TableActions";
import {actionPage} from "@/app/ui/actions";

export const  metadata = {
  title: 'Операции над таблицей ?'
}

export default async function Page({params}) {

  let props = await actionPage(params.db, params.table);
  if (!props.dbs) {
    return <>Таблица не найдена</>;
  }

  return (
    <>
      <h1>{`Операции над таблицей ${params.table}`}</h1>
      <table width="100%"  border="0" cellSpacing="0" cellPadding="3">
        <tbody><tr>
          <td>
            <FieldSet title="Переименовать таблицу в:" action="tableRename" {...props}>
              <input name="newName" type="text" required defaultValue={params.table} />
            </FieldSet>

            <FieldSet title="Переместить таблицы в (база данных.таблица):" action="tableMove" {...props}>
              <HtmlSelector data={props.dbs} name="newDB" value={params.db} />
              .
              <input name="newName" required type="text" defaultValue={params.table} />
            </FieldSet>

            <FieldSet title="Скопировать таблицу в (база данных.таблица):" action="tableCopyTo" {...props}>
              <HtmlSelector data={props.dbs} value={params.db} name="newDB" />
              .
              <input name="newName" type="text" required defaultValue={params.table} />
            </FieldSet>

            <FieldSet title="Изменить кодировку таблицы:" action="tableCharset" {...props}>
              <CharsetSelector charsets={props.charsets} value={props.charset} />
            </FieldSet>

            <FieldSet title="Комментарий к таблице:" action="tableComment" {...props}>
              <input name="comment" type="text" size="60" defaultValue={props.comment} />
            </FieldSet>

            <FieldSet title="Изменить порядок:" action="tableOrder" {...props}>
              <HtmlSelector data={props.fields} name="field" />
              <select name="order">
                <option value="">По возрастанию</option>
                <option value="DESC">По убыванию</option>
              </select>
            </FieldSet>

            <FieldSet title="Опции таблицы:" action="tableOptions" {...props}>
              <input type="checkbox" name="checksum" defaultValue={props.checksum} /> checksum &nbsp; &nbsp;
              <input type="checkbox" name="pack_keys" value="1" /> pack_keys
              <input type="checkbox" name="delay_key_write" value="1" /> delay_key_write &nbsp;
              <input name="auto_increment" type="text" size="3" defaultValue={props.ai} /> auto_increment
            </FieldSet>

          </td>
          <td valign="top">
            <TableActions {...params} />
          </td>
        </tr></tbody>
      </table>
    </>
  );

}
