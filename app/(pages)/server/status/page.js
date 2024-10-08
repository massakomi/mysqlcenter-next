
import {serverStatus} from "@/app/ui/actions";
import {KillProcess} from "./KillProcess";

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
    <>
    <h1>{metadata.title}</h1>
    <table width="100%" border="0" cellSpacing="0" cellPadding="3">
      <tbody>
      <tr>
        <td valign="top">
          <table className="contentTable" id="structureTableId">
            <thead>
            <tr>
              <th></th>
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

        </td>
      </tr></tbody>
    </table>
    </>
  )
}