import {dbCreate} from "@/app/ui/actions";
import {useDispatch} from "react-redux";
import {setMessages} from "@/lib/features/messagesReducer";
import {redirect, useRouter} from "next/navigation";

export function DbCreateForm() {

  const dispatch = useDispatch()
  const router = useRouter()

  const onDbCreate = async (e) => {
    e.preventDefault()
    let formData = new FormData(e.target);
    let json = await dbCreate(formData)
    dispatch(setMessages(json.message))
    if (json.status === true) {
      // не смог очистить значение value и поэтому просто редирект
      router.refresh()
      console.log('refresh')
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