'use client'
import {useEffect, useRef, useState} from "react";
import {TableSelect} from "@/app/(pages)/search/[db]/TableSelect";
import {setMessages} from "@/lib/features/messagesReducer";
import {useParams, useSearchParams} from "next/navigation";
import {useDispatch} from "react-redux";
import {searchPage} from "@/app/ui/actions";
import Table from "@/app/ui/Table";
export default function Form(props) {

  const params = useParams();
  const searchParams = useSearchParams()
  const [disabled, setDisabled] = useState(true);
  const [results, setResults] = useState([]);

  const inputRef = useRef(null);
  const formRef = useRef(null);
  const inputFieldRef = useRef(null);

  const updateState = (event) => {
    setDisabled(!inputRef.current.value && !inputFieldRef.current.value)
  }

  const startSearch = async (e) => {
    if (e) {
      e.preventDefault()
    }
    setDisabled(true)
    let formData = new FormData(formRef.current);
    let json = await searchPage(params, formData)
    setResults(json.results)
    setDisabled(false)
  }

  useEffect(() => {
    if (searchParams.get('query') && !formRef.current.submitted) {
      inputRef.current.value = searchParams.get('query')
      formRef.current.submitted = true;
      startSearch()
    }
  });

  return (
    <>
      <form onSubmit={startSearch} ref={formRef}>
        <table className="tableExport">
          <tbody><tr>
            <td valign="top">
              <TableSelect {...props} />
            </td>
            <td valign="top">
              искать по всем полям    <br />
              <input name="query" id="queryAll" ref={inputRef} type="text" size="50" onChange={updateState} defaultValue="" /><br />
              искать имя поля    <br />
              <input name="queryField" ref={inputFieldRef} type="text" size="50" onChange={updateState} defaultValue="" /><br /> <br />
              <input type="submit" value="Искать!" className="submit disabled:opacity-50" disabled={disabled} />
            </td>
          </tr></tbody>
        </table>
      </form>

      {disabled ? <p className='text-sm'>Loading results... <progress className='text-xs' value={0.5} /></p> : null}
      <Table data={results} />
    </>
  );
}
