'use client'
import { useSelector } from 'react-redux'
export function MenuTable(props) {
  const params = useSelector((state) => state.params.value)
  return <>
    getTableMenu
    --
    <span>{params.counter}</span>
    --
    <span>{params.database}</span>
  </>;
}