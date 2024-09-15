import ColumnLeft from "./ColumnLeft";
import ColumnRight from "./ColumnRight";
import {dbList} from "@/app/ui/actions";
import {SetPageTitle} from "@/app/ui/SetPageTitle";

export const  metadata = {
  title: 'Список баз данных'
}

export default async function Page() {

  let props = await dbList();

  return  (
    <table width="100%" border="0" cellSpacing="0" cellPadding="3">
      <tbody>
      <tr>
        <td valign="top">
          <SetPageTitle title='Список баз данных' />
          <ColumnLeft {...props} />
        </td>
        <td valign="top">
          <ColumnRight {...props} />
        </td>
      </tr></tbody>
    </table>
  )
}