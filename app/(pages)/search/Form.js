'use client'
import {useEffect, useRef, useState} from "react";
export default function Form() {

  const [disabled, setDisabled] = useState(true);

  let props = {
    tables: ['aaa', 'bbbb']
  }

  const inputRef = useRef(null);
  const inputFieldRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  const msMultiSelect = (event) => {
    let action = 'invert'
    if (!event.target.classList.contains('invert')) {
      action = event.target.classList.contains('select') ? 'select' : 'unselect'
    }
    document.querySelectorAll('[name="table[]"] option').forEach(function(element) {
      if (action === 'invert') {
        element.selected = !element.selected
      } else {
        element.selected = (action === 'select');
      }
    });
  }

  const updateState = (event) => {
    setDisabled(!inputRef.current.value && !inputFieldRef.current.value)
  }

  return (
    <>
      <form action="/search" method="post" name="formSearch">
        <table className="tableExport">
          <tbody><tr>
            <td valign="top">
              <select name="table[]" multiple className="sel" defaultValue={props.tables}>
                {Object.values(props.tables).map((table) =>
                  <option key={table.toString()}>{table}</option>
                )}
              </select>   <br />
              <a href="#" onClick={msMultiSelect} className="hs select">все</a> &nbsp;
              <a href="#" onClick={msMultiSelect} className="hs unselect">очистить</a> &nbsp;
              <a href="#" onClick={msMultiSelect} className="hs invert">инверт</a>
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
    </>
  );
}
