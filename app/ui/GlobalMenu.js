'use client'
import {usePathname} from "next/navigation";
import Link from "next/link";

export function GlobalMenu() {
  const props = {}
  const pathname = usePathname();
  let dbMenuGlobal = [
    ['delim'],
    ['поиск', 'search', ''],
    ['экспорт', 'export', ''],
    ['sql', 'sql', ''],
    ['операции', 'actions', '']
  ]
  let type = 'table';
  if (pathname === '/db_list' || props.page === 'db_list' || props.page === 'users' || pathname.startsWith('server_')) {
    type = 'server';
    dbMenuGlobal = [
      ['базы данных', 'db_list', ''],
      ['статус', 'server_status', ''],
      ['переменные', 'server_variables', ''],
      //['кодировки', 'server_collations', ''],
      ['инфо', 'server_users', ''],
    ].concat(dbMenuGlobal)
  } else if ((props.db !== '' && props.table === '') || props.page === 'tbl_list') {
    type = 'db'
    dbMenuGlobal = [
      ['базы таблицы', 'tbl_list', ''],
      ['создать таблицу', 'tbl_add', ''],
    ].concat(dbMenuGlobal).concat([
      ['delim'],
      ['очистить', props.page, 'dbTruncate'],
      ['удалить', props.page, 'dbDelete'],
      ['удалить таблицы', props.page, 'dbTablesDelete'],
    ])
  } else {
    dbMenuGlobal = [
      ['обзор', 'tbl_data', ''],
      ['структура', 'tbl_struct', ''],
      ['вставить', 'tbl_change', ''],
      ['создать таблицу', 'tbl_add', '', '?db='+props.db],
    ].concat(dbMenuGlobal).concat([
      ['delim'],
      ['очистить', props.page, 'tableTruncate'],
      ['удалить', props.page, 'tableDelete'],
    ])
  }

  const activeChecker = ( {isActive} ) => {return isActive ? 'cur' : ''}
  let menu = []
  for (let item of dbMenuGlobal) {
    let title = item[0]
    if (title === 'delim') {
      menu.push(<b key={menu.length} className="delim">|</b>);
      continue;
    }
    let page = item[1]
    let action = item[2]
    let curl = page;
    if (action) {
      curl += '?action='+action;
    }
    /*$extra = null;
    if (stristr($action, 'delete')) {
      $extra = ' class="delete" onClick="check(this, \'удаление\'); return false"';
    } elseif (stristr($action, 'truncate')) {
      $extra = ' class="truncate" onClick="check(this, \'очистка\'); return false"';
    }*/
    menu.push(<Link key={menu.length} className='cur' href={curl}>{title}</Link>)
  }
  return <div className="globalMenu" id="globalMenu">{menu}</div>
}