
import {dbComparePage} from "@/app/ui/actions";
import {Compare} from "@/app/(pages)/db_compare/[dbs]/Compare";

export const  metadata = {
  title: 'Сравнение баз данных'
}

export default async function Page({params}) {
  const props = await dbComparePage(decodeURIComponent(params.dbs))
  return (
    <>
      <h1>{metadata.title}</h1>
      <Compare {...props} />
    </>
  );
}
