
import Form from "./Form";
import {searchPage} from "@/app/ui/actions";


export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: `Поиск по базе данных ${params.db}`
  }
}

export default async function Page({params}) {

  let props = await searchPage(params);
  if (!props.tables) {
    return <>База не найдена</>;
  }

  return (
    <>
      <h1>Поиск по базе данных {params.db}</h1>
      <Form {...props} />
    </>
  );
}
