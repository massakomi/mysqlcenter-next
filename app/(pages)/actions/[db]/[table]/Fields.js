'use client';
import FieldSet from '@/app/(pages)/actions/[db]/[table]/FieldSet';
import HtmlSelector from '@/app/(pages)/search/[db]/HtmlSelector';
import CharsetSelector from '@/app/(pages)/actions/[db]/CharsetSelector';
import {useParams} from 'next/navigation';
import {querySwr} from '@/app/ui/functions';

export default function Fields() {

  const params = useParams();
  let { props, error, isLoading } = querySwr({s: 'actions', db: params.db, table: params.table})

  if (!props) {
    return ;
  }

  return (
    <>
      <FieldSet title="Переименовать таблицу в:" action="tableRename">
        <input name="newName" type="text" required defaultValue={params.table} />
      </FieldSet>

      <FieldSet title="Переместить таблицы в (база данных.таблица):" action="tableMove">
        <HtmlSelector data={props.dbs} name="newDB" value={params.db} />
        .
        <input name="newName" required type="text" defaultValue={params.table} />
      </FieldSet>

      <FieldSet title="Скопировать таблицу в (база данных.таблица):" action="tableCopyTo">
        <HtmlSelector data={props.dbs} value={params.db} name="newDB" />
        .
        <input name="newName" type="text" required defaultValue={params.table} />
      </FieldSet>

      <FieldSet title="Изменить кодировку таблицы:" action="tableCharset">
        <CharsetSelector charsets={props.charsets} value={props.charset} />
      </FieldSet>

      <FieldSet title="Комментарий к таблице:" action="tableComment">
        <input name="comment" type="text" size="60" defaultValue={props.comment} />
      </FieldSet>

      <FieldSet title="Изменить порядок:" action="tableOrder">
        <HtmlSelector data={props.fields} name="field" />
        <select name="order">
          <option value="">По возрастанию</option>
          <option value="DESC">По убыванию</option>
        </select>
      </FieldSet>

      <FieldSet title="Опции таблицы:" action="tableOptions">
        <input type="checkbox" name="checksum" defaultValue={props.checksum} /> checksum &nbsp; &nbsp;
        <input type="checkbox" name="pack_keys" value="1" /> pack_keys
        <input type="checkbox" name="delay_key_write" value="1" /> delay_key_write &nbsp;
        <input name="auto_increment" type="text" size="3" defaultValue={props.ai} /> auto_increment
      </FieldSet>
    </>
  );
}