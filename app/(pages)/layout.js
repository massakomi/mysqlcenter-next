import "../css/page.scss";
import "../css/color.white.css";
import {MenuTop} from "@/app/ui/MenuTop";
import {MenuChain} from "@/app/ui/MenuChain";
import {SearchInTable} from "@/app/ui/SearchInTable";
import {Messages} from "@/app/ui/Messages";
import {PopupSqlForm} from "@/app/ui/PopupSqlForm";
import {MenuFooter} from "@/app/ui/MenuFooter";
import {MenuTable} from "@/app/ui/MenuTable";
import {PopupQueryList} from "@/app/ui/PopupQueryList";
import {PopupDbList} from "@/app/ui/PopupDbList";

export const metadata = {
  title: "MySQLCenter"
};

export default async function PagesLayout({ children }) {

  let props = {}
  try {
    let data = await fetch('http://msc/?init=1&ajax=1')
    props = await data.json()
  } catch (e) {
    return <pre>{'Ошибка ' + e.name + ":" + e.message + "\n" + e.stack}</pre>;
  }
  if (props.status === false) {
    return <>{props.message}</>;
  }

  return (
    <>
      <div className="pageBlock">
        <PopupDbList data={props.databases} />
        <MenuTop />
        <PopupSqlForm />
        <MenuChain />
      </div>

      <div className="cols main">
        <div>
          <MenuTable />
        </div>
        <div>
          <div style={{whiteSpace: 'nowrap', float: 'right'}}>
            <PopupQueryList queries={props.queries} />
            <SearchInTable />
          </div>
          <Messages messages={props.messages} />
          {children}
        </div>
        <div>
          <div id="msAjaxQueryDiv">*</div>
        </div>
      </div>

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

    </>
  );
}
