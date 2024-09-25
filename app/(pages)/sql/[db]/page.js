import {sqlPage} from "@/app/ui/actions";
import {Form} from "./Form";

export const  metadata = {
  title: 'SQL запрос в БД'
}

export default async function Page() {

  const props = await sqlPage()

  //const [wait, setWait] = useState(false);
  return (
    <>
      <h1>{metadata.title}</h1>
      <Form {...props} />
    </>
  );

}



