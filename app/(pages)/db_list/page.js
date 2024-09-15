import ColumnLeft from "./ColumnLeft";
import ColumnRight from "./ColumnRight";
import {dbList} from "@/app/ui/actions";
import {SetPageTitle} from "@/app/(pages)/server_status/SetPageTitle";

export const  metadata = {
  title: 'Список баз данных'
}

export default async function Page() {

  let data = await dbList();
  console.log(data)

  /*const [data, setData] = useState({main: {page: ''}, page: {hiddens: [], databases: []}});

  useEffect(() => {
    const fetchData = async () => {
      let json = await apiQuery('s='+window.location.pathname.substr(1))
      setData(json);
    };
    //console.log('use eff')
    fetchData();
  }, []);

  if (data.getPageTitle) {
    document.title = data.getPageTitle
    document.querySelector('h1').innerHTML = data.getPageTitle
  }*/

  return  (
    <table width="100%" border="0" cellSpacing="0" cellPadding="3">
      <tbody>
      <tr>
        <td valign="top">
          <SetPageTitle title='Список баз данных' />
          <ColumnLeft {...data.page} />
        </td>
        <td valign="top">
          <ColumnRight {...data.page} />
        </td>
      </tr></tbody>
    </table>
  )
}