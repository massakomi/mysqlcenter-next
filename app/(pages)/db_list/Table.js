class Table extends React.Component {

  dbDelete(db) {
    msQuery('dbDelete', `db=${db}&id=db${db}`)
  }

  dbHide(db, action) {
    alert('hide')
    msQuery('dbHide', `db=${db}&id=db${db}&action=${action}`)
  }

  render() {

    let mscExists = this.props.databases.includes('mysqlcenter')
    let trs = []
    for (let i = 0; i < this.props.databases.length; i++) {
      let db = this.props.databases[i];
      let styles = {}
      let action = '';
      if (mscExists && this.props.hiddens.includes(db)) {
        styles = {color: '#ccc'}
        action = 'show'
      }
      let href = `/?db=${db}&s=tbl_list`
      let idRow = "db"+db;
      // Добавляем в комментарий имя БД, чтобы в автотестах определить, куда кликать при проверке удаления
      trs.push(
        <tr key={i}>
          <td><input name="databases[]" type="checkbox" value={db} className="cb" /></td>
          <td><a href={href} title="Структура БД" id={idRow} style={styles}>{db}</a></td>
          <td>
            <span className="a" onClick={this.dbDelete.bind(this, db)} title={'Удалить '+db}><img src={"/" + this.props.folder + "close.png"} alt="" border="0" /></span> &nbsp;
            <a href={'/?db=' + db + '&s=actions'} title="Изменить"><img src={"/" + this.props.folder + "edit.gif"} alt="" border="0" /></a> &nbsp;
            {mscExists ?
              <span className="a" onClick={this.dbHide.bind(this, db, action)} title={'Спрятать/показать ' + db}><img src={"/" + this.props.folder + "open-folder.png"} alt="" border="0" width="16" /></span> : null}
          </td>
        </tr>
      )
    }

    return (
      <table className="contentTable" id="structureTableId">
        <thead>
        <tr>
          <th></th>
          <th>Название</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {trs}
        </tbody>
      </table>
    );
  }
}