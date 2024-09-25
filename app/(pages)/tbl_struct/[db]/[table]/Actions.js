'use client'
import {chbx_action, checkedCheckboxes, prepareAction} from "@/app/ui/functions";
import {useDispatch} from "react-redux";
import {customAction, invalidatePath} from "@/app/ui/actions";
import {setMessages} from "@/lib/features/messagesReducer";
import {useParams, usePathname, useRouter} from "next/navigation";

export function Actions() {

  const dispatch = useDispatch();
  const router = useRouter()
  const params = useParams();
  const pathname = usePathname();

  const chbxAction = (opt, event) => {
    event.preventDefault()
    chbx_action(opt, 'field[]')
  }
  const executeAction = async (act, e) => {
    const {action, formData} = prepareAction(act, e, 'field[]')
    formData.set('db', params.db)
    formData.set('table', params.table)
    const json = await customAction(action, formData);
    dispatch(setMessages(json.messages))
    await invalidatePath(pathname)
    router.refresh()
  }

  const fieldsEdit = () => {
    let items = checkedCheckboxes()
    router.push(`/tbl_add/${params.db}/${params.table}/?fields=${items.join(',')}`)
  }


  return (
    <>
      <div className="chbxAction">
        <img src="/images/arrow_ltr.png" alt="" border="0" align="absmiddle" />
        <span role="button" onClick={chbxAction.bind(this, "check")}>выбрать все</span>
        <span role="button" onClick={chbxAction.bind(this, "uncheck")}>очистить</span>
      </div>

      <div className="imageAction">
        <u>Выбранные</u>
        <input type="image" src="/images/edit.gif" onClick={fieldsEdit} alt="" />
        <input type="image" src="/images/close.png" onClick={executeAction.bind(this, 'fieldsDelete')} alt="" />
      </div>
    </>
  )
}