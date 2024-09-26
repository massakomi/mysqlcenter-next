export default function Selector(props) {
  let options = []

  if (props.data) {
    options = props.data.map((value, i) =>
      <option key={i} value={i}>{value}</option>
    );
  } else {
    for (let i = props.from; i <= props.to; i ++) {
      options.push(
        <option key={i}>{i}</option>
      )
    }
  }

  return (
    <select name={props.name} defaultValue={props.value}>
      {options}
    </select>
  );
}
