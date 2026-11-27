import { setFilter } from "@/lib/reducer/filter"
import { useAppSelector } from "@/lib/hook"
import { useMemo } from "react"
import { useDispatch } from "react-redux"

type TProps = React.PropsWithChildren<{sortBy: string}>

export default function TableHeaderSort({ children, sortBy }: TProps) {
  const current = useAppSelector(s => s.filter.sort)
  const dispatch = useDispatch()
  const state = useMemo(() => {
    const [key, order] = current.split('_')
    if (sortBy !== key) return null
    return order
  }, [current, sortBy])

  const onClick = () => {
    let order = 'desc'
    if (state === 'desc') order = 'asc'
    dispatch(setFilter({ sort: `${sortBy}_${order}` }))
  }

  return (<span className="space-x-1 items-center flex">
    {children}
    <button onClick={onClick}>
      {!state && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m7 15 5 5 5-5"/>
        <path d="m7 9 5-5 5 5"/>
      </svg>}
      {state === 'asc' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 8 4-4 4 4"/>
        <path d="M7 4v16"/>
        <path d="M11 12h4"/>
        <path d="M11 16h7"/>
        <path d="M11 20h10"/>
      </svg>}
      {state === 'desc' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 16 4 4 4-4"/>
        <path d="M7 20V4"/>
        <path d="M11 4h10"/>
        <path d="M11 8h7"/>
        <path d="M11 12h4"/>
      </svg>}
    </button>
  </span>)
}
