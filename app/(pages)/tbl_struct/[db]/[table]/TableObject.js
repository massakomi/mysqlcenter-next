'use client'

export default function TableObject(props) {

  // нулевой элемент раскидвать по ключ-значение, бред редко нужно
  let tableInfo = props.data[0]
  const listItems = []
  for (const key in tableInfo) {
    let title = key in props.columns ? props.columns[key] : ''
    listItems.push(
      <tr key={key+"index"} title={title}>
        <td>{key}</td>
        <td>{tableInfo[key]}</td>
      </tr>
    )
  }

  return (
    <table className="contentTable">
      <tbody>
      {listItems}
      </tbody>
    </table>
  )
}