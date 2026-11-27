'use client'

import { setFilter } from "@/lib/filterReducer";
import { useAppSelector } from "@/lib/hook";
import { debounce } from "@/utils/debounce";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import SelectCategory from "./SelectCategory";

export default function Filter() {
  const dispatch = useDispatch()
  const search = useAppSelector(s => s.filter.search)
  const category = useAppSelector(s => s.filter.category)

  const setCategory = (category: string) => {
    dispatch(setFilter({category}))
  }

  const onSearch = useMemo(() =>
    debounce(function (search) {
      dispatch(setFilter({search}))
    }), [dispatch])

  return (
    <div className="card flex gap-2">
      <input placeholder="Search..." onChange={e => onSearch(e.target.value)} defaultValue={search}  />
      <SelectCategory value={category} onChange={setCategory}  />
    </div>
  )
}
