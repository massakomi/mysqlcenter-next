'use client';
import {htmlspecialchars, processRowValue} from '@/app/ui/functions';
import {useDispatch} from 'react-redux';
import {setMessages} from '@/lib/features/messagesReducer';
import {useEffect} from 'react';

export default function TablesCompare(props) {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMessages(props.messages))
  }, [])

  if (!props) {
    return ;
  }

  let compares = []
  for (let table in props.tables) {
    let options = props.tables[table]
    compares.push(<div key={table}><h3>Таблица: {table}</h3><TableCompare {...options} databases={props.databases} /></div>)
  }
  return <div>
    {compares}
  </div>;
}


function compareData(data, fields, databases) {
  let output = []

  const db1 = databases[0]
  const db2 = databases[1]

  for (let row of Object.values(data)) {
    let values = ['+', '+']
    let classes = [];
    let rowValues = []
    if (typeof row[db1] !== 'undefined') {
      if (row[db1] === '-') {
        values = ['-', '+']
        rowValues = processValues(row[db2], fields)
      } else if (row[db2] === '-') {
        values = ['+', '-']
        rowValues = processValues(row[db1], fields)
      } else {
        classes.push('text-green-500')
        let value1p, value2p
        for (let [field, value1] of Object.entries(row[db1])) {
          let type = fields[field].Type;
          value1p = processRowValue(value1, type, 50);
          value2p = processRowValue(row[db2][field], type, 50);
          if (value1 === row[db2][field]) {
            rowValues.push({
              'text': value1p,
              'class': 'bg-green-300'
            })
          } else {
            rowValues.push({
              'text': [value1p, value2p],
              'class': 'bg-red-300'
            })
          }
        }
      }
    } else {
      classes.push('text-red-500')
      rowValues = processValues(row[db2], fields)
    }
    output.push({
      'cells': [...values, ...rowValues],
      'class': classes.join(' ')
    })
  }
  return output;
}

function processValues(data, fields) {
  let outputValues = []
  for (let [field, value] of Object.entries(data)) {
    let type = fields[field]?.Type || '';
    let valueProcessed = processRowValue(value, type, 50);
    outputValues.push(valueProcessed)
  }
  return outputValues;
}

function groupData({databases, data1, data2, fields, pk}) {
  const primaryKey = pk[0]
  const db1 = databases[0]
  const db2 = databases[1]
  let data = {}
  for (const item of data1) {
    const value = item[primaryKey]
    if (typeof data [value] === 'undefined') {
      data [value] = {}
    }
    data [value][db1] = item
    data [value][db2] = '-'
  }
  for (const item of data2) {
    const value = item[primaryKey]
    if (typeof data [value] === 'undefined') {
      data [value] = {}
    }
    if (typeof data [value][db1] !== 'undefined') {
      if (data [value][db1] === value) {
        data [value] = item
      } else {
        data [value][db2] = item
      }
    } else {
      data [value][db1] = '-'
      data [value][db2] = item
    }
  }
  return data;
}

function TableHeader({databases, fields}) {
  let cells = []
  for (let database of databases) {
    cells.push(<th key={database}>{database}</th>)
  }
  for (let field in fields) {
    cells.push(<th key={field}>{field}</th>)
  }
  return <tr>{cells}</tr>;
}

function TableBody(props) {
  let data = groupData(props);
  data = compareData(data, props.fields, props.databases);
  return buildRows(data);
}

function buildRows(data) {
  let outputRows = []
  data.forEach(function (cells, rowKey) {
    cells = cells.cells
    let outputCells = []
    cells.forEach(function (values, key) {
      let className = ''
      if (values instanceof Object) {
        className = values.class;
        values = values.text
      }
      if (!(values instanceof Array)) {
        values = [values]
      }
      outputCells.push(
        <td className={className} key={key}>
          {values.map((value, valueKey) => (
            <div key={`${valueKey} ${rowKey}-${key}`}>{value}</div>
          ))}
        </td>
      )
    });
    outputRows.push(<tr className={cells.class} key={rowKey}>{outputCells}</tr>)
  });
  return outputRows;
}

function TableCompare(props) {
  return <table className="contentTable">
    <thead>
    <TableHeader databases={props.databases} fields={props.fields} />
    </thead>
    <tbody>
    <TableBody databases={props.databases} {...props} />
    </tbody>
  </table>
}
