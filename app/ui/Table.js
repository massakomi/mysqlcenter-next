'use client'
import {useRef} from "react";
import Link from "next/link";

export default function Table({data, title = ''}) {
  if (data === null || data === undefined) {
    return ;
  }
  let rows = []
  let header = ''
  let index = 0
  if (data instanceof Array) {
    if (!data.length) {
      return ;
    }
    for (let row of data) {
      let title;
      if (row.hasOwnProperty('cells')) {
        title = row.title;
        row = row.cells;
      }
      if (!header) {
        header = <Row key={index++} values={Object.keys(row)} tag="th" />
      }
      let values = Object.values(row)
      rows.push(<Row key={index++} values={values} title={title} />)
    }
  } else {
    Object.entries(data).map(([key, value]) => {
      rows.push(<Row key={index++} values={[key, value]} />)
    });
  }

  return <>
    {title ? <h2>{title}</h2> : null}
    <table className="contentTable">
      {header ? <thead>{header}</thead> : null}
      <tbody>{rows}</tbody>
    </table>
  </>
}

function Row({values, tag='td', title = ''}) {
  let j = useRef(0);
  let i = useRef(0);
  let cells = []
  values.forEach((value) => {
    cells.push(<Cell key={j.current++} tag={tag} value={value} />)
  })
  return (
    <tr key={i.current++} title={title}>
      {cells}
    </tr>
  );
}

function Cell({tag, value}) {
  if (value !== null && typeof value === 'object') {
    if (value.href) {
      value = <Link href={value.href}>{value.text}</Link>
    }
  }
  if (tag === 'th') {
    return <th>{value}</th>
  } else {
    return <td>{value}</td>
  }
}