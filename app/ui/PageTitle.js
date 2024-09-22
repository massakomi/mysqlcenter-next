'use client'
import { useSelector } from 'react-redux'
export function PageTitle(props) {
  const params = useSelector((state) => state.params.value)
  return <>
    <h1>{params.title || props.title}</h1>
  </>;
}