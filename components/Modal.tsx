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
    <dialog ref={ref} onClose={onClose} className="m-auto w-full card overscroll-contain backdrop:bg-black/50 pt-8! max-w-md">
      <button onClick={onClose} className="absolute top-2 right-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18"/>
          <path d="m6 6 12 12"/>
        </svg>
      </button>
      {children}
    </dialog>
  )
}
