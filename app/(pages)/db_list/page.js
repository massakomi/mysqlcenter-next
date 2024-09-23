import ColumnLeft from "./ColumnLeft";
import ColumnRight from "./ColumnRight";
import {dbList} from "@/app/ui/actions";

export const  metadata = {
  title: 'Список баз данных'
}

export default async function Page({params}) {

  let props = await dbList();

  return  (
    <>
      <h1>{metadata.title}</h1>
      <div className="cols">
        <div><ColumnLeft {...props} /></div>
        <div><ColumnRight {...props} /></div>
      </div>
    </>
  )
}