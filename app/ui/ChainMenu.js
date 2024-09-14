export function ChainMenu() {
  let chain = []
  chain.push(<a key="c0" href="?s=db_list">DB</a>)
  let db = 'any'
  if (db) {
    chain.push(<a key="c1" href={`?s=tbl_list&db=${db}&action=structure`}>&#8250;</a>)
    chain.push(<a key="c2" href={`?s=tbl_list&db=${db}`}>{db}</a>)
  }
  let table = 'table'
  let page = 'tbl_list'
  if (table) {
    chain.push(<span key="c3">&#8250;</span>)
    chain.push(<a key="c4" href={`?s=tbl_data&db=${db}&table=${table}`}>{table}</a>)
    if (page !== 'tbl_data') {
      chain.push(<span key="c5">&#8250;</span>)
      chain.push(<a key="c6" href={`?s=${page}&db=${db}&table=${table}`}>{page}</a>)
    }
  }
  return chain
}