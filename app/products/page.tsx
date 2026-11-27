'use client'

import { useAppSelector } from "@/lib/hook";
import { useProductsQuery } from "@/services/api";
import { useState } from "react";
import Filter from "./_components/Filter";
import ModalDeleteConfirm from "./_components/ModalDeleteConfirm";
import ModalEdit from "./_components/ModalEdit";
import { useSyncFilter } from "./_hooks/useSyncFilter";
import { useDispatch } from "react-redux";
import { setFilter } from "@/lib/filterReducer";
import { TSortKeyOption } from "@/types/api";
import TableHeaderSort from "./_components/TableHeaderSort";

export default function Products() {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const filter = useAppSelector(s => s.filter)
  const dispatch = useDispatch()
  const { data, isLoading, isError, error } = useProductsQuery(filter)
  useSyncFilter()

  const onChangePage = (page: number) => {
    dispatch(setFilter({ page }))
  }

  return (
    <>
      <Filter />
      <table border={1}>
      	<thead>
      		<tr>
            <td>ID</td>
            <td>
              <TableHeaderSort sortBy="title">
                Title
              </TableHeaderSort>
            </td>
            <td>
              <TableHeaderSort sortBy="category">
              Category
              </TableHeaderSort>
            </td>
            <td>
              <TableHeaderSort sortBy="price">
              Price
              </TableHeaderSort>
            </td>
            <td>
              <TableHeaderSort sortBy="stock">
              Stock
              </TableHeaderSort>
            </td>
            <td>Action</td>
      		</tr>
        </thead>
        <tbody>
          {data?.products.map((item) => {
            return (
              <tr key={item.id}>
                <td>{ item.id}</td>
                <td>{ item.title}</td>
                <td>{ item.category}</td>
                <td>{ item.price}</td>
                <td>{ item.stock}</td>
                <td className="space-x-2">
                  <button onClick={() => setOpenEdit(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
                      <path d="m15 5 4 4"/>
                    </svg>
                  </button>
                  <button onClick={() => setOpenDelete(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M3 6h18"/>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                      <path d="M10 11v6"/>
                      <path d="M14 11v6"/>
                    </svg>
                  </button>
                </td>
             	</tr>
            )
          })}
        </tbody>
      </table>

      {data && (
        <div className="flex items-center justify-center gap-0.5 mt-5 w-full">
          {Array(data.totalPages || 1).fill("").map((_, index) => {
            const thisPage = index + 1
            return (
              <button key={index} className={filter.page === thisPage ? 'text-gray-900 font-bold' : 'text-gray-800'} onClick={() => onChangePage(thisPage)}>
                {thisPage}
              </button>
            )
          })}
        </div>
      )}
      <ModalEdit open={openEdit} onClose={ () => setOpenEdit(false)} />
      <ModalDeleteConfirm open={openDelete} onClose={() => setOpenDelete(false)} />
    </>
  )
}
