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
      <div onClick={executeAction.bind(this, "tableCheck")} role="button">Проверить таблицу</div>
      <div onClick={executeAction.bind(this, "tableAnalize")} role="button">Анализ таблицы</div>
      <div onClick={executeAction.bind(this, "tableRepair")} role="button">Починить таблицу</div>
      <div onClick={executeAction.bind(this, "tableOptimize")} role="button">Оптимизировать таблицу</div>
      <div onClick={executeAction.bind(this, "tableFlush")} role="button">Сбросить кэш таблицы (FLUSH)</div>
    </div>
  )
}