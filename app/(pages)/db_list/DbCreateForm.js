import {dbCreate} from "@/app/ui/actions";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {set} from "@/lib/features/titleReducer";
import {setMessages} from "@/lib/features/messagesReducer";
import {redirect} from "next/navigation";

export function DbCreateForm() {

  const dispatch = useDispatch()

  const onDbCreate = async (formData) => {
    let json = await dbCreate(formData)
    dispatch(setMessages(json.message))
    if (json.status === true) {
      // не смог очистить значение value и поэтому просто редирект
      redirect('/db_list')
    }
  }

  return  (
    <fieldset className="msGeneralForm">
      <legend>Создание базы данных</legend>
      <form action={onDbCreate}>
        <input name="dbName" type="text" defaultValue="" />
        <button type="submit">Создать!</button>
      </form>
    </fieldset>
  )
}