import { useEffect, useRef } from "react"

export type TModalProps = { open: boolean, onClose?: () => void }

export default function Modal({ children, open, onClose }: React.PropsWithChildren<TModalProps>) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const modal = ref.current
    if(!modal) return
    if (open && !modal?.open) ref.current?.showModal()
    if (!open && modal?.open) ref.current?.close()
  }, [open])

  return (
    <dialog ref={ref} onClose={onClose} className="m-auto w-full card overscroll-contain backdrop:bg-black/50">
      <button onClick={onClose}>close</button>
      {children}
    </dialog>
  )
}
