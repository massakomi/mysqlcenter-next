'use client'
import { useSelector } from 'react-redux'
export function PageTitle(props) {
  const count = useSelector((state) => state.counter.value)
  const title = useSelector((state) => state.title.value)
  return <>
    <h1>{props.title} / {title}</h1>
  </>;
}