export default function Page() {
  return (
    <div>
      <h1>Settings</h1>
      <p>Чтение .env переменных</p>
      <ul>
        <li>DB_HOST: {process.env.DB_HOST}</li>
      </ul>
    </div>
  );
}
