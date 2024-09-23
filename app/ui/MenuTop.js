'use client'
import {useParams, usePathname} from "next/navigation";
import Link from "next/link";

export function MenuTop() {
  const pathname = usePathname();
  const params = useParams();
  let dbMenuGlobal = [
    ['delim'],
    ['поиск', 'search', ''],
    ['экспорт', 'export', ''],
    ['sql', 'sql', ''],
    ['операции', 'actions', '']
  ]
  let separator = pathname.indexOf('/', 1);
  let page = pathname.substring(1, separator > 0 ? separator : pathname.length)
  let type = 'table';
  //console.log(params.db) console.log(params.table)

  if (params.db === undefined && params.table === undefined) {
    type = 'server';
    dbMenuGlobal = [
      ['базы данных', 'db_list', ''],
      ['статус', 'server_status', ''],
      ['переменные', 'server_variables', ''],
      //['кодировки', 'server_collations', ''],
      ['инфо', 'server_info', ''],
    ].concat(dbMenuGlobal)
  } else if (params.db !== '' && params.table === undefined) {
    type = 'db'
    dbMenuGlobal = [
      ['таблицы', 'tbl_list', ''],
      ['создать таблицу', 'tbl_add', ''],
    ].concat(dbMenuGlobal).concat([
      ['delim'],
      ['очистить', page, 'dbTruncate'],
      ['удалить', page, 'dbDelete'],
      ['удалить таблицы', page, 'dbTablesDelete'],
    ])
  } else {
    dbMenuGlobal = [
      ['обзор', 'tbl_data', ''],
      ['структура', 'tbl_struct', ''],
      ['вставить', 'tbl_change', ''],
      ['создать таблицу', 'tbl_add', '', '?db='+params.db],
    ].concat(dbMenuGlobal).concat([
      ['delim'],
      ['очистить', page, 'tableTruncate'],
      ['удалить', page, 'tableDelete'],
    ])
  }

  let menu = []
  for (let item of dbMenuGlobal) {
    let title = item[0]
    if (title === 'delim') {
      menu.push(<b key={menu.length} className="delim">|</b>);
      continue;
    }
    let page = item[1]
    let action = item[2]
    let curl = `/${page}`;
    if (type === 'db') {
      curl += `/${params.db}`
    }
    if (type === 'table') {
      curl += `/${params.db}`
      if (page !== 'tbl_add') {
        curl += `/${params.table}`
      }
    }
    if (action) {
      curl += '?action='+action;
    }
    /*$extra = null;
    if (stristr($action, 'delete')) {
      $extra = ' class="delete" onClick="check(this, \'удаление\'); return false"';
    } elseif (stristr($action, 'truncate')) {
      $extra = ' class="truncate" onClick="check(this, \'очистка\'); return false"';
    }*/
    let className = ''
    if (pathname.startsWith(`/${page}`)) {
      className = 'cur'
    }
    menu.push(<Link key={menu.length} className={className} href={curl}>{title}</Link>)
  }
  return <span className="globalMenu">{menu}</span>
}