'use client'
import {useState} from "react";

export function PopupSqlForm() {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <span className="popupGeneralFormOpen hiddenText"
            onClick={() => setOpened(!opened)}
            title="Кликните, чтобы открыть форму быстрого запроса">quick-sql
      </span>
      <form action="/sql" method="post" id="sqlPopupQueryForm"
            className={'popupGeneralForm tableFormEdit' + (opened ? ' ' : ' hidden')}
            name="sqlPopupQueryForm" style={{textAlign: 'right'}}>
        <input type="submit" value="Отправить запрос!"/>
        <textarea name="sql" rows="15" wrap="off"></textarea>
        <span onClick={() => setOpened(false)}>закрыть</span>
      </form>
    </>
  )
}