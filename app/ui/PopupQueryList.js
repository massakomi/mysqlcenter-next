'use client'
import {useState} from "react";

// todo Сейчас блок не нужен, но может быть туда вывести все запросы, которые приходят с messsages

export function PopupQueryList(props) {
  const [opened, setOpened] = useState(false);
  if (!props.queries) {
    return <></>;
  }
  return (
    <span className="queryPopupBlock">
      <span className="hiddenText" onClick={() => setOpened(!opened)}>запросы</span>
      <span className="count">{props.queries.length}</span>
      <div className={opened ? '' : 'hidden'}>
        {props.queries.map((q, key) =>
          <span key={key}>{q}</span>
        )}
      </div>
    </span>
  )
}