import KeyForm from "@/app/(pages)/tbl_struct/[db]/[table]/addkey/KeyForm";
import {tblStruct} from "@/app/ui/actions";

export const metadata = {
  title: 'Добавить ключ'
};

export default async function ({params}) {

  let get = params;
  get.mode = 'add_key';
  let props = await tblStruct(get);

  return (
    <>
      <h1>{metadata.title}</h1>
      <KeyForm {...props} />
    </>
  );
}