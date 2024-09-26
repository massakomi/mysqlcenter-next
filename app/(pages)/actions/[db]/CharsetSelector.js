'use client'

export default function CharsetSelector(props) {
  let opts = [],
    i = 0
  for (let charset in props.charsets) {
    let title = null
    let info = props.charsets[charset]
    if (typeof info == 'object') {
      title = info.Description + ' (default: ' + info['Default collation'] + ')'
    }
    opts.push(
      <option key={i++} title={title}>
        {charset}
      </option>
    )
  }

  return (
    <select name="charset" defaultValue={props.value ? props.value : 'utf8'}>
      {opts}
    </select>
  )
}
