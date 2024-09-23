
import {serverInfo} from "@/app/ui/actions";
import Table from "@/app/ui/Table";
export const  metadata = {
  title: 'Различная информация'
}

export default async function Page() {
  let props = await serverInfo();
  return (
    <>
      <h1>{metadata.title}</h1>

      <h2>Пользователи</h2>
      <Table data={props.users} />

      <h2>SHOW GRANTS</h2>
      <p>Список привилегий, предоставленных аккаунту, который вы используете для соединения с сервером (FOR CURRENT_USER)</p>
      <Table data={props.grants} />

      <h2>SHOW PRIVILEGES</h2>
      <p>Список системных привилегий, которые поддерживает MySQL сервер. Точный список привилегий зависит от версии вашего сервера.</p>
      <Table data={props.privileges} />

      <h2>SHOW ENGINES</h2>
      <p>Displays status information about the server's storage engines. This is particularly useful for checking whether a storage engine is supported, or to see what the default engine is.</p>
      <Table data={props.engines} />
    </>
  );
}
