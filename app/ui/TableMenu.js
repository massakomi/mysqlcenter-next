'use client'
import { useSelector } from 'react-redux'
export function TableMenu(props) {
  const count = useSelector((state) => state.counter.value)
  return <>
    getTableMenu
    <span>{count}</span>
  </>;
}