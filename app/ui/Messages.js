export function Messages(props) {
  let config = {
    showmessages: 1
  }
  //if (config.showmessages === 1) {
  return <div className="messages">{props.messages.map((item, key) =>
    <span key={key} style={{color: item.color}}>{item.text}</span>
  )}</div>
  //}
}