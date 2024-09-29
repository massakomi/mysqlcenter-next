'use client'
import {useParams, usePathname} from "next/navigation";
import Link from "next/link";
import {getPageFromPathname} from "@/app/ui/functions";
import {customAction, invalidatePath} from '@/app/ui/actions';
import {setMessages} from "@/lib/features/messagesReducer";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

export function MenuTop() {
  const pathname = usePathname();
  const params = useParams();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setMessages([]))
  }, [dispatch]);

  let dbMenuGlobal = [
    ['delim'],
    ['поиск', 'search', ''],
    ['экспорт', 'export', ''],
    ['sql', 'sql', ''],
    ['операции', 'actions', '']
  ]
  let page = getPageFromPathname(pathname)
  let type = 'table';
  if (params.db === undefined && params.table === undefined) {
    type = 'server';
    dbMenuGlobal = [
      ['базы данных', 'db_list', ''],
      ['статус', 'server/status', ''],
      ['переменные', 'server/variables', ''],
      //['кодировки', 'server_collations', ''],
      ['инфо', 'server/info', ''],
      ['delim'],
      ['экспорт', 'export', ''],
    ]
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
  for (let [title, page, action] of dbMenuGlobal) {
    if (title === 'delim') {
      menu.push(<b key={menu.length} className="delim">|</b>);
      continue;
    }
    let className = getClassName(pathname, page, action)

    if (action) {
      menu.push(<span role="button" onClick={multyAction.bind(this, action, params, dispatch)} key={menu.length} className={className}>{title}</span>)
    } else {
      let curl = getUrl(params, page, type)
      menu.push(<Link key={menu.length} className={className} href={curl}>{title}</Link>)
    }
  }
  return <span className="globalMenu">{menu}</span>
}

async function multyAction(action, params, dispatch) {
  if (!confirm('Подтвердите...')) {
    return false;
  }
  let json;
  if (action === 'dbTruncate') {
    json = await customAction('dbTruncate', `db=${params.db}`)
    await invalidatePath(`/tbl_list/${params.db}`)
  }
  if (action === 'dbDelete') {
    json = await customAction('dbDelete', `db=${params.db}`)
    await invalidatePath(`/db_list`)
    await invalidatePath(`/tbl_list/${params.db}`)
  }
  if (action === 'dbTablesDelete') {
    json = await customAction('dbTablesDelete', `db=${params.db}`)
    await invalidatePath(`/db_list`)
    await invalidatePath(`/tbl_list/${params.db}`)
  }
  if (action === 'tableTruncate') {
    json = await customAction('tableTruncate', {db: params.db, table: params.table})
    await invalidatePath(`/tbl_data/${params.db}/${params.table}`)
  }
  if (action === 'tableDelete') {
    json = await customAction('tableDelete', {db: params.db, table: params.table})
    await invalidatePath(`/tbl_list/${params.db}`)
    await invalidatePath(`/tbl_data/${params.db}/${params.table}`)
  }
  dispatch(setMessages(json.messages))
  setTimeout(function() {
    location.reload()
  }, 2000);
}

function getClassName(pathname, page, action) {
  let className = ''
  if (pathname.startsWith(`/${page}`)) {
    className = 'cur'
  }
  if (action.match(/delete/i)) {
    className = 'delete'
  }
  if (action.match(/truncate/i)) {
    className = 'truncate'
  }
  return className;
}


function getUrl(params, page, type) {
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
  return curl;
}

