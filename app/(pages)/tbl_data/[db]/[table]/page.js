import TableLinks from "@/app/(pages)/tbl_data/[db]/[table]/TableLinks";
import Table from "./Table";
import FormCompare from "@/app/(pages)/tbl_data/[db]/[table]/FormCompare";
import Actions from "./Actions";
import {tblDataPage} from "@/app/ui/actions";

export async function generateMetadata({ params }) {
  return {
    title: `${params.table} < ${params.db}`
  }
}

export default async function Page({params, searchParams}) {

  let get = {
    db: params.db,
    table: params.table,
    order: searchParams.order,
    go: searchParams.go,
    part: searchParams.part,
    query: searchParams.query,
  };
  let props = await tblDataPage(get)

  if (!props.count) {
    return ;
  }

  return (
    <div>

      <h1>Таблица: {params.table} ({props.part > props.count ? props.count : props.part} строк из {props.count} всего)</h1>

      <form action="/tbl_data" method="post" name="formTableRows" id="formTableRows">
        <input type="hidden" name="rowMulty" value="1" />
        <input type="hidden" name="action" value="" />

        <TableLinks {...props} />

        <Table {...props} />

        <Actions />
      </form>
      <FormCompare {...props} />
    </div>
  );

}
