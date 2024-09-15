import Image from "next/image";
import {redirect} from "next/navigation";

export default function Home() {
  redirect('db_list')
  return (
    <div>
      Страница по умолчанию, роут не выбран
    </div>
  );
}
