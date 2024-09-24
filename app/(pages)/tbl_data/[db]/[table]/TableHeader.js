'use client'

import {useParams, useSearchParams} from "next/navigation";
import {wordwrap} from "@/app/ui/functions";

export default function TableHeader(props) {

  let headers = getTableHeaders(props.fieldsEx, !props.directSQL, props.headWrap, props.order);

  return (
    <table className="contentTable interlaced">
      <thead>
      <tr valign="top">
        <th><a href="fullText=1" title="Показать полные значения всех полей и убрать переносы заголовков полей" className="hiddenSmallLink" style={{color:'white'}}>full</a></th>
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
 * @return array  Массив заголовков
 * @param fields
 * @param sortEnabled
 * @param headWrap
 */
function getTableHeaders(fields, sortEnabled=true, headWrap=false) {

  const searchParams = useSearchParams()
  const params = useParams();

  let headers = [];
  let pk = [];
  let fieldsCount = Object.keys(fields).length;
  Object.keys(fields).forEach(function(k) {
    let fieldData = fields[k]
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
    let u = `/tbl_data/${params.db}/${params.table}/?order=${fieldData.Field}`
    if (searchParams.get('order') === fieldData.Field) {
      u += '-'
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
      link = <a href={u} className='sort' title='Сортировать' key={k}>{fieldData.Field}</a>
    }
    headers.push(link)
  })
  return headers;
}