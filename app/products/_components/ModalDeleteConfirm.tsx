import Modal, { TModalProps } from "@/components/Modal";

export default function ModalDeleteConfirm({ ...modalProps }: TModalProps) {
  return (
    <Modal {...modalProps}>
      <div>
        <h3>Yakin Ingin Menghapus?</h3>
        <div className="flex content-between">
          <button>
            ya
          </button>
          <button>
            tidak
          </button>
        </div>
      </div>
    </Modal>
  )
}
