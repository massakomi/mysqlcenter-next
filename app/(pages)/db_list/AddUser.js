import {useState} from "react";
import {customAction} from "@/app/ui/actions";
import {setMessages} from "@/lib/features/messagesReducer";
import {useDispatch} from "react-redux";

export default function AddUser() {

  const dispatch = useDispatch()
  const [database, setDatabase] = useState('');
  const [passwordField, setPassword] = useState('');
  const [passwordField2, setPassword2] = useState('');
  const [formDisabled, setDisabled] = useState(false);

  const updateLoginName = (event) => {
    setDatabase(event.target.value)
  }

  const setPasswordField = (event) => {
    setPassword(event.target.value)
    setDisabled(event.target.value !== passwordField2)
  }

  const setPasswordField2 = (event) => {
    setPassword2(event.target.value)
    setDisabled(event.target.value !== passwordField)
  }

  const onUserAdd = async (e) => {
    e.preventDefault()
    let formData = new FormData(e.target);
    let json = await customAction('userAdd', formData)
    dispatch(setMessages(json.messages))
  }

  return  (
    <fieldset className="msGeneralForm mt-2">
      <legend>Добавить пользователя</legend>
      <form onSubmit={onUserAdd} method="post">
        <div className="mb-2"><input name="database" type="text" required={true} id="databaseField" onKeyUp={updateLoginName} /> Имя базы данных</div>
        <div className="mb-2"><input name="databaseuser" id="unameField" type="text" required={true} defaultValue={database}  /> Логин пользователя</div>
        <div className="mb-2"><input name="userpass" type="password" id="passwordField" required={true} onChange={setPasswordField} /> Пароль</div>
        <div className="mb-2"><input name="userpass2" type="password" id="password2Field" required={true} onChange={setPasswordField2} /> Пароль еще раз</div>
        <div className="mb-2"><input type="submit" value="Добавить" disabled={formDisabled} id="submitBtnId" /></div>
      </form>
    </fieldset>
  )
}

