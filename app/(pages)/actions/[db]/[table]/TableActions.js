'use client'
import {customAction} from "@/app/ui/actions";
import {setMessages} from "@/lib/features/messagesReducer";
import {useDispatch} from "react-redux";
import {useParams} from "next/navigation";

export function TableActions() {

  const params = useParams();
  const dispatch = useDispatch();

  const executeAction = async (action, event) => {
    event.preventDefault()
    let formData = new FormData();
    formData.set('db', params.db)
    formData.set('table', params.table)
    let json = await customAction(action, formData);
    dispatch(setMessages(json.messages))
  }

  return  (
    <div className="globalMenu">
      <a onClick={executeAction.bind(this, "tableCheck")} href="#">Проверить таблицу</a> <br />
      <a onClick={executeAction.bind(this, "tableAnalize")} href="#">Анализ таблицы</a> <br />
      <a onClick={executeAction.bind(this, "tableRepair")} href="#">Починить таблицу</a> <br />
      <a onClick={executeAction.bind(this, "tableOptimize")} href="#">Оптимизировать таблицу</a>  <br />
      <a onClick={executeAction.bind(this, "tableFlush")} href="#">Сбросить кэш таблицы ("FLUSH")</a> <br />
    </div>
  )
}