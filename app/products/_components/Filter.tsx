'use client'

import { setFilter } from "@/lib/filterReducer";
import { useAppSelector } from "@/lib/hook";
import { useDispatch } from "react-redux";
import SelectCategory from "./SelectCategory";
import { ChangeEvent } from "react";
import { debounce } from "@/utils/debounce";

export default function Filter() {
  const dispatch = useDispatch()

  const category = useAppSelector(s => s.filter.category)

  const setCategory = (category: string) => {
    dispatch(setFilter({category}))
  }

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(function () {
      dispatch(setFilter({search: e.target.value}))
    })
  }

  return (
    <div className="card flex gap-2">
      <input placeholder="Search..." onChange={onSearch}  />
      <SelectCategory value={category} onChange={setCategory}  />
    </div>
  )
}
