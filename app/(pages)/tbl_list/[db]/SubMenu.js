'use client'

import {useParams, usePathname, useSearchParams} from "next/navigation";

export function SubMenu(props) {

  let searchParams = useSearchParams()
  let params = useParams()
  let pathname = usePathname()
  let action = searchParams.get('action') || ''
  if (pathname.includes('structure')) {
    action = 'structure'
  }

  const getClass = (current) => {

    if (action === current) {
      return 'active';
    }
    return '';
  }

  return  (
    <div className="links-block">
      <a className={getClass('')} href={`/tbl_list/${params.db}/`}>Обычная таблица</a>
      <a className={getClass('full')} href={`/tbl_list/${params.db}/?action=full`} title="Отобразить простую таблицу с полными данными всех таблиц, полученными с помощью запроса SHOW TABLE STATUS">Полная таблица</a>
      <a className={getClass('structure')} href={`/tbl_list/${params.db}/structure`}>Исследование структуры таблиц</a>
    </div>
  )
}