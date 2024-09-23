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
  if (item.text) {
    return <div style={{color: item.color}}>{item.text}</div>;
  } else {
    return <div>{item}</div>;
  }
}
