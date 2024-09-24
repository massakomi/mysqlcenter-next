import {configPage} from "@/app/ui/actions";
import {Buttons} from "@/app/(pages)/config/Buttons";

export const  metadata = {
  title: 'Настройки'
}

export default async function Page() {

  const props = await configPage()

  const trs = props.data.map((item) => {
    if (!item.includes('|')) {
      return;
    }
    let [name, title, value, type] = item.split('|')
    let input = ''
    if (type.includes('boolean')) {
      input = <input type="checkbox" name={name} value="1" defaultChecked={value !== '0'} />
    } else {
      input = <input type="text" name={name} defaultValue={value} />
    }
    return (
      <tr key={item.toString()}>
        <td>{title}</td>
        <td>{input}</td>
      </tr>
    )

  });

  return (
    <form>
      <h1>{metadata.title}</h1>
      <table>
        <thead>
        <tr>
          <th>Параметр</th>
          <th>Значение</th>
        </tr>
        </thead>
        <tbody>{trs}</tbody>
      </table>
      <Buttons />
    </form>
  );

}
