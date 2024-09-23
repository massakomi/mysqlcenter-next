'use client'
import {useEffect, useRef, useState} from "react";
import {TableSelect} from "@/app/(pages)/search/[db]/TableSelect";
import {setMessages} from "@/lib/features/messagesReducer";
import {useParams} from "next/navigation";
import {useDispatch} from "react-redux";
import {searchPage} from "@/app/ui/actions";
import Table from "@/app/ui/Table";
export default function Form(props) {

  const params = useParams();
  const [disabled, setDisabled] = useState(true);
  const [results, setResults] = useState([]);

  const inputRef = useRef(null);
  const inputFieldRef = useRef(null);

  const updateState = (event) => {
    setDisabled(!inputRef.current.value && !inputFieldRef.current.value)
  }

  const startSearch = async (e) => {
    e.preventDefault()
    let formData = new FormData(e.target);
    let json = await searchPage(params.db, params.table, formData)
    setResults(json.results)
  }

  return (
    <>
      <form onSubmit={startSearch}>
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
              <input type="submit" value="Искать!" className="submit" disabled={disabled} />
            </td>
          </tr></tbody>
        </table>
      </form>

      <Table data={results} />
    </>
  );
}
