'use client'
import Table from "./Table";
import {checkedCheckboxes, prepareAction} from "@/app/ui/functions";
import {customAction} from "@/app/ui/actions";
import {setMessages} from "@/lib/features/messagesReducer";
import {useDispatch} from "react-redux";
import {useState} from "react";

export default function ColumnLeft(props) {

  const [databases, setDatabases] = useState(props.databases);
  const dispatch = useDispatch()

  const executeAction = async (act, url, e) => {
    let {action, formData} = prepareAction(act, url, e, 'databases[]')
    formData.set('dbMulty', 1)
    let json = await customAction(action, formData);
    dispatch(setMessages(json.messages))
    setTimeout(function() {
      location.reload()
    }, 1000);
  }

  return (
    <>
      <Table hiddens={props.hiddens} databases={databases} setDatabases={setDatabases} />
      <div className="imageAction">
        <u>Выбранные</u>
        <input type="image" alt="" src={"/images/close.png"} onClick={executeAction.bind(this, 'dbDelete')} title="Удалить базы данных" />
        <input type="image" alt="" src={"/images/copy.gif"} onClick={executeAction.bind(this, 'dbCopy')} title="Скопировать базы данных по шаблону {db_name}_copy" />
        <input type="image" alt="" src={"/images/b_tblexport.png"} onClick={executeAction.bind(this, 'exportDatabases', 'export')} title="Перейти к экспорту баз данных" />
        <input type="image" alt="" src={"/images/fixed.gif"} onClick={executeAction.bind(this, 'db_compare', 'db_compare')} title="Сравнить выбранные базы данных" />
      </div>
    </>
  );
}