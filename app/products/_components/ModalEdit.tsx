import Modal, { TModalProps } from "@/components/Modal";
import { useProductQuery, useProductUpdateMutation } from "@/services/api";
import { TProduct } from "@/types/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TUpdateSchema, updateSchema } from "../_schemas/schema";
import FormProduct from "./FormProduct";

type TFormUpdate = {
  product: TProduct
  onSubmit: (product: {id: number} & Partial<TProduct>) => void
  isLoading: boolean
}

function FormUpdate({ product: defaultValues, isLoading, onSubmit }: TFormUpdate) {
  const form = useForm<TUpdateSchema>({
    resolver: yupResolver(updateSchema),
    defaultValues
  })

  return (
    <FormProduct form={form} onSubmit={onSubmit} isLoading={isLoading}  />
  )
}

export default function ModalEdit({ id, ...modalProps }: TModalProps & { id: number | null }) {
  const [updateProduct, { isLoading }] = useProductUpdateMutation()
  const { currentData: product } = useProductQuery(Number(id), {
    skip: !id
  })

  const onSubmit = async (values: Parameters<TFormUpdate['onSubmit']>[0]) => {
    updateProduct(values)
    modalProps.onClose?.()
  }

  return (
    <Modal {...modalProps}>
      <h3 className="text-lg font-semibold mb-4 text-center">
        Update Product
      </h3>
      {product && <FormUpdate product={product} onSubmit={onSubmit} isLoading={isLoading} />}
    </Modal>
  )
}
