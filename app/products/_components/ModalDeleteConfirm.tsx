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
        <h3>Yakin Ingin Menghapus?</h3>
        <div className="flex content-between">
          <button disabled={isLoading} onClick={onDelete}>
            ya
          </button>
          <button onClick={modalProps.onClose}>
            tidak
          </button>
        </div>
      </div>
    </Modal>
  )
}
