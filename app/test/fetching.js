export default async function Fetching() {

  let data = await fetch('http://exp/test.php')
  //let data = await fetch('http://exp/test.php', { next: { revalidate: 5 }}) время кеша в секундах  0 откл  false навсегда
  //let data = await fetch('http://exp/test.php', { cache: 'no-store' })
  let values = await data.json()





  return (
    <>
      <h2>Fetching</h2>
      <ul>
        <li>{values.date}</li>
      </ul>
    </>
  );
}
