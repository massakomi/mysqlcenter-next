import {FormTable} from "./FormTable";
import {searchPage} from "@/app/ui/actions";


export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: `Поиск по таблице`
  }
}

export default async function Page({params}) {

  let props = await searchPage(params);
  if (props.status === false) {
    return <>Таблица не найдена</>;
  }

  return (
    <>
      <h1>Поиск по таблице</h1>
      <FormTable {...props} />
    </>
  );
}
