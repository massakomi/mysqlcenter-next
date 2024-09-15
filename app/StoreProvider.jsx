'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '@/lib/store'
import {initializeCount} from "@/lib/features/counter/counterSlice";

export default function StoreProvider({ children }) {
  const storeRef = useRef()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    storeRef.current.dispatch(initializeCount())
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}