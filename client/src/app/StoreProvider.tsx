'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from './store'
import { getTasks, getUsers } from './store/slices'

export default function Providers({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = makeStore()
    storeRef.current.dispatch(getTasks())
    storeRef.current.dispatch(getUsers())
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}