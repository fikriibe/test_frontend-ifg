import Modal, { TModalProps } from "@/components/Modal";

export default function ModalEdit({ ...modalProps }: TModalProps) {
  return (
    <Modal {...modalProps}>
      <div className="space-y-1 flex flex-col">
        <label>
          Title
        </label>
        <input />
        <label>
          Desc
        </label>
        <input />
        <label>
          Category
        </label>
        <input />
        <label>
          Stock
        </label>
        <input />
        <button>Edit</button>
      </div>
    </Modal>
  )
}
