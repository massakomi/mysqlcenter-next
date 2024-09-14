class ColumnRight extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      database: '',
      passwordField: '',
      password2Field: '',
      formDisabled: true
    };
    this.updateLoginName = this.updateLoginName.bind(this);
    this.setPasswordField = this.setPasswordField.bind(this);
    this.setPasswordField2 = this.setPasswordField2.bind(this);
  }

  updateLoginName(event) {
    this.setState({database: event.target.value})
  }

  setPasswordField(event) {
    this.setState({passwordField: event.target.value})
    let s = event.target.value !== this.state.passwordField2
    this.setState({formDisabled: s})
  }

  setPasswordField2(event) {
    this.setState({password2Field2: event.target.value})
    let s = this.state.passwordField !== event.target.value
    this.setState({formDisabled: s})
  }



  render() {

    let tableLink;
    if (!this.props.showFullInfo) {
      tableLink = <a href={`?s=db_list&db=${this.props.dbname}&mode=full`} title="Сканирует все таблицы всех баз данных и выводит количество таблиц, размер, дату обновления и количество рядов">Показать полную таблицу</a>
    } else {
      tableLink = <a href={`?s=db_list&db=${this.props.dbname}`}>Показать краткую таблицу</a>
    }

    return (
      <div>
        <DbCreateForm />

        <div className="mt-10">
          {tableLink} <br />
          <a href={`?s=db_list&db=${this.props.dbname}&mode=speedtest`}>Тест скорости</a>
        </div>

        <div className="mt-10">{this.props.appName}</div>
        <div>Версия {this.props.appVersion}</div>
        <div>Хост: {this.props.dbHost}</div>

        <div className="mt-10">Версия сервера: {this.props.mysqlVersion}</div>
        <div>Версия PHP: {this.props.phpversion}</div>
        <div>БД: {this.props.dbname}<br /></div>

        <fieldset className="mt-10">
          <legend>Добавить пользователя</legend>
          <form action="?s=users&action=add" method="post">
            <div className="mb-5"><input name="rootpass" type="text" /> Пароль админа</div>
            <div className="mb-5"><input name="database" type="text" required={true} id="databaseField" onKeyUp={this.updateLoginName} /> Имя базы данных</div>
            <div className="mb-5"><input name="databaseuser" id="unameField" type="text" required={true} defaultValue={this.state.database}  /> Логин пользователя</div>
            <div className="mb-5"><input name="userpass" type="password" id="passwordField" required={true} onChange={this.setPasswordField} /> Пароль</div>
            <div className="mb-5"><input name="userpass2" type="password" id="password2Field" required={true} onChange={this.setPasswordField2} /> Пароль еще раз</div>
            <div className="mb-5"><input type="submit" value="Добавить" disabled={this.state.formDisabled} id="submitBtnId" /></div>
          </form>
        </fieldset>
      </div>
    );
  }
}