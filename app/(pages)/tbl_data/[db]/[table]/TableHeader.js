'use client'

import {useParams, useSearchParams} from "next/navigation";
import {wordwrap} from "@/app/ui/functions";
import Link from "next/link";

export default function TableHeader(props) {

  const searchParams = useSearchParams()
  const params = useParams();
  let headers = getTableHeaders(searchParams, params, props);

  return (
    <table className="contentTable interlaced">
      <thead>
      <tr valign="top">
        <th><Link href="?fullText=1" title="Показать полные значения всех полей и убрать переносы заголовков полей" className="hiddenSmallLink" style={{color:'white'}}>full</Link></th>
        <th></th>
        <th></th>
        {headers.map((h, k) =>
          <th key={k}>{h}</th>
        )}
      </tr>
      </thead>
      <tbody>
      {props.children}
      </tbody>
    </table>
  );
}

/**
 * (для tbl_data и tbl_compare) Получить массив заголовков для таблицы данных. Заголовки для таблиц данных
 * формируются особым образом, с переносом.
 *
 * @package data view
 * @param searchParams
 * @param params
 * @param props
 * @return array  Массив заголовков
 */
function getTableHeaders(searchParams, params, props) {
  let fields = props.fieldsEx
  let sortEnabled = !props.directSQL
  let headWrap = props.headWrap
  let headers = [];
  let pk = [];
  let fieldsCount = Object.keys(fields).length;
  Object.keys(fields).forEach(function(key) {
    let fieldData = fields[key]
    let isWrapped = fieldData.Type.match(/(int|enum|float|char)/i) !== null
    if (!headWrap || fieldData.Field.length <= headWrap) {
      isWrapped = false
    }
    if (fieldsCount <= 10) {
      isWrapped = false
    }
    if (searchParams.get('fullText') === '1') {
      isWrapped = false
    }
    let url = `/tbl_data/${params.db}/${params.table}/?order=${fieldData.Field}`
    if (searchParams.get('order') === fieldData.Field) {
      url += '-'
    }
    let link = fieldData.Field;
    if (isWrapped) {
      fieldData.Field = wordwrap(fieldData.Field, headWrap, "\n", true);
      fieldData.Field = fieldData.Field.split("\n")
      let f = []
      let i = 0
      for (let x of fieldData.Field) {
        f.push(<span key={i}>{x}<br /></span>)
        i ++
      }
      fieldData.Field = f
    }
    if (sortEnabled) {
      link = <Link href={url} className='sort' title='Сортировать' key={key}>{fieldData.Field}</Link>
    }
    headers.push(link)
  })
  return headers;
}