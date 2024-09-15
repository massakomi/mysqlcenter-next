
import {serverVariables} from "@/app/ui/actions";
import {SetPageTitle} from "@/app/ui/SetPageTitle";
export const  metadata = {
  title: 'Переменные сервера'
}

export default async function Page() {

  const wrap = (s, cmp) => {
    if (s === undefined || cmp === s) {
      return null
    } else {
      return <span title={s}>{s.substring(0, 20)}</span>
    }
  }

  let data = await serverVariables();

  let rows = []
  let i =0;
  for (let prop in data.sessionVars) {
    i ++
    rows.push((
      <tr key={i}>
        <td><b>{prop.replace('_', ' ')}</b></td>
        <td>{wrap(data.sessionVars[prop])}</td>
        <td>{wrap(data.globalVars[prop], data.sessionVars[prop])}</td>
      </tr>
    ))
  }

  return (
    <>
      <SetPageTitle title='Переменные сервера' />
      <table className="contentTable">
        <thead>
        <tr>
          <th>Свойство</th>
          <th>session var</th>
          <th>global var</th>
        </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
      </table>
    </>
  );
}
