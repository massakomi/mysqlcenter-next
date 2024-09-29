'use client'
import Link from "next/link";
import {useRouter} from 'next/navigation';
import {checkedCheckboxes, formatSize} from '@/app/ui/functions';

export function Compare(props) {
  const router = useRouter();

  const header = (params) => {
    let cellsWithTitles = []
    let dbc = props.databases.length;
    for (let param of params) {
      cellsWithTitles.push(<td key={param} colSpan={dbc}>{param}</td>)
    }
    let cellsWithDatabases = []
    for (let param of params) {
      for (let v of props.databases) {
        cellsWithDatabases.push(<td key={param + v}>{v}</td>)
      }
    }
    return <>
      <tr>
        <td rowSpan="2">&nbsp;</td>
        <td rowSpan="2">Таблица</td>
        {cellsWithTitles}</tr>
      <tr>{cellsWithDatabases}</tr>
    </>
  }

  const getTablesArray = (dbArray) => {
    let tablesArray = {}
    for (const db in dbArray) {
      for (const table in dbArray[db]) {
        tablesArray [table]= table;
      }
    }
    tablesArray = Object.values(tablesArray)
    tablesArray.sort()
    return tablesArray
  }

  // Существует или нет - просто
  const cellsExists = (row, dbArray, table) => {
    let cells = []
    let style = {} // cell style
    let rowClass = ''
    for (const db in dbArray) {
      if (Object.keys(dbArray[db]).includes(table)) {
        cells.push(<Link href={`/tbl_data/${db}/${table}`}>есть</Link>)
      } else {
        cells.push('-')
        rowClass = 'diff';
      }
    }
    for (let text of cells) {
      row.push({text, style})
    }
    return rowClass;
  }

  // Сравнение по количеству строк
  const cellsRows = (row, dbArray, table) => {
    let cells = []
    let style = {} // cell style
    let countRowsPrev = null;
    for (const db in dbArray) {
      const countRows = dbArray[db][table] ? dbArray[db][table].Rows : '-';
      if (countRows === countRowsPrev) {
        style.backgroundColor = '#ccffcc';
      }
      cells.push(countRows)
      countRowsPrev = countRows;
    }
    for (let text of cells) {
      row.push({text, style})
    }
  }

  // Сравнение по размеру данных
  const cellsSize = (row, dbArray, table) => {
    let cells = []
    let style = {} // cell style
    let valueSizePrev = null;
    for (const db in dbArray) {
      if (dbArray[db][table]) {
        let valueData = parseInt(dbArray[db][table].Data_length) + parseInt(dbArray[db][table].Index_length);
        valueData = formatSize(valueData, 0);
        if (valueData === valueSizePrev) {
          style.backgroundColor = '#99ff99';
        }
        cells.push(valueData)
        valueSizePrev = valueData;
      } else {
        cells.push('-')
      }
    }
    for (let text of cells) {
      row.push({text, style})
    }
  }

  // Сравнение структур из экспорта
  const cellsExport = (row, dbArray, table, exportArray) => {
    let cells = []
    let style = {} // cell style
    let exportDataPrev = null;
    for (const db in dbArray) {
      if (dbArray[db][table]) {
        let exportData = exportArray[db][table]
        if (exportData) {
          if (exportData === exportDataPrev) {
            style.backgroundColor = '#66ff66';
          } else if (exportDataPrev !== null) {
            exportDifference [table] = [exportDataPrev, exportData]
          }
        }
        exportDataPrev = exportData;
        cells.push('+')
      } else {
        cells.push('-')
      }
    }
    for (let text of cells) {
      row.push({text, style})
    }
  }

  const body = () => {

    let dbArray = props.dbArray;
    let exportArray = props.exportArray;
    const tablesArray = getTablesArray(dbArray)
    const exportDifference = {}
    let rows = []
    for (let tableNum = 0; tableNum < tablesArray.length; tableNum++) {
      const table = tablesArray[tableNum]
      let row = []
      row.push(<input name="table[]" type="checkbox" value={table} className="cb" id={`t-${tableNum}`}/>)
      row.push(<label htmlFor={`t-${tableNum}`}>{table}</label>)

      let rowClass = cellsExists(row, dbArray, table);
      cellsRows(row, dbArray, table);
      cellsSize(row, dbArray, table);
      cellsExport(row, dbArray, table, exportArray);

      rows.push(buildRow(row, rowClass, rows.length))
    }

    return {rows, exportDifference}
  }

  const printDifference = (exportDifference) => {
    let values = []
    for (const db in exportDifference) {
      for (const table in exportDifference[db]) {
        let data = exportDifference[db][table]
        values.push(<li>{db} {table} <pre>{data}</pre></li>)
      }
    }
    return <ul>{values}</ul>
  }

  const buildRow = (values, rowClass, rowIndex) => {
    let cells = []
    values.forEach(function (value, key) {
      let style = {}
      if (typeof value.style !== 'undefined') {
        style = value.style
        value = value.text
      }
      cells.push(<td key={`td-${rowIndex}-${key}`} style={style}>{value}</td>)
    })
    return <tr key={`row-${rowIndex}`} className={rowClass}>{cells}</tr>
  }

  const compareSelected = (event) => {
    event.preventDefault()
    const tables = checkedCheckboxes()
    const [db1, db2] = props.databases;
    const path = `/tbl_compare/${db1}/${tables.join('/')}/?database=${db2}`
    router.push(path)
  }

  let params = ['Есть?', 'Рядов', 'Размер', 'Стр-ра']
  const customHeader = header(params)
  const {rows, exportDifference} = body()
  return (
    <form onSubmit={compareSelected}>
      <input type="submit" value="Сравнить выбранные" className="submit"/>
      <table className="contentTable anone">
        <thead>
        {customHeader}
        </thead>
        <tbody>
        {rows}
        </tbody>
      </table>
      {printDifference(exportDifference)}
    </form>
  );
}
