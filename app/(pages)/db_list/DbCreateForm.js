import {customAction} from "@/app/ui/actions";
import {useDispatch} from "react-redux";
import {setMessages} from "@/lib/features/messagesReducer";
import {useRouter} from "next/navigation";

export function DbCreateForm() {

  const dispatch = useDispatch()
  const router = useRouter()

  const onDbCreate = async (e) => {
    e.preventDefault()
    let formData = new FormData(e.target);
    let json = await customAction('dbCreate', formData)
    dispatch(setMessages(json.messages))
    if (json.status === true) {
      setTimeout(function() {
        location.reload()
      }, 1000);
    }
  }

  return  (
    <fieldset className="msGeneralForm">
      <legend>Создание базы данных</legend>
      <form onSubmit={onDbCreate.bind(this)}>
        <input name="dbName" type="text" defaultValue="" />
        <button type="submit">Создать!</button>
      </form>
    </fieldset>
  )
}