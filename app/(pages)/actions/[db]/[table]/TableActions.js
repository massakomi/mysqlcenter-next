'use client'
export function TableActions(params) {

  const tableAction = (action, e) => {
    let opts = {}
    if (e.target.parentNode.tagName === 'FORM') {
      opts = {
        method: 'POST',
        body: new FormData(e.target.parentNode)
      }
    }
    e.preventDefault()
    fetch(props.url+'&ajax=1&action='+action, opts)
      .then(response => response.json())
      .then(json => {
        if (action === 'tableRename') {
          if (json.page.url) {
            window.location = json.page.url
          }
        } else {
          setState({messages: json.messages})
        }
      });
  }

  return  (
    <div className="globalMenu">
      <a onClick={tableAction.bind(this, "tableCheck")} href="#">Проверить таблицу</a> <br />
      <a onClick={tableAction.bind(this, "tableAnalize")} href="#">Анализ таблицы</a> <br />
      <a onClick={tableAction.bind(this, "tableRepair")} href="#">Починить таблицу</a> <br />
      <a onClick={tableAction.bind(this, "tableOptimize")} href="#">Оптимизировать таблицу</a>  <br />
      <a onClick={tableAction.bind(this, "tableFlush")} href="#">Сбросить кэш таблицы ("FLUSH")</a> <br />
    </div>
  )
}