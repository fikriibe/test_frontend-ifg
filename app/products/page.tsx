'use client'

import { useState } from "react";
import Filter from "./_components/Filter";
import ModalDeleteConfirm from "./_components/ModalDeleteConfirm";
import ModalEdit from "./_components/ModalEdit";
import Table from "./_components/Table";
import { useSyncFilter } from "./_hooks/useSyncFilter";

export default function Products() {
  const [editId, setEditId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  useSyncFilter()

  return (
    <>
      <Filter />
      <Table setEditId={setEditId} setDeleteId={setDeleteId}/>
      <ModalEdit id={editId} open={!!editId} onClose={ () => setEditId(null)} />
      <ModalDeleteConfirm id={deleteId} open={!!deleteId} onClose={() => setDeleteId(null)} />
    </>
  )
}
