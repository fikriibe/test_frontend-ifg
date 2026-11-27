'use client'

import { useProductsQuery } from "@/services/api";
import Filter from "./_components/Filter";
import ModalEdit from "./_components/ModalEdit";
import ModalDeleteConfirm from "./_components/ModalDeleteConfirm";
import { useState } from "react";
import { useSyncFilter } from "./_hooks/useSyncFilter";

export default function Products() {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const { data, isLoading, isError, error } = useProductsQuery({})
  useSyncFilter()

  return (
    <>
      <Filter />
      <table border={1}>
      	<thead>
      		<tr>
            <td>ID</td>
            <td>Name</td>
            <td>Category</td>
            <td>Price</td>
            <td>Stock</td>
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
                  <button onClick={() => setOpenEdit(true)}>edit</button>
                  <button onClick={() => setOpenDelete(true)}>delete</button>
                </td>
             	</tr>
            )
          })}

        </tbody>
      </table>
      <ModalEdit open={openEdit} onClose={ () => setOpenEdit(false)} />
      <ModalDeleteConfirm open={openDelete} onClose={() => setOpenDelete(false)} />
    </>
  )
}
