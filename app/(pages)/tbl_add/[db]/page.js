import {tblAdd} from "@/app/ui/actions";
import Form from "./Form";

export const  metadata = {
  title: 'Создать таблицу'
}

export default async function Page({params}) {

  const props = await tblAdd(params)

  return (
    <>
      <h1>Добавить таблицу в базу данных {params.db}</h1>
      <Form {...props} />
    </>
  );
}


