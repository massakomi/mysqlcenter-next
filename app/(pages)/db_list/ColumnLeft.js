'use client'
import Table from "./Table";
import TableFull from "@/app/(pages)/db_list/TableFull";
import {chbx_action, prepareAction} from "@/app/ui/functions";
import {customAction} from "@/app/ui/actions";
import {setMessages} from "@/lib/features/messagesReducer";
import {useDispatch} from "react-redux";
import {useParams} from "next/navigation";

export default function ColumnLeft(props) {

  const dispatch = useDispatch()

  const msImageAction = async (act, url, e) => {
    let {action, formData} = prepareAction(act, url, e, 'databases[]')
    formData.set('dbMulty', 1)
    let json = await customAction(action, formData);
    dispatch(setMessages(json.message))
  }

  const chbxAction = (opt) => {
    chbx_action(opt, 'databases[]')
  }

  return (
    <>
      {!props.showFullInfo ?
        <Table hiddens={props.hiddens} databases={props.databases} /> :  <TableFull />}

      <div className="chbxAction">
        <img src={"/images/arrow_ltr.png"} alt="" border="0" align="absmiddle" />
        <span role="button" onClick={chbxAction.bind(this, 'check')}>выбрать все</span>  &nbsp;
        <span role="button" onClick={chbxAction.bind(this, 'uncheck')}>очистить</span>
      </div>

      <div className="imageAction">
        <u>Выбранные</u>
        <input type="image" alt="" src={"/images/close.png"} onClick={msImageAction.bind(this, 'dbDelete')} title="Удалить базы данных" />
        <input type="image" alt="" src={"/images/copy.gif"} onClick={msImageAction.bind(this, 'dbCopy')} title="Скопировать базы данных по шаблону {db_name}_copy" />
        <input type="image" alt="" src={"/images/b_tblexport.png"} onClick={msImageAction.bind(this, 'exportDatabases', 'export')} title="Перейти к экспорту баз данных" />
        <input type="image" alt="" src={"/images/fixed.gif"} onClick={msImageAction.bind(this, 'db_compare', 'db_compare')} title="Сравнить выбранные базы данных" />
      </div>
    </>
  );
}