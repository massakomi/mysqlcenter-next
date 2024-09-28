'use client'

import {wordwrap} from '@/app/ui/functions';

export function TableStructure(props) {


  let fieldVariants = {}
  for (const v of props.tables) {
    fieldVariants[v.Name] = v.Name
    let variant = v.Name.replace(/[s_]$/, '')
    fieldVariants[variant] = v.Name
    fieldVariants['id_'+variant] = v.Name
    fieldVariants[variant+'_id'] = v.Name
  }

  const listItems = Object.values(props.tables).map((table) => {
    let fields = table.fields

    let comparedTables = []
    Object.values(fields).map((field) => {
      if (field.Field in fieldVariants && fieldVariants[field.Field] !== table.Name) {
        comparedTables.push(fieldVariants[field.Field])
      }
    })
    let after = '';
    if (comparedTables.length) {
      after = <div>{comparedTables.join(' &nbsp; -> &nbsp;')}</div>
    }

    return (
      <div key={table.Name.toString()}>
        <h4>{table.Name} <span className="grey">{table.Rows}</span></h4>
        <table className="optionstable">
          <tbody>
          <tr>
            {Object.values(fields).map((field) => {
              return <TableField key={field.Field} field={field} />
            })}
          </tr>
          <TableData data={table.data} />
          </tbody>
        </table>
        {after}
      </div>
    )
  });

  return (
    <div>
      {listItems}
    </div>
  );
}

function TableData(props) {

  const strip_tags = (item) => {
    return item ? item.replace(/<\/[^>]+(>|$)/g, "") : '';
  }

  return Object.values(props.data).map((items, key) => {
    return (
      <tr key={key + "index"} className="info grey">
        {Object.values(items).map((item, key) => {

          item = wordwrap(strip_tags(item).substring(0, 50))

          return <td key={key + "tds"}>{item}</td>
        })}
      </tr>
    )
  })
}

function TableField(props) {
  let field = props.field
  let classes = [];
  let title = '';

  if (field.Key === 'PRI') {
    if (field.Extra !== '') {
      classes.push('text-red-500')
      title += 'priAI';
    } else {
      classes.push('text-slate-500')
      title += 'pri';
    }
  }
  if (field.Key === 'MUL') {
    classes.push('text-blue-500')
    title += 'index';
  }
  if (field.Null !== 'NO') {
    classes.push('text-green-500')
    title += ' null';
  } else {
    title += ' not null';
  }
  return (
    <th className={classes.join(' ')} title={title}>
      {field.Field}
    </th>
  );
}

