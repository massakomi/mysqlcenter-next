'use client'
import {DbCreateForm} from "./DbCreateForm";

export default function ColumnRight(props) {

  /*constructor(props) {
    super(props);
    state = {
      database: '',
      passwordField: '',
      password2Field: '',
      formDisabled: true
    };
    updateLoginName = updateLoginName.bind(this);
    setPasswordField = setPasswordField.bind(this);
    setPasswordField2 = setPasswordField2.bind(this);
  }*/

  let state = {}

  const updateLoginName = (event) => {
    setState({database: event.target.value})
  }

  const setPasswordField = (event) => {
    setState({passwordField: event.target.value})
    let s = event.target.value !== state.passwordField2
    setState({formDisabled: s})
  }

  const setPasswordField2 = (event) => {
    setState({password2Field2: event.target.value})
    let s = state.passwordField !== event.target.value
    setState({formDisabled: s})
  }


  let tableLink;
  if (!props.showFullInfo) {
    tableLink = <a href={`?s=db_list&db=${props.dbname}&mode=full`} title="Сканирует все таблицы всех баз данных и выводит количество таблиц, размер, дату обновления и количество рядов">Показать полную таблицу</a>
  } else {
    tableLink = <a href={`?s=db_list&db=${props.dbname}`}>Показать краткую таблицу</a>
  }

  return (
    <div>
      <DbCreateForm />

      <div className="mt-10">
        {tableLink} <br />
        <a href={`?s=db_list&db=${props.dbname}&mode=speedtest`}>Тест скорости</a>
      </div>

      <div className="mt-10">{props.appName}</div>
      <div>Версия {props.appVersion}</div>
      <div>Хост: {props.dbHost}</div>

      <div className="mt-10">Версия сервера: {props.mysqlVersion}</div>
      <div>Версия PHP: {props.phpversion}</div>
      <div>БД: {props.dbname}<br /></div>

      <fieldset className="mt-10">
        <legend>Добавить пользователя</legend>
        <form action="?s=users&action=add" method="post">
          <div className="mb-5"><input name="rootpass" type="text" /> Пароль админа</div>
          <div className="mb-5"><input name="database" type="text" required={true} id="databaseField" onKeyUp={updateLoginName} /> Имя базы данных</div>
          <div className="mb-5"><input name="databaseuser" id="unameField" type="text" required={true} defaultValue={state.database}  /> Логин пользователя</div>
          <div className="mb-5"><input name="userpass" type="password" id="passwordField" required={true} onChange={setPasswordField} /> Пароль</div>
          <div className="mb-5"><input name="userpass2" type="password" id="password2Field" required={true} onChange={setPasswordField2} /> Пароль еще раз</div>
          <div className="mb-5"><input type="submit" value="Добавить" disabled={state.formDisabled} id="submitBtnId" /></div>
        </form>
      </fieldset>
    </div>
  );
}