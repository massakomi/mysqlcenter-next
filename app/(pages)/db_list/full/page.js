import {dbList} from "@/app/ui/actions";
import ColumnLeft from '@/app/(pages)/db_list/ColumnLeft';
import ColumnRight from '@/app/(pages)/db_list/ColumnRight';

export const  metadata = {
  title: 'Список баз данных'
}

export default async function Page({params}) {

  let props = await dbList('full');

  return  (
    <>
      <h1>{metadata.title}</h1>
      <div className="cols">
        <div className="me-3"><ColumnLeft {...props} /></div>
        <div><ColumnRight {...props} /></div>
      </div>
    </>
  )
}