
import Form from "./Form";

export const metadata = {
  title: 'Поиск по базе данных'
};

export default async function Page() {

  //let props = await searchPage();
  //console.log(props)

  return (
    <>
      <h1>{metadata.title}</h1>
      <Form />
    </>
  );
}
