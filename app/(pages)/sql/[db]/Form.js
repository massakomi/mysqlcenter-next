'use client'
import {sqlPage} from "@/app/ui/actions";
import {useDispatch} from "react-redux";
import {setMessages} from "@/lib/features/messagesReducer";
import {useParams} from "next/navigation";

export function Form(props) {

  const dispatch = useDispatch();
  const params = useParams();

  const sql = async (event) => {
    event.preventDefault()
    let formData = new FormData(event.target);
    let json = await sqlPage(formData);
    dispatch(setMessages(json.messages))
  }

  return (
    <>
      <form encType="multipart/form-data" onSubmit={sql.bind(this)} className="tableFormEdit">
        <textarea name="sql" rows="20" id="sqlContent" wrap="off"></textarea>
        <input type="submit" value="Отправить запрос!" className="submit" />
        <input type="hidden" name="db" value={params.db} />
        <FromFile {...props} />
      </form>
    </>
  )
}

function FromFile(props) {

  const opts = Object.values(props.charsets).map((charset) =>
    <option key={charset.toString()}>
      {charset}
    </option>
  );

  return (
    <fieldset className="msGeneralForm">
      <legend>Запрос из файл</legend>
      <input type="hidden" name="MAX_FILE_SIZE" value={props.maxUploadSize} />
      <input type="file" name="sqlFile" /> <br />
      Сжатие:
      <input name="compress" type="radio" value="auto" defaultChecked="checked" />  Автодетект
      <input name="compress" type="radio" value="" />     Нет
      <input name="compress" type="radio" value="gzip" />     gzip
      <input name="compress" type="radio" value="zip" />     zip
      <input name="compress" type="radio" value="excel" />  excel
      <input name="compress" type="radio" value="csv" />  csv
      <br />
      Кодировка файла: <select name="sqlFileCharset" defaultValue="utf8">{opts}</select><br />
      (Максимальный размер: {props.maxSize} Mb)
    </fieldset>
  );
}