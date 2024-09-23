'use client'
import {DbCreateForm} from "./DbCreateForm";
import AddUser from "./AddUser";

export default function ColumnRight(props) {

  let tableLink;
  if (!props.showFullInfo) {
    tableLink = <a href={`?s=db_list&db=${props.dbname}&mode=full`} title="Сканирует все таблицы всех баз данных и выводит количество таблиц, размер, дату обновления и количество рядов">Показать полную таблицу</a>
  } else {
    tableLink = <a href={`?s=db_list&db=${props.dbname}`}>Показать краткую таблицу</a>
  }

  return (
    <>
      <DbCreateForm />

      <div className="mt-10">
        {tableLink} <br />
        <a href={`?s=db_list&db=${props.dbname}&mode=speedtest`}>Тест скорости</a>
      </div>

      <div className="mt-10">{props.appName}</div>
      <div>Версия {props.appVersion}</div>
      <div>Хост: {props.dbHost}</div>

      <div className="mt-10">Версия сервера: {props.mysqlVersion}</div>
      <div>Версия PHP: {props.phpversion}</div>
      <div>БД: {props.dbname}<br /></div>

      <AddUser />
    </>
  );
}