'use client'
import {useRouter} from "next/navigation";

export default function HtmlSelector(props) {

  const router = useRouter()

  const onChange = (e) => {
    if (props.auto) {
      let value = e.target.options[e.target.selectedIndex].value
      if (value) {
        router.push(value)
      }
    }
  }

  let opts = [], i = 0
  for (let key in props.data) {
    let title = props.data[key]
    let value = title
    if (props.keyValues) {
      value = key;
    }
    opts.push(<option value={value} key={i++}>{title}</option>)
  }

  return (
    <select onChange={props.onChange ? props.onChange : onChange.bind(this)}
        name={props.name}
        multiple={props.multiple}
        defaultValue={props.value}
        className={props.className}>{opts}
    </select>
  );
}
