'use client'
import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {setValue} from "@/lib/features/paramsReducer";
import {useDispatch} from "react-redux";
import {setMessages} from "@/lib/features/messagesReducer";

export function PopupDbList({databases}) {
  const [opened, setOpened] = useState(false);

  const open = () => {
    setOpened(true)
    setTimeout(() => {
      setOpened(false)
    }, 3000);
  }

  return (
    <>
      <b id="appNameId" className="appName"><Link href="/db_list" onMouseOver={open}>MySQL React</Link></b>
      <DbHiddenMenu {...{databases, opened, setOpened}} />
    </>
  )
}

function DbHiddenMenu({databases, opened, setOpened}) {

  const dispatch = useDispatch();
  if (!databases) {
    databases = []
  }

  useEffect(() => {
    dispatch(setValue({databases}))
  }, [dispatch, databases])

  const selectDb = (database) => {
    dispatch(setValue({database: database}))
    setOpened(false)
  }

  return <div id="dbHiddenMenu" className={opened ? '' : 'hidden'}>
          {databases.map((item, key) =>
            <Link key={key} onClick={selectDb.bind(this, item)} href={`/tbl_list/${item}`}>{item}</Link>
          )}
        </div>;
}