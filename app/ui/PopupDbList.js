'use client'
import {useEffect, useRef, useState} from "react";
import Link from "next/link";

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
      <DbHiddenMenu data={data} opened={opened} />
    </>
  )
}

function DbHiddenMenu({data, opened}) {
  return <div id="dbHiddenMenu" className={opened ? '' : 'hidden'}>
          {data.map((item, key) =>
            <a key={key} href={`?db=${item}`}>{item}</a>
          )}
        </div>;
}