'use client'
import {decrement, increment} from "@/lib/features/counter/counterSlice";
import {set} from "@/lib/features/titleReducer";
import { useSelector, useDispatch } from 'react-redux'

export function Buttons(props) {

  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return <>
    <button
      aria-label="Increment value"
      onClick={() => dispatch(increment())}
    >
      Increment
    </button>
    <span>{count}</span>
    <button
      aria-label="Decrement value"
      onClick={() => dispatch(decrement())}
    >
      Decrement
    </button>
    <button
      onClick={() => dispatch(set('***'))}
    >
      Set
    </button>
  </>;
}