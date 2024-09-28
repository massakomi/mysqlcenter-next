'use client'

import {querySwr} from '@/app/ui/functions';
import {useParams} from 'next/navigation';

export default function CharsetSelector() {

  const params = useParams();
  let { props, error, isLoading } = querySwr({s: 'actions', db: params.db})

  const buildOpts = () => {
    if (isLoading) {
      return [];
    }
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
    return opts;
  }

  let value = 'utf8';
  if (props.dbInfo) {
    value = props.dbInfo.DEFAULT_CHARACTER_SET_NAME
  }

  return (
    <select name="charset" defaultValue={value} className='mr-2'>
      {buildOpts()}
    </select>
  )
}
