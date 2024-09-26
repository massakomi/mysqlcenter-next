'use client'

import {formatSize, image} from "@/app/ui/functions";
import {customAction} from "@/app/ui/actions";
import {setMessages} from "@/lib/features/messagesReducer";
import {useDispatch} from "react-redux";
import Table from "@/app/ui/Table";
import {useSearchParams} from "next/navigation";
import Link from "next/link";
import Actions from "@/app/(pages)/tbl_list/[db]/Actions";
import {SubMenu} from "@/app/(pages)/tbl_list/[db]/SubMenu";
import {useState} from "react";

export default function TableList(props) {

  const dispatch = useDispatch()
  // Возникает ошибка
  // Cannot update a component (`Messages`) while rendering a different component (`TableList`).
  /*if (props.messages) {
    dispatch(setMessages(props.messages))
  }*/

  const deleteTable = async (db, table)  => {
    if (!confirm('Подтвердите...')) {
      return false;
    }
    let json = await customAction('tableDelete', {db, table})
    dispatch(setMessages(json.messages))
  }

  const truncateTable = async(db, table) => {
    if (!confirm('Подтвердите...')) {
      return false;
    }
    let json = await customAction('tableTruncate', {db, table})
    dispatch(setMessages(json.messages))
  }

  const renameTable = async (table, id, e) => {
    let newName = prompt('Новое имя', table)
    if (newName) {
      let json = await customAction('tableRename', {db: props.db, table, newName})
      dispatch(setMessages(json.messages))
    }
  }

  const renderRow = (table, key) => {
    // Увеличение счётчика видимых таблиц
    let sumTable = key + 1
    // Форматирование даты
    let updateTime = null;
    if (table.Update_time) {
      updateTime = (new Date(table.Update_time)).toLocaleString() // TODO сделать date2rusString
    }
    /*if ($o->Update_time > 0) {
      $updateTime = strtotime($o->Update_time);
      $updateTime = date2rusString(MS_DATE_FORMAT, $updateTime);
      if (strpos($updateTime, 'дня') !== false || strpos($updateTime, 'ера') !== false) {
        $updateTime = "<b>$updateTime</b>";
      }
    }*/
    // Форматирование названия таблицы
    let valueName = table.Name
    if (table.Rows === '0') {
      valueName = <span style={{color: '#aaa'}}> {valueName}</span>
    }
    // Определение размера таблицы
    let size = Math.round((parseInt(table.Data_length) + parseInt(table.Index_length)) / 1024);
    sumSize += parseInt(size);
    sumRows += parseInt(table.Rows);
    // Сборка значения рядов
    let idChbx = 'table_' + table.Name
    let engine = table.Engine === 'MyISAM' ? <span style={{color: '#ccc'}}>MyISAM</span> : table.Engine;

    return (
      <tr key={table.Name}>
        <td><input name="table[]" type="checkbox" value={table.Name} id={idChbx} className="cb" /></td>
        <td className="tbl"><label htmlFor={idChbx} onDoubleClick={renameTable.bind(this, table.Name)}>{valueName}</label></td>
        <td><Link href={`/tbl_data/${props.db}/${table.Name}`} title="Обзор таблицы">{image("actions.gif")}</Link></td>
        <td><Link href={`/tbl_struct/${props.db}/${table.Name}`} title="Структура таблицы">{image("generate.png")}</Link></td>
        <td>
          <span role="button" onClick={() => truncateTable(props.db, table.Name)} title="Очистить таблицу">{image("delete.gif")}</span>
        </td>
        <td>
          <span role="button" onClick={() => deleteTable(props.db, table.Name)} title="Удалить таблицу">{image("close.png")}</span>
        </td>
        <td className="rig">{table.Rows}</td>
        <td className="rig">{formatSize(size)}</td>
        <td>{updateTime}</td>
        <td className="num">{table.Auto_increment}</td>
        <td><span>{engine}</span></td>
        <td className="rig"><span title={table.Collation} style={{color: '#aaa'}}>{table.Collation.substring(0, table.Collation.indexOf("_"))}</span></td>
      </tr>
    )
  }

  let searchParams = useSearchParams()
  const [tables, setTables] = useState(Object.values(props.tables));
  if (searchParams.get('action') === 'full') {
    return <Table data={props.tables} />;
  }

  let sumSize = 0;
  let sumRows = 0;

  let trs = tables.map((table, key) => renderRow(table, key))

  return (
    <>
      <table className="contentTable interlaced">
        <thead>
        <tr>
          <th></th>
          <th><b>Таблица</b></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th><b>Рядов</b></th>
          <th><b>Размер</b></th>
          <th><b>Дата обновления</b></th>
          <th><b>Ai</b></th>
          <th>Engine</th>
          <th>Cp</th>
        </tr></thead>
        <tbody>
        {trs}
        <tr>
          <td></td>
          <td className="tbl">{tables.length} таблиц</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td className="rig">{Number(sumRows).toFixed(0)}</td>
          <td className="rig">{formatSize(sumSize)}</td>
          <td></td>
          <td className="num">&nbsp;</td>
          <td></td>
          <td className="rig">&nbsp;</td>
        </tr></tbody>
      </table>
      <Actions setTables={setTables} tables={props.tables} />
      <SubMenu />
    </>
  );

}