import Modal, { TModalProps } from "@/components/Modal";
import { useProductDeleteMutation } from "@/services/api";

type TProps = { id: number | null } & TModalProps

export default function ModalDeleteConfirm({ id, ...modalProps }: TProps) {
  const [deleteProduct, { isLoading }] = useProductDeleteMutation()

  const onDelete = () => {
    if (id) deleteProduct(id)
    modalProps.onClose?.()
  }
  return (
    <Modal {...modalProps}>
      <div>
        <h3 className="text-lg font-semibold mb-5">Yakin Ingin Menghapus?</h3>
        <div className="flex content-between gap-2.5">
          <button className="button w-full text-white bg-red-700 border-red-800" disabled={isLoading} onClick={onDelete}>
            Hapus
          </button>
          <button className="button w-full text-gray-700 border-gray-700" onClick={modalProps.onClose}>
            tidak
          </button>
        </div>
      </div>
    </Modal>
  )
}
