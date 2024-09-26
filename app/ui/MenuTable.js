'use client'

import {useEffect, useState} from "react";
import {useParams, usePathname} from "next/navigation";
import Link from "next/link";
import {getPageFromPathname} from "@/app/ui/functions";
import {tblList} from "@/app/ui/actions";
import {useSelector} from "react-redux";

export function MenuTable(props) {

  const params = useParams()
  const pathname = usePathname()
  const [tables, setTables] = useState(false);
  const globalParams = useSelector((state) => state.params.value)

  const currentDatabase = globalParams.database || params.db

  useEffect(() => {
    if (!currentDatabase) {
      return () => {};
    }
    tblList(currentDatabase)
      .then((page) => {
        setTables(page.tables || [])
      })
  }, [currentDatabase, globalParams.database]);

  if (tables === false) {
    return <></>;
  }
  if (tables.length === 0) {
    return <>Нет таблиц в БД</>;
  }

  let page = getPageFromPathname(pathname)
  if (!['tbl_data', 'tbl_struct'].includes(page)) {
    page = 'tbl_data';
  }

  return displayTables(tables, props, params, page);
}

function displayTables(tables, props, params, page) {

  let prefixes = prefixStat(tables)

  let menuTables = [];
  let selectorTables = [];
  let currentTable = params.table;
  for (let table of tables) {
    if (!params.db) {
      continue;
    }
    const tableName = table.Name;
    let className = getClassName(tableName, prefixes)

    let link = `/${page}/${params.db}/${tableName}`
    let style = {};
    if (currentTable === tableName) {
      className += ' cur';
    } else {
      if (parseInt(table.Rows) === 0) {
        style.color = '#ccc'
      }
    }
    menuTables.push(<Link className={className} style={style} href={link} key={tableName}>{tableName}</Link>)
    selectorTables.push(<option selected={currentTable === tableName} value={link}>{tableName}</option>)
  }

  let display;
  if (props.selector) {
    if (props.auto === true) {
      display = <select onChange="location=this.options[this.selectedIndex].value">{selectorTables}</select>
    } else {
      display = <select name={props.auto}>{selectorTables}</select>
    }
  } else {
    display = <div className="menuTables">{menuTables}</div>
  }

  return <>
    {display}
  </>;
}

function getClassName(tableName, prefixes) {
  let end = tableName.indexOf('_', 3)
  if (end < 0) {
    end = 50
  }
  let prefix = tableName.substring(0, end)
  if (typeof prefixes[prefix] !== 'undefined' && prefixes[prefix] > 1) {
    return 't1'
  } else {
    return 't2'
  }
}

// статистика префиксов
function prefixStat(tables) {
  let prefixes = {}
  for (const row of tables) {
    const tableName = row.Name
    let end = tableName.indexOf('_', 3)
    if (end < 0) {
      end = 50
    }
    const prefix = tableName.substring(0, end)
    if (typeof prefixes[prefix] === 'undefined') {
      prefixes[prefix] = 1
    } else {
      prefixes[prefix] ++
    }
  }
  return prefixes;
}
