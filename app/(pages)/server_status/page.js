
import {serverStatus} from "@/app/ui/actions";
import {KillProcess} from "@/app/(pages)/server_status/KillProcess";
import {Buttons} from "@/app/(pages)/server_status/Buttons";
import {SetPageTitle} from "@/app/ui/SetPageTitle";

export const  metadata = {
  title: 'Список процессов'
}

export default async function Page() {

  let data = await serverStatus();

  let listItems = []
  if (data.serverProcesses) {
    listItems = data.serverProcesses.map((item, key) => {
      return (
        <tr key={key}>
          <td><KillProcess id={item.Id} /></td>
          <td>{item.Id}</td>
          <td>{item.User}</td>
          <td>{item.Host}</td>
          <td>{item.db ? item.db : <i>нет</i>}</td>
          <td>{item.Command}</td>
          <td>{item.Time}</td>
          <td>{item.State ? item.State : <i>нет</i>}</td>
          <td>{item.Info ? item.Info : <i>нет</i>}</td>
        </tr>
      )
    });
  }

  return  (
    <table width="100%" border="0" cellSpacing="0" cellPadding="3">
      <tbody>
      <tr>
        <td valign="top">
          <table className="contentTable" id="structureTableId">
            <thead>
            <tr>
              <th><a href="&full" title="полные или пустые запросы"><img src="/images/s_fulltext.png" width="50" height="20" border="0" alt="" /></a></th>
              <th>id</th>
              <th>user</th>
              <th>host</th>
              <th>db</th>
              <th>command</th>
              <th>time</th>
              <th>status</th>
              <th>sqlQuery</th>
            </tr>
            </thead>
            <tbody>
            {listItems}
            </tbody>
          </table>
        </td>
        <td valign="top">
          <Buttons />
          <SetPageTitle title='Список процессов' />
        </td>
      </tr></tbody>
    </table>
  )
}