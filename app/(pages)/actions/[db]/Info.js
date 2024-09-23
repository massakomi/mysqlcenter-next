'use client'
import Table from "@/app/ui/Table";
import {useParams} from "next/navigation";
import {useState} from "react";

export function Info(props) {

  const params = useParams()

  const [info, setInfo] = useState(props.dbInfo);

  const fullinfo = () => {
    fetch(`http://msc/?ajax=1&db=${params.db}&s=actions&act=fullinfo`)
      .then(response => response.json())
      .then((json) => {
        setInfo(json.page.dbInfo)
      })
  }

  return  (
    <fieldset className="msGeneralForm">
      <legend>Информация о базе данных</legend>
      <Table data={info} />
      <br />
      <span onClick={fullinfo} className="grey" role="button">Показать полную информацию</span>
    </fieldset>
  )
}