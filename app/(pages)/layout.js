import '../css/page.scss'
import '../css/color.white.css'
import {MenuTop} from '@/app/ui/MenuTop'
import {MenuChain} from '@/app/ui/MenuChain'
import {SearchInTable} from '@/app/ui/SearchInTable'
import {Messages} from '@/app/ui/Messages'
import {PopupSqlForm} from '@/app/ui/PopupSqlForm'
import {MenuTable} from '@/app/ui/MenuTable'
import {PopupQueryList} from '@/app/ui/PopupQueryList'
import {PopupDbList} from '@/app/ui/PopupDbList'
import {getInit} from '@/app/ui/actions'
import Link from 'next/link'

export const metadata = {
  title: 'MySQLCenter',
}

export default async function PagesLayout({children, params}) {
  // params доступен в layout, но в корневом он будет пустой, т.к. вероятно не видит иерархию ниже
  // + layout не перерисовывается, остается статичным

  let props = {}
  try {
    props = await getInit()
  } catch (e) {
    return <pre>{'Ошибка ' + e.name + ':' + e.message + '\n' + e.stack}</pre>
  }
  if (props.status === false) {
    return <>{props.messages}</>
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
        <span className="globalMenu">
          <Link href="/config">Настройки</Link>
        </span>
        <strong>Хост:</strong> {props.DB_HOST}&nbsp;&nbsp;
        <strong>Пользователь:</strong> {props.DB_USERNAME_CUR}&nbsp;
      </div>
    </>
  )
}
