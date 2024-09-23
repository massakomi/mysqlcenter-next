
export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: `${params.table} < ${params.db}`
  }
}

export default function Page({params}) {
  return (
    <h1>Добавить строки в таблицу {params.table}</h1>
  );
}
