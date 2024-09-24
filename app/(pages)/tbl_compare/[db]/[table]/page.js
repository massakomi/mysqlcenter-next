
export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: `${params.table} < ${params.db}`
  }
}

export default function Page({params}) {
  return (
    <h1>Сравнение таблиц</h1>
  );
}
