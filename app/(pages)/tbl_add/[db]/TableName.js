'use client'

import {useEffect, useRef} from "react";

export default function TableName(props) {

  const tableNameInput = useRef(false)

  useEffect(() => {
    if (!tableNameInput.current) {
      return () => {}
    }
    tableNameInput.current.focus()
  }, []);

  return (
    <>
      {props.showTableName ?
        <>
          <input tabIndex="1" ref={tableNameInput} type="text" name="table_name" size="40" defaultValue={props.tableName} /> имя таблицы <br />
        </> :  <input type="hidden" name="table_name" defaultValue={props.tableName} />
      }

    </>
  );
}