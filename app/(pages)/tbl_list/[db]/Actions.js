'use client'

import {chbx_action, prepareAction} from "@/app/ui/functions";
import {useParams, useSearchParams} from "next/navigation";
import {customAction, dbAllAction} from "@/app/ui/actions";
import {setMessages} from "@/lib/features/messagesReducer";
import {useDispatch} from "react-redux";
import DateSelector from "@/app/(pages)/tbl_list/[db]/DateSelector";

export default function Actions() {

  let searchParams = useSearchParams()
  if (searchParams.get('action')) {
    return <></>;
  }

  const dispatch = useDispatch()
  let params = useParams()
  let props = {}

  const msImageAction = async (act, url, e) => {
    let {action, formData} = prepareAction(act, url, e, 'table[]', params)
    formData.set('db', params.db)
    let json = await customAction(action, formData);
    dispatch(setMessages(json.message))
  }

  const chbxAction = (opt, e) => {
    e.preventDefault()
    chbx_action(opt, 'table[]')
  }

  const makeInnodb = async () => {
    let json = await dbAllAction(params.db, 'makeInnodb');
    dispatch(setMessages(json.message))
  }

  const filterByDate= () => {
    let year = $('[name="ds_year"]').val()
    let month = $('[name="ds_month"]').val()
    let day = $('[name="ds_day"]').val()
    let date = new Date(year, month, day)

    let tables = Object.values(this.props.tables).filter((table, key) => {
      let now = new Date(table.Update_time);
      return now > date;
    })
    this.setState({tables})
  }

  return  (
    <>
      <div className="chbxAction">
        <img src={`/images/arrow_ltr.png`} alt=""  />
        <a href="#" onClick={chbxAction.bind(this, 'check')} id="chooseAll">выбрать все</a>  &nbsp;
        <a href="#" onClick={chbxAction.bind(this, 'uncheck')}>очистить</a>
      </div>

      <div className="imageAction">
        <u>Выбранные</u>
        <img src={`/images/close.png`} alt="" onClick={msImageAction.bind(this, 'delete_all')} />
        <img src={`/images/delete.gif`} alt="" onClick={msImageAction.bind(this, 'truncate_all')} />
        <img src={`/images/copy.gif`} alt="" onClick={msImageAction.bind(this, 'copy_all')} />
        <img src={`/images/b_tblexport.png`} alt="" onClick={msImageAction.bind(this, 'export_all', `/export/${props.db}/`)} />

        <span role="button" onClick={makeInnodb} style={{margin: '0 10px'}}>Конвертировать все в Innodb</span>

        <select name="act" onChange={msImageAction.bind(this, 'auto')} >
          <option></option>
          <option value="check">проверить</option>
          <option value="analyze">анализ</option>
          <option value="optimize">оптимизировать</option>
          <option value="repair">починить</option>
          <option value="flush">сбросить кэш</option>
        </select>
      </div>

      <form className="showtableupdated">
        Показать таблицы обновлённые с <DateSelector />
        <input type="button" value="Показать!" data-onclick="{filterByDate.bind(this)}" />
      </form>
    </>
  )
}