export const  metadata = {
  title: 'Создать таблицу'
}

export default function Page({params}) {
  return (
    <h1>Добавить таблицу в базу данных {params.db}</h1>
  );
}
