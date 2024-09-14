import Link from "next/link";

export function ChainMenu() {
  let chain = []
  chain.push(<Link key="c0" href="/db_list">DB</Link>)
  let db = 'Any'
  if (db) {
    chain.push(<span key="c1">&#8250;</span>)
    chain.push(<Link key="c2" href={`/tbl_list/${db}`}>{db}</Link>)
  }
  let table = 'Table'
  let page = 'Tbl_list'
  if (table) {
    chain.push(<span key="c3">&#8250;</span>)
    chain.push(<Link key="c4" href={`/tbl_data/${db}/${table}`}>{table}</Link>)
    if (page !== 'tbl_data') {
      chain.push(<span key="c5">&#8250;</span>)
      chain.push(<Link key="c6" href={`/${page}/${db}/${table}`}>{page}</Link>)
    }
  }
  return chain
}