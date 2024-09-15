import "../css/page.css";
import "../css/color.white.css";
import Link from 'next/link'
import {GlobalMenu} from "@/app/ui/GlobalMenu";
import {msDisplaySql, queryPopupBlock} from "@/app/ui/functions";
import {ChainMenu} from "@/app/ui/ChainMenu";
import {SearchInTable} from "@/app/ui/SearchInTable";
import {Messages} from "@/app/ui/Messages";
import {PopupQueryForm} from "@/app/ui/PopupQueryForm";
import {FooterMenu} from "@/app/ui/FooterMenu";
import {PageTitle} from "@/app/ui/PageTitle";
import {TableMenu} from "@/app/ui/TableMenu";

export const metadata = {
  title: "MySQLCenter"
};

/*export async function generateMetadata() {
  const props = await fetch('http://msc/?init=1&ajax=1').then((res) => res.json())
  return {
    title: props.getWindowTitle
  }
}*/

export default async function PagesLayout({ children }) {

  //const pathname = usePathname();

  let data = await fetch('http://msc/?init=1&ajax=1')
  let props = await data.json()

  //console.log(props)

  return (
    <div className="App">
      <div className="pageBlock">
        <b id="appNameId"><Link href="/db_list">MySQL React</Link></b>

        &nbsp; &nbsp;
        <GlobalMenu /> &nbsp; &nbsp;
        <span className="hiddenText" onClick={msDisplaySql} title="Кликните, чтобы открыть форму быстрого запроса">{props.generate_time} с. &nbsp;&nbsp;  </span>
        <span className="menuChain"><ChainMenu /></span>
      </div>

      <table width="100%" className="outerTable">
        <tbody>
        <tr>
          <td width="100" className="tableMenuTd">
            <TableMenu />
          </td>
          <td>


            <table width="800">
              <tbody>
              <tr>
                <td width="500">
                  <PageTitle title={props.getPageTitle} />
                </td>
                <td style={{whiteSpace: 'nowrap'}}>
                  <span className="hiddenText" onClick={queryPopupBlock}>запросы&nbsp;</span>
                  {props.queries.length}
                  &nbsp;&nbsp;
                  <SearchInTable />
                </td>
              </tr>
              </tbody>
            </table>

            <Messages messages={props.messages} />

            {children}


          </td>
          <td>
            <div id="msAjaxQueryDiv">*</div>
          </td>
        </tr>
        </tbody>
      </table>

      <PopupQueryForm />

      <div id="dbHiddenMenu">

      </div>
      <div id="queryPopupBlock">
        {props.queries.map((q, key) =>
          <span key={key}>{q}</span>
        )}
      </div>

      <div className="pageBlock">
        <FooterMenu />

        <strong>Хост:</strong> {props.DB_HOST}&nbsp;&nbsp;
        <strong>Пользователь:</strong> {props.DB_USERNAME_CUR}&nbsp;

        пиковая память {props.memory_get_peak_usage} &nbsp;
        сейчас {props.memory_get_usage} &nbsp;
        inc {props.includeSize}
        limit {props.memory_limit} &nbsp;&nbsp;

        <strong><a href="/logout">Выход</a></strong>
      </div>

    </div>
  );
}
