class ColumnLeft extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 'wait'};
  }

  msImageAction = (param, actionReplace) => {
    //e.preventDefault()
    //console.log('act = '+param)
    //console.log(this)
    if (typeof actionReplace == 'string') {
      actionReplace = this.props.url + '?s=' + actionReplace
    } else {
      actionReplace = ''
    }
    console.log(actionReplace)
    //msImageAction('formDatabases', param, actionReplace)
  }

  chbxAction(opt) {
    chbx_action('formDatabases', opt, 'databases[]')
  }

  render() {

    return (
      <div>
        <form action="?s=db_list" method="post" name="formDatabases" id="formDatabases">
          <input type="hidden" name="dbMulty" value="1" />
          <input type="hidden" name="action" value="" />
          {!this.props.showFullInfo ?
            <Table folder={this.props.folder} hiddens={this.props.hiddens} databases={this.props.databases} /> :  <TableFull folder={this.props.folder} />}

        </form>

        <div className="chbxAction">
          <img src={"/" + this.props.folder + "arrow_ltr.png"} alt="" border="0" align="absmiddle" />
          <span className="a" onClick={this.chbxAction.bind(this, 'check')}>выбрать все</span>  &nbsp;
          <span className="a" onClick={this.chbxAction.bind(this, 'uncheck')}>очистить</span>
        </div>

        <div className="imageAction">
          <u>Выбранные</u>
          <input type="image" alt="" src={"/" + this.props.folder + "close.png"} onClick={this.msImageAction.bind(this, 'dbDelete')} title="Удалить базы данных" />
          <input type="image" alt="" src={"/" + this.props.folder + "copy.gif"} onClick={this.msImageAction.bind(this, 'dbCopy')} title="Скопировать базы данных по шаблону {db_name}_copy" />
          <input type="image" alt="" src={"/" + this.props.folder + "b_tblexport.png"} onClick={this.msImageAction.bind(this, 'exportDatabases', 'export')} title="Перейти к экспорту баз данных" />
          <input type="image" alt="" src={"/" + this.props.folder + "fixed.gif"} onClick={this.msImageAction.bind(this, 'db_compare', 'db_compare')} title="Сравнить выбранные базы данных" />
        </div>
      </div>
    );
  }
}