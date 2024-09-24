import {Form} from "../Form";
import {exportPage} from "@/app/ui/actions";

export const  metadata = {
  title: 'Экспорт базы данных'
}

export default async function Page({params}) {

  const props = await exportPage(params.db)

  return (
    <>
      <h1>{metadata.title} {params.db}</h1>
      <Form {...props} />
    </>
  );
}
