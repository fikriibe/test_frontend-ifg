import Modal, { TModalProps } from "@/components/Modal";
import { useProductAddMutation } from "@/services/api";
import FormProduct from "./FormProduct";
import { useForm } from "react-hook-form";
import { addSchema, TAddSchema } from "../_schemas/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { TProduct } from "@/types/api";

export default function ModalAdd({ ...modalProps }: TModalProps) {
  const [addProduct, { isLoading }] = useProductAddMutation()
  const form = useForm<TAddSchema>({
    resolver: yupResolver(addSchema),
  })

  const onSubmit = async (values: Partial<TProduct>) => {
    addProduct(values)
    modalProps.onClose?.()
    form.reset()
  }

  return (
    <Modal {...modalProps}>
      <h3 className="text-lg font-semibold mb-4 text-center">
        Add Product
      </h3>
      <FormProduct form={form} isLoading={isLoading} onSubmit={onSubmit} />
    </Modal>
  )
}
