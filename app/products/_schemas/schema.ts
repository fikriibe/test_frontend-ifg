import * as Yup from 'yup'

export const updateSchema = Yup.object().shape({
  id: Yup.number().required(),
  title: Yup.string().required().min(3).max(100),
  category: Yup.string().required(),
  price: Yup.number().required().min(1),
  stock: Yup.number().required().min(0),
})

export type TUpdateSchema = Yup.InferType<typeof updateSchema>
