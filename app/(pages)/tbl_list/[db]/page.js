import TableList from "@/app/(pages)/tbl_list/[db]/TableList";
import Actions from "./Actions";
import {tblList} from "@/app/ui/actions";
import {SubMenu} from "@/app/(pages)/tbl_list/[db]/SubMenu";

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: params.db
  }
}

export default async function Page({params}) {
  let props = await tblList(params.db);
  return (
    <>
      <h1>{`Список таблиц базы данных "${params.db}"`}</h1>

      <TableList tables={props.tables} messages={props.messages} db={params.db} />
      <Actions />
      <SubMenu />

    </>
  );
}
