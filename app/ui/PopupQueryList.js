'use client'
import {useState} from "react";

export function PopupQueryList(props) {
  const [opened, setOpened] = useState(false);
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