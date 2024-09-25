'use client'
import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {setValue} from "@/lib/features/paramsReducer";
import {useDispatch} from "react-redux";

export function PopupDbList(props) {
  const [opened, setOpened] = useState(false);

  const open = () => {
    setOpened(true)
    setTimeout(() => {
      setOpened(false)
    }, 3000);
  }

  let data = props.data || []

  return (
    <>
      <b id="appNameId" className="appName"><Link href="/db_list" onMouseOver={open}>MySQL React</Link></b>
      <DbHiddenMenu {...{data, opened, setOpened}} />
    </>
  )
}

function DbHiddenMenu({data, opened, setOpened}) {

  const dispatch = useDispatch();

  const selectDb = (database) => {
    dispatch(setValue({database: database}))
    setOpened(false)
  }

  return <div id="dbHiddenMenu" className={opened ? '' : 'hidden'}>
          {data.map((item, key) =>
            <Link key={key} onClick={selectDb.bind(this, item)} href={`/tbl_list/${item}`}>{item}</Link>
          )}
        </div>;
}