'use client'
import {decrement, increment, setValue} from "@/lib/features/paramsReducer";
import { useSelector, useDispatch } from 'react-redux'

export function Buttons(props) {

  const params = useSelector((state) => state.params.value)
  const dispatch = useDispatch()

  return <>
    <button
      aria-label="Increment value"
      onClick={() => dispatch(increment())}
    >
      Increment
    </button>
    <span>{params.counter}</span>
    <button
      aria-label="Decrement value"
      onClick={() => dispatch(decrement())}
    >
      Decrement
    </button>
    <button
      onClick={() => dispatch(setValue({database: 'mydb11'}))}
    >
      Set
    </button>
  </>;
}