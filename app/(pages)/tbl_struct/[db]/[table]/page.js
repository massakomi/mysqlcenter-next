import TableStruct from "./TableStruct";
import TableObject from "./TableObject";
import {tblStruct} from "@/app/ui/actions";
import KeysInfo from "./KeysInfo";
import {Actions} from "./Actions";
import {FormField} from "./FormField";
import FieldsInfo from "@/app/(pages)/tbl_struct/[db]/[table]/FieldsInfo";

export async function generateMetadata({ params }) {
  return {
    title: `${params.table} < ${params.db}`
  }
}

export default async function Page({params}) {

  let props = await tblStruct(params);

  return (
    <div>
      <h1>Структура таблицы {params.table}</h1>
      <table>
        <tbody><tr>
          <td valign="top">
            <TableStruct {...props} />
            <Actions />

            <fieldset className="msGeneralForm">
              <legend>Изменить структуру</legend>
              <FormField {...props} />
            </fieldset>

          </td>

          <td valign="top" style={{padding: '20px 0 0 10px'}}>
            <strong> Подробности таблицы </strong>
            <br />
            <FieldsInfo info={props.dataDetails} />
          </td>
        </tr></tbody>
      </table>

      <KeysInfo {...props} />
    </div>
  );
}
