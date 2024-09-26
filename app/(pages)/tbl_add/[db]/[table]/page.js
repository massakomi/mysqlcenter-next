import {tblAdd} from "@/app/ui/actions";
import Form from "../Form";

export const  metadata = {
  title: 'Редактировать таблицу'
}

export default async function Page({params, searchParams}) {

  const props = await tblAdd(params, searchParams)

  return (
    <>
      <h1>{metadata.title} {params.table}</h1>
      <Form {...props} />
    </>
  );
}


