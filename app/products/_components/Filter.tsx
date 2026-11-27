'use client'

import { setFilter } from "@/lib/filterReducer";
import { useAppSelector } from "@/lib/hook";
import { debounce } from "@/utils/debounce";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import SelectCategory from "./SelectCategory";

type TProps = { openModalAddAction: () => void }

export default function Filter({ openModalAddAction }: TProps) {
  const dispatch = useDispatch()
  const search = useAppSelector(s => s.filter.search)
  const category = useAppSelector(s => s.filter.category)

  const setCategory = (category: string) => {
    dispatch(setFilter({category, page: 1}))
  }

  const onSearch = useMemo(() =>
    debounce(function (search) {
      dispatch(setFilter({search, page: 1}))
    }), [dispatch])

  return (
    <div className="card space-y-3">
      <h3 className="text-xl font-semibold text-gray-800">
        Filter
      </h3>
      <span className="flex flex-col lg:flex-row gap-2">
        <input placeholder="Search..." onChange={e => onSearch(e.target.value)} defaultValue={search}  />
        <SelectCategory value={category} onChange={setCategory} />
        <button className="button ml-auto bg-green-800 text-white border-green-900" onClick={openModalAddAction}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/>
            <path d="M12 5v14"/>
          </svg>
          add
        </button>
      </span>

    </div>
  )
}
