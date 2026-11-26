'use client'

import SelectCategory from "./SelectCategory"

export default function Filter() {
  return (
    <div className="card flex gap-2">
      <input placeholder="Search..."  />
      <SelectCategory />
    </div>
  )
}
