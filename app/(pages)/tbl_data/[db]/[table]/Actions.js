'use client'
import {chbx_action, checkedCheckboxes, prepareAction} from "@/app/ui/functions";
import {customAction} from "@/app/ui/actions";
import {setMessages} from "@/lib/features/messagesReducer";
import {useDispatch} from "react-redux";
import {useParams, useRouter} from "next/navigation";

export default function Actions() {

  const dispatch = useDispatch()
  const router = useRouter()
  let params = useParams()

  const chbxAction = (opt, e) => {
    e.preventDefault()
    chbx_action(opt, 'row[]')
  }

  const executeAction = async (act, url, e) => {
    let {action, formData} = prepareAction(act, e, 'row[]', params)
    formData.set('db', params.db)
    formData.set('table', params.table)
    let json = await customAction(action, formData);
    dispatch(setMessages(json.messages))
  }

  const redirectAction = async (act, url, e) => {
    const checked = checkedCheckboxes()
    if (act === 'editRows') {
      router.push(`/tbl_change/${params.db}/${params.table}/?rows=${checked.join(',')}`)
    }
    if (act === 'exportRows') {
      router.push(`/export/${params.db}/${params.table}/?where=${checked.join(' OR ')}`)
    }
  }

  return (
    <>
      <div className="chbxAction">
        <img src="/images/arrow_ltr.png" alt="" border="0" align="absmiddle" />
        <a href="#" onClick={chbxAction.bind(this, 'check')}>выбрать все</a>  &nbsp;
        <a href="#" onClick={chbxAction.bind(this, 'uncheck')}>очистить</a>
      </div>

      <div className="imageAction">
        <table width="100%" border="0" cellSpacing="0" cellPadding="0">
          <tbody>
          <tr>
            <td>
              <u>Выбранные</u>
              <img src="/images/edit.gif" alt="" border="0" onClick={redirectAction.bind(this, 'editRows')} />
              <img src="/images/close.png" alt="" border="0" onClick={executeAction.bind(this, 'deleteRows', '')} />
              <img src="/images/copy.gif" alt="" border="0" onClick={executeAction.bind(this, 'copyRows', '')} />
              <img src="/images/b_tblexport.png" alt="" border="0" onClick={redirectAction.bind(this, 'exportRows')} />
            </td>
            <td align="right" id="tblDataInfoId">&nbsp;</td>
          </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
