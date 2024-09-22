'use client'

import {useDispatch} from 'react-redux'
import {setValue} from "@/lib/features/paramsReducer";

export function SetPageTitle(props) {
  const dispatch = useDispatch()
  dispatch(setValue({title: props.title}))
  dispatch(setValue({database: props.database}))
  return <></>;
}