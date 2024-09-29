'use client'

import {useSelector} from "react-redux";
import {useState} from 'react';

export function Messages(props) {
  const messages = useSelector((state) => state.messages.value)
  return <>
          {messages ? <List messages={messages} /> : <List messages={props.messages} />}
        </>;
}

function List({messages}) {
  if (typeof messages.map === 'undefined') {
    return;
  }
  const [opened, setOpened] = useState(true);
  if (!messages.length) {
    return <></>;
  }
  return (
    <div className="globalMessage">
      <div className="th">
        Сообщение
        <span role='button' className="hiddenSmallLink text-white ml-2" onClick={() => setOpened(!opened)}>{opened ? 'close' : 'open'}</span>
      </div>
      <div hidden={!opened}>
        {messages.map((item, key) =>
          <Message item={item} key={key} />
        )}
      </div>
    </div>)
}

function Message({item}) {
  if (item === undefined) {
    return <div>undefined message</div>;
  }
  if (item.text) {
    let text = item.text
    if (item.rows > 0) {
      text += ` [${item.rows}]`
    }
    let sql = '';
    if (item.sql) {
      sql = <div className="sqlQuery">{item.sql}</div>
    }
    let mysqlError = '';
    if (item.error && item.error !== item.text) {
      mysqlError = <div className="mysqlError ml-2">{item.error}</div>
    }
    return <div style={{color: item.color}}>
            {text} {sql} {mysqlError}
          </div>;
  } else {
    return <div>{item}</div>;
  }
}
