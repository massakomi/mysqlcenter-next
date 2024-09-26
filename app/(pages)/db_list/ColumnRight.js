'use client';
import {DbCreateForm} from './DbCreateForm';
import AddUser from './AddUser';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

export default function ColumnRight(props) {
  const pathname = usePathname();

  let tableLink;
  if (pathname !== '/db_list/full') {
    tableLink = (
      <Link href="/db_list/full" title="Сканирует все таблицы всех баз данных и выводит количество таблиц, размер, дату обновления и количество рядов">
        Показать полную таблицу
      </Link>
    );
  } else {
    tableLink = <Link href="/db_list">Показать краткую таблицу</Link>;
  }

  return (
    <>
      <DbCreateForm />

      <div className="mt-10">{tableLink}</div>

      <div className="mt-10">{props.appName}</div>
      <div>Версия {props.appVersion}</div>
      <div>Хост: {props.dbHost}</div>

      <div className="mt-10">Версия сервера: {props.mysqlVersion}</div>
      <div>Версия PHP: {props.phpversion}</div>

      <AddUser />
    </>
  );
}
