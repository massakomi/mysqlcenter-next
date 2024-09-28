'use client'
import ExportOptions from "@/app/(pages)/export/ExportOptions";
import Link from "next/link";
import {useParams, useSearchParams} from "next/navigation";
import {useDispatch} from "react-redux";
import {setMessages} from "@/lib/features/messagesReducer";
import {msMultiSelect} from "@/app/ui/functions";
import {useState} from "react";
import {exportPage} from "@/app/ui/actions";

export function Form(props) {

  const [content, setContent] = useState('');

  const params = useParams();
  const dispatch = useDispatch();

  const searchParams = useSearchParams()
  if (searchParams.get('databases')) {
    props.optionsSelected = searchParams.get('databases').split(',')
  }
  if (searchParams.get('tables')) {
    props.optionsSelected = searchParams.get('tables').split(',')
  }
  if (searchParams.get('where')) {
    props.whereCondition = searchParams.get('where')
  }

  const executeAction = async (action, event) => {
    event.preventDefault()
    let formData = new FormData(event.target.closest('form'));
    let json = await exportPage(params.db, params.table, formData);
    if (json.content.includes('.zip')) {
      location = json.content
      setContent('')
    } else {
      setContent(json.content)
    }
    dispatch(setMessages(json.messages))
  }

  return (
    <>
      <form onSubmit={executeAction.bind(this, props.action)} name="formExport">

        <table className="tableExport">
          <tbody><tr>
            <td>
              <select name={props.selectMultName} multiple className="sel" defaultValue={props.optionsSelected}>
                {props.optionsData.map((v) =>
                  <option key={v.toString()}>{v}</option>
                )}
              </select><br />
              <span role="button" onClick={msMultiSelect.bind(this, props.selectMultName)} className="hs select">все</span>
              <span role="button" onClick={msMultiSelect.bind(this, props.selectMultName)} className="hs unselect">очистить</span>
              <span role="button" onClick={msMultiSelect.bind(this, props.selectMultName)} className="hs invert">инверт</span>
            </td>
            <td>
              <ExportOptions {...props} />

              <input name="export_where" type="text" defaultValue={props.whereCondition} className='w-11/12 block mb-2' placeholder='WHERE условие' />

              {params.db ? <input type="hidden" name="db" value={params.db} /> : null}
              {params.table ? <input type="hidden" name="table" value={params.table} /> : null}
              <input type="submit" value="Экспортировать!" />
            </td>
            <td> </td>
          </tr></tbody>
        </table>
        {params.db ? <Link href={`/export/special/${params.db}`}>Специальный экспорт</Link> : null}

        <textarea name="sql" rows="40" wrap="OFF" hidden={!content} defaultValue={content}></textarea>
      </form>
    </>
  )
}