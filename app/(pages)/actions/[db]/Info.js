'use client'
import Table from "@/app/ui/Table";
import {useParams} from "next/navigation";
import {useState} from "react";
import {actionPage} from "@/app/ui/actions";

export function Info(props) {

  const params = useParams()

  const [info, setInfo] = useState(props.dbInfo);

  const fullinfo = () => {
    params.act = 'fullinfo'
    actionPage(params).then((page) => {
      setInfo(page.dbInfo)
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