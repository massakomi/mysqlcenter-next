'use client'
import HtmlSelector from "@/app/(pages)/search/[db]/HtmlSelector";
import {useParams} from "next/navigation";

export default function FormCompare(props) {

  const params = useParams();

  return (
    <form name="form1" method="get" action={`/tbl_compare/${params.db}/${params.table}`}>
      Сравнить таблицу с такой же в &nbsp;
      <HtmlSelector data={props.dbs} name="database" /> &nbsp;
      <input type="submit" value="Сравнить" />
    </form>
  );
}
