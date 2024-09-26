import {TableActions} from '@/app/(pages)/actions/[db]/[table]/TableActions'
import Fields from '@/app/(pages)/actions/[db]/[table]/Fields';

export const metadata = {
  title: 'Операции над таблицей ?',
}

export default async function Page({params}) {
  return (
    <>
      <h1>{`Операции над таблицей ${params.table}`}</h1>
      <table width="100%" border="0" cellSpacing="0" cellPadding="3">
        <tbody>
          <tr>
            <td>
              <Fields />
            </td>
            <td valign="top">
              <TableActions {...params} />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
