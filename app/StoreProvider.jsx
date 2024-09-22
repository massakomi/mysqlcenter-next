'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '@/lib/store'
import {useParams} from "next/navigation";
import {setValue} from "@/lib/features/paramsReducer";

export default function StoreProvider({ children }) {
  const storeRef = useRef()
  const urlParams = useParams()
  const database = urlParams.db
  if (!storeRef.current) {
    storeRef.current = makeStore()
    if (database) {
      storeRef.current.dispatch(setValue({database: database}))
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}