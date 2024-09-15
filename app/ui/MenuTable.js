'use client'
import { useSelector } from 'react-redux'
export function MenuTable(props) {
  const count = useSelector((state) => state.counter.value)
  return <>
    getTableMenu
    <span>{count}</span>
  </>;
}