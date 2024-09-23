import {dbList} from "@/app/ui/actions";
import TableFull from "@/app/(pages)/db_list/full/TableFull";

export const  metadata = {
  title: 'Список баз данных'
}

export default async function Page({params}) {

  let props = await dbList('full');

  return  (
    <>
      <h1>{metadata.title}</h1>
      <TableFull databases={props.databases} />
    </>
  )
}