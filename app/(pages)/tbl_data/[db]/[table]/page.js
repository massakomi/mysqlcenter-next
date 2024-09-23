export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: `${params.table} < ${params.db}`
  }
}

export default function Page({params}) {
  return (
    <h1>Таблица: {params.table} (? строк из ? всего)</h1>
  );
}
