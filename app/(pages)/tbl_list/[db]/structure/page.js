import TableList from "@/app/(pages)/tbl_list/[db]/TableList";
import {tblList} from "@/app/ui/actions";
import {SubMenu} from "@/app/(pages)/tbl_list/[db]/SubMenu";
import {TableStructure} from "@/app/(pages)/tbl_list/[db]/structure/TableStructure";

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: `${params.db} исследование структуры`
  }
}

export default async function Page({params}) {

  let props = await tblList(params.db, 'structure');

  return (
    <>
      <h1>{`${params.db} исследование структуры`}</h1>
      <SubMenu />
      <TableStructure {...props} />
    </>
  );
}
