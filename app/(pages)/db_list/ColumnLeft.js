'use client'
import Table from "./Table";
import {checkedCheckboxes, prepareAction} from "@/app/ui/functions";
import {customAction} from "@/app/ui/actions";
import {setMessages} from "@/lib/features/messagesReducer";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function ColumnLeft(props) {

  const [databases, setDatabases] = useState(props.databases);
  const dispatch = useDispatch()
  const router = useRouter()

  const executeAction = async (act, url, e) => {
    const {action, formData} = prepareAction(act, url, e, 'databases[]')
    formData.set('dbMulty', 1)
    const json = await customAction(action, formData);
    dispatch(setMessages(json.messages))
    setTimeout(function() {
      location.reload()
    }, 1000);
  }

  const redirectAction = async (act, url, e) => {
    const dbs = checkedCheckboxes()
    if (act === 'exportDatabases') {
      router.push(`/export/?databases=${dbs.join(',')}`)
    }
    if (act === 'db_compare') {
      router.push(`/db_compare/${dbs.join(';')}/`)
    }
  }

  return (
    <>
      <Table hiddens={props.hiddens} databases={databases} setDatabases={setDatabases} />
      <div className="imageAction">
        <u>Выбранные</u>
        <input type="image" alt="" src={"/images/close.png"} onClick={executeAction.bind(this, 'dbDelete')} title="Удалить базы данных" />
        <input type="image" alt="" src={"/images/copy.gif"} onClick={executeAction.bind(this, 'dbCopy')} title="Скопировать базы данных по шаблону {db_name}_copy" />
        <input type="image" alt="" src={"/images/b_tblexport.png"} onClick={redirectAction.bind(this, 'exportDatabases', 'export')} title="Перейти к экспорту баз данных" />
        <input type="image" alt="" src={"/images/fixed.gif"} onClick={redirectAction.bind(this, 'db_compare', 'db_compare')} title="Сравнить выбранные базы данных" />
      </div>
    </>
  );
}