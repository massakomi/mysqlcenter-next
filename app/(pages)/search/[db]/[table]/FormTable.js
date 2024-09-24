'use client'

import {useParams} from "next/navigation";
import {customAction, dbCreate} from "@/app/ui/actions";
import {setMessages} from "@/lib/features/messagesReducer";
import {useDispatch} from "react-redux";
import HtmlSelector from "@/app/(pages)/search/[db]/HtmlSelector";

export function FormTable(props) {

  const params = useParams();
  const dispatch = useDispatch()

  const onFunctionChange = (e) => {
    document.querySelector('#where').value += e.target.options[e.target.selectedIndex].text + ' '
  }

  const searchAndReplace = async (e) => {
    e.preventDefault()
    let formData = new FormData(e.target);
    let json = await customAction('tableReplace', formData)
    dispatch(setMessages(json.messages))
  }

  let fields = props.fields || [];
  if (!fields.includes('[поля]')) {
    fields.unshift('[поля]')
  }
  let opers = ['[операнды]', ' = ', ' != ', ' < ', ' > ', 'IS NULL',
    ' LIKE "%%" ', ' LIKE "%" ', ' LIKE "" ', ' NOT LIKE "" ',
    ' REGEXP "^fo" '];
  let funcs = ['[функции]', 'UPPER()', 'LOWER()', 'TRIM()', 'SUBSTRING()', 'REPLACE()', 'REPEAT()']

  return (
    <div>
      <fieldset className="msGeneralForm">
        <legend>Добавить к условию WHERE</legend>
        <form action={`/tbl_data/${params.db}/${params.table}`} method="get">
          <input name="where" type="text" id="where" className="w95 me-2" />
          <input type="submit" value="Выполнить!" className="submit mr10 me-2" style={{display: 'inline'}} />
          <span className="mr10 me-2">вставить</span>

          <HtmlSelector data={fields} onChange={onFunctionChange} className="me-2" />
          <HtmlSelector data={opers} onChange={onFunctionChange} className="me-2" />
          <HtmlSelector data={funcs} onChange={onFunctionChange} className="me-2" />

        </form>
      </fieldset>

      <fieldset className="msGeneralForm">
        <legend>Найти и заменить</legend>
        <form onSubmit={searchAndReplace}>
          <table width="100%"  border="0" cellSpacing="0" cellPadding="3">
            <tbody>
            <tr>
              <td width="100">Найти</td>
              <td><input name="search_for" className="w95" type="text" defaultValue="" /></td>
            </tr>
            <tr>
              <td width="100">Заменить</td>
              <td><input name="replace_in" className="w95" type="text" defaultValue="" /></td>
            </tr>
            <tr>
              <td width="100">Поле</td>
              <td><HtmlSelector data={props.fields} name="field" /></td>
            </tr>
            </tbody>
          </table>
          <input type="hidden" name="db" value={params.db} />
          <input type="hidden" name="table" value={params.table} />
          <input type="submit" value="Выполнить" className="submit" />
        </form>
      </fieldset>
    </div>
  );
}