'use client'
import Table from "./Table";
import TableFull from "@/app/(pages)/db_list/TableFull";

export default function ColumnLeft(props) {

  const msImageAction = (param, actionReplace) => {
    //e.preventDefault()
    //console.log('act = '+param)
    //console.log(this)
    if (typeof actionReplace == 'string') {
      actionReplace = props.url + '?s=' + actionReplace
    } else {
      actionReplace = ''
    }
    console.log(actionReplace)
    //msImageAction('formDatabases', param, actionReplace)
  }

  const chbxAction = (opt) => {
    chbx_action('formDatabases', opt, 'databases[]')
  }

  return (
    <div>
      <form action="?s=db_list" method="post" name="formDatabases" id="formDatabases">
        <input type="hidden" name="dbMulty" value="1" />
        <input type="hidden" name="action" value="" />
        {!props.showFullInfo ?
          <Table hiddens={props.hiddens} databases={props.databases} /> :  <TableFull />}

      </form>

      <div className="chbxAction">
        <img src={"/images/arrow_ltr.png"} alt="" border="0" align="absmiddle" />
        <span className="a" onClick={chbxAction.bind(this, 'check')}>выбрать все</span>  &nbsp;
        <span className="a" onClick={chbxAction.bind(this, 'uncheck')}>очистить</span>
      </div>

      <div className="imageAction">
        <u>Выбранные</u>
        <input type="image" alt="" src={"/images/close.png"} onClick={msImageAction.bind(this, 'dbDelete')} title="Удалить базы данных" />
        <input type="image" alt="" src={"/images/copy.gif"} onClick={msImageAction.bind(this, 'dbCopy')} title="Скопировать базы данных по шаблону {db_name}_copy" />
        <input type="image" alt="" src={"/images/b_tblexport.png"} onClick={msImageAction.bind(this, 'exportDatabases', 'export')} title="Перейти к экспорту баз данных" />
        <input type="image" alt="" src={"/images/fixed.gif"} onClick={msImageAction.bind(this, 'db_compare', 'db_compare')} title="Сравнить выбранные базы данных" />
      </div>
    </div>
  );
}