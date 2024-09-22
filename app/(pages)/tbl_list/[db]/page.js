import {SetPageTitle} from "@/app/ui/SetPageTitle";

export const  metadata = {
  title: 'Список таблиц базы ?'
}

export default function Page({params}) {

  return (
    <>
      <SetPageTitle database={params.db} title={`Список таблиц базы ${params.db}`} />
      tbl list page {params.db}
    </>
  );
}
