'use client'

import {useSelector} from "react-redux";

export function Messages(props) {
  let config = {
    showmessages: 1
  }
  const messages = useSelector((state) => state.messages.value)
  return <>
          {messages ? <List messages={messages} /> : <List messages={props.messages} />}
        </>;
}

function List({messages}) {
  if (typeof messages.map === 'undefined') {
    return;
  }
  if (!messages.length) {
    return <></>;
  }
  return (
    <div className="globalMessage">
      <div className="th">Сообщение</div>
      <div>
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
    if (item.sql) {
      mysqlError = <div className="mysqlError">{item.error}</div>
    }
    return <div style={{color: item.color}}>
            {text} {sql} {mysqlError}
          </div>;
  } else {
    return <div>{item}</div>;
  }
}
