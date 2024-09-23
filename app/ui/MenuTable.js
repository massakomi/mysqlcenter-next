'use client'

import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import Link from "next/link";

export function MenuTable(props) {

  const urlParams = useParams()
  const [tables, setTables] = useState(false);
  useEffect(() => {
    if (!urlParams.db) {
      return () => {};
    }
    fetch(`http://msc/?ajax=1&db=${urlParams.db}`)
      .then(response => response.json())
      .then((json) => {
        setTables(json.page.tables)
      })
  }, []);

  if (tables === false) {
    return <></>;
  }
  if (tables.length === 0) {
    return <>Нет таблиц в БД</>;
  }

  return displayTables(tables, props, urlParams);
}

function displayTables(tables, props, urlParams) {

  let prefixes = prefixStat(tables)

  let menuTables = [];
  let selectorTables = [];
  let currentTable = '';
  for (let table of tables) {
    if (!urlParams.db) {
      continue;
    }
    const tableName = table.Name;
    let className = getClassName(tableName, prefixes)

    let page = 'tbl_data';
    let link = `/${page}/${urlParams.db}/${tableName}`
    //console.log(table)
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
