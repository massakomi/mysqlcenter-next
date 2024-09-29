'use client'

import Link from "next/link";

export default function TableFull(props) {

  let nz = Intl.NumberFormat(undefined, {'maximumFractionDigits': 0});
  let nf = Intl.NumberFormat(undefined, {'minimumFractionDigits': 1, 'maximumFractionDigits': 1});
  let trs = [], countTotalTables = 0, countTotalSize = 0, countTotalRows = 0;
  for (let i = 0; i < props.databases.length; i++) {
    let db = props.databases[i]['name'];
    let href = `/tbl_list/${db}`
    let idRow = "db"+db;

    let extra = props.databases[i]['extra'];
    let countTables = 0, countSize = 0, countRows = 0, updateTime = 0;
    for (let status of extra) {
      countTables ++;
      if (status.Update_time) {
        let ts = Date.parse(status.Update_time) / 1000;
        if (ts > updateTime) {
          updateTime = ts
        }
      }
      let rows = parseInt(status.Rows)
      if (!isNaN(rows)) {
        countRows += rows
      }
      let size = ((parseInt(status.Data_length) + parseInt(status.Index_length)) / 1024)
      if (!isNaN(size)) {
        countSize += size
      }
    }

    countTotalTables += countTables
    countTotalSize += countSize
    countTotalRows += countRows

    if (updateTime) {
      updateTime = new Date(updateTime * 1000)
      updateTime = updateTime.toLocaleString()
    }

    trs.push(
      <tr key={i}>
        <td><input name="databases[]" type="checkbox" value={db} className="cb" /></td>
        <td><Link href={href} title="Структура БД" id={idRow}>{db}</Link></td>
        <td>{countTables}</td>
        <td>{updateTime}</td>
        <td>{nz.format(countRows)}</td>
        <td>{nf.format(countSize)}</td>
      </tr>
    )
  }

  return (
    <table className="contentTable" id="structureTableId">
      <thead>
      <tr>
        <th>#</th>
        <th>Название</th>
        <th>Таблиц</th>
        <th>Обновлено</th>
        <th>Рядов</th>
        <th>Размер</th>
      </tr>
      </thead>
      <tbody>
      {trs}
      </tbody>
      <tfoot>
      <tr>
        <td></td>
        <td></td>
        <td>{countTotalTables}</td>
        <td></td>
        <td>{nz.format(countTotalRows)}</td>
        <td>{nf.format(countTotalSize)}</td>
      </tr>
      </tfoot>
    </table>
  );
}