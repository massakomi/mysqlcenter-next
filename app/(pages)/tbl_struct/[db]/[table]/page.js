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

      <div className='grid gap-4 grid-flow-col auto-cols-max'>
        <div>
          <TableStruct {...props} />
          <Actions />
          <fieldset className="msGeneralForm">
            <legend>Изменить структуру</legend>
            <FormField {...props} />
          </fieldset>
        </div>
        <div>
          <div className='font-bold mb-2 text-lg'> Подробности таблицы </div>
          <FieldsInfo info={props.dataDetails} />
        </div>
      </div>

      <KeysInfo {...props} />
    </div>
  );
}
