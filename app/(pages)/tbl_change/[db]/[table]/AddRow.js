'use client';
import {wordwrap} from '@/app/ui/functions';
import InsertInput from '@/app/(pages)/tbl_change/[db]/[table]/InsertInput';
import HtmlSelector from '@/app/(pages)/search/[db]/HtmlSelector';
import {useRef, useState} from 'react';

export default function AddRow(props) {

  let i = props.i
  let j = props.j
  let name = props.name
  let fields = props.fields

  let initialValue = props.value || ''
  if (initialValue === 'CURRENT_TIMESTAMP') {
    initialValue = ''
  }
  const [value, setValue] = useState(initialValue)

  const [checked, setChecked] = useState((value == '' && fields[name].Null === 'YES'))

  const nullClick = (event) => {
    setChecked(event.target.checked)
    if (event.target.checked) {
      setValue('')
    }
  }
  const nameChange = (event) => {
    setValue(event.target.value)
    if (event.target.value === '') {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }

  let type = fields[name].Type.replace(',', ', ')

  let funcs = ['', 'md5']

  return (
    <tr>
      <td>
        <b className="field">{name}</b>
        <br />
        {wordwrap(type)}
      </td>
      <td>
        <input name={`isNull[${j}][${i}]`} type="checkbox" onChange={nullClick} value="1" checked={checked} />
      </td>
      <td>
        <InsertInput {...props} value={value} type={type} change={nameChange} />
      </td>
      <td>
        <HtmlSelector data={funcs} name={`func[${j}][${i}]`} />
      </td>
    </tr>
  )
}

