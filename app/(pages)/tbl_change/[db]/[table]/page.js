import {tblChange} from '@/app/ui/actions';
import EditRows from '@/app/(pages)/tbl_change/[db]/[table]/EditRows';
import AddRows from '@/app/(pages)/tbl_change/[db]/[table]/AddRows';

export async function generateMetadata({params}) {
  return {
    title: `${params.table} < ${params.db}`
  }
}

export default async function Page({params, searchParams}) {

  const props = await tblChange(params, searchParams)

  {props.isAdd ? <AddRows {...props} /> : <EditRows {...props} />}

  return (
    <>
      <h1>{props.isAdd ? 'Добавить' : 'Редактировать' } строки - {params.table}</h1>
      {props.isAdd ? <AddRows {...props} /> : <EditRows {...props} />}
    </>
  );
}