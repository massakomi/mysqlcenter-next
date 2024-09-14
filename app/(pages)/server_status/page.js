import {useEffect, useState} from "react";

export function Page() {

  const [data, setData] = useState({main: {page: ''}, page: {hiddens: [], databases: []}});

  useEffect(() => {
    const fetchData = async () => {
      let json = await apiQuery('s=server_status')
      setData(json);
    };
    fetchData();
  }, []);

  if (data.getPageTitle) {
    document.title = data.getPageTitle
    document.querySelector('h1').innerHTML = data.getPageTitle
  }

  const killProcess = (id) => {
    apiQuery('s='+window.location.pathname.substr(1) + '&kill='+id)
  }

  let listItems = []
  if (data.page.serverProcesses) {
    listItems = data.page.serverProcesses.map((item, key) => {
      return (
        <tr key={key}>
          <td><span onClick={killProcess.bind(this, item.Id)}>Kill</span></td>
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
          3
        </td>
      </tr></tbody>
    </table>
  )
}