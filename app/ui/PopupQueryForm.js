'use client'

import {msDisplaySql} from "@/app/ui/functions";
export function PopupQueryForm() {
  return (
    <form action="/sql" className="popupGeneralForm tableFormEdit" method="post"
          name="sqlPopupQueryForm" id="sqlPopupQueryForm" style={{textAlign: 'right'}}>
      <input type="submit" value="Отправить запрос!"/>
      <textarea name="sql" rows="15" wrap="off"></textarea>
      <span onClick={msDisplaySql}>закрыть</span>
    </form>
  )
}