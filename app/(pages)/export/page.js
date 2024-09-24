import {Form} from "./Form";
import {exportPage, sqlPage} from "@/app/ui/actions";

export const  metadata = {
  title: 'Экспорт данных'
}

export default async function Page() {

  const props = await exportPage()

  return (
    <>
      <h1>{metadata.title}</h1>
      <Form {...props} />
    </>
  );
}
