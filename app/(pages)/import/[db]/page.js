
export const  metadata = {
  title: 'Импорт данных'
}

export default async function Page({params}) {

  // todo getTable вынести как-то отдельно (тут и MenuTable)
  let data = await fetch(`http://msc/?ajax=1&db=${params.db}`)
  let json = await data.json()
  let props = json.page

  return (
    <div>
      <h1>{metadata.title}</h1>
      <b>1. Выберите таблицу, в которую импортируются данные</b><br />
      <ul>
        {Object.values(props.tables).map((table) =>
          <li key={table.Name}>{table.Name === props.table ?
            <b style={{fontSize: '16px', color: 'red'}}>{table.Name}</b> :
            <a href="#">{table.Name}</a> }
          </li>
        )}
      </ul>

      <h3>2. Выберите файл с данными</h3>
      <form name="form1" encType="multipart/form-data" method="post" action="">
        загрузить с компьютера <input type="file" name="file" /> или <br /><br />
        указать путь к файлу <input type="text" name="textfield" /><br /><br />
        <input type="submit" value="Изменить!" />
      </form>

      <h3>3. Настройка параметров импорта</h3>
      <form name="form1" method="post" action="">
        разделитель <input type="text" name="textfield" /><br /><br />
        <input type="submit" value="Импортировать!" />
      </form>
    </div>
  );
}
