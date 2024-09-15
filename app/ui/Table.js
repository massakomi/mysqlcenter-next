'use client'
import {useRef} from "react";

export default function Table({data}) {
  let rows = []
  let header = ''
  let r = 0;
  for (let row of data) {
    if (!header) {
      header = <Row key={r++} values={Object.keys(row)} tag="th" />
    }
    let values = Object.values(row)
    rows.push(<Row key={r++} values={values} />)
  }
  return <>
    <table className="contentTable">
      <thead>
      {header}
      </thead>
      <tbody>
      {rows}
      </tbody>
    </table>
  </>
}

function Row({values, tag='td'}) {
  let j = useRef(0);
  let i = useRef(0);
  let cells = []
  values.forEach((value) => {
    if (tag === 'th') {
      cells.push(<th key={j.current++}>{value}</th>)
    } else {
      cells.push(<td key={j.current++}>{value}</td>)
    }
  })
  return (
    <tr key={i.current++}>
      {cells}
    </tr>
  );
}