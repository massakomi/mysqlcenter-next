'use client'
export function KillProcess(props) {
  const killProcess = (id) => {
    alert(`kill ${id}`)
    //apiQuery('s='+window.location.pathname.substr(1) + '&kill='+id)
  }

  return <>
      <span onClick={killProcess.bind(this, props.id)}>Kill</span>
    </>;
}