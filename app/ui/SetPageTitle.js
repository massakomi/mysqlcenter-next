'use client'

import {useDispatch, useSelector} from 'react-redux'
import {set} from "@/lib/features/titleReducer";
import {useEffect} from "react";

export function SetPageTitle(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(set(props.title))
  });
  return <></>;
}