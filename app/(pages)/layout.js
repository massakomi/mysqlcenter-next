import "../css/page.scss";
import "../css/color.white.css";
import Link from 'next/link'
import {MenuTop} from "@/app/ui/MenuTop";
import {MenuChain} from "@/app/ui/MenuChain";
import {SearchInTable} from "@/app/ui/SearchInTable";
import {Messages} from "@/app/ui/Messages";
import {PopupSqlForm} from "@/app/ui/PopupSqlForm";
import {MenuFooter} from "@/app/ui/MenuFooter";
import {PageTitle} from "@/app/ui/PageTitle";
import {MenuTable} from "@/app/ui/MenuTable";
import {PopupQueryList} from "@/app/ui/PopupQueryList";
import {PopupDbList} from "@/app/ui/PopupDbList";

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

  let data = await fetch('http://msc/?init=1&ajax=1')
  let props = await data.json()

  return (
    <div className="App">
      <div className="pageBlock">
        <PopupDbList data={props.databases} />
        <MenuTop />
        <PopupSqlForm />
        <MenuChain />
      </div>

      <table width="100%" className="outerTable">
        <tbody>
        <tr>
          <td width="100" className="tableMenuTd">
            <MenuTable />
          </td>
          <td>


            <table width="800">
              <tbody>
              <tr>
                <td width="500">
                  <PageTitle title={props.getPageTitle} />
                </td>
                <td style={{whiteSpace: 'nowrap'}}>
                  <PopupQueryList queries={props.queries} />
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

      <div className="pageBlock">
        <MenuFooter />

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
