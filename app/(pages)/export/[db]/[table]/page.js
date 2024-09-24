import {Form} from "../../Form";
import {exportPage} from "@/app/ui/actions";

export const  metadata = {
  title: 'Экспорт таблицы'
}

export default async function Page({params}) {

  const props = await exportPage(params.db, params.table)
  props.optionsSelected = [params.table]

  return (
    <>
      <h1>{metadata.title} {params.table}</h1>
      <Form {...props} />
    </>
  );
}
