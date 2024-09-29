import TablesCompare from './TablesCompare';
import {tblCompare} from '@/app/ui/actions';

export async function generateMetadata({ params }) {
  return {
    title: `${params.table} < ${params.db}`
  }
}

export default async function Page({params, searchParams}) {

  let db = params.db
  let db2 = searchParams.database

  let props = await tblCompare({db}, {databases: [db, db2], table: params.table})

  return (
    <>
      <h1>Сравнение таблиц</h1>
      <TablesCompare {...props} />
    </>
  );
}
