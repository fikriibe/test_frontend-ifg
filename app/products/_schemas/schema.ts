import * as Yup from 'yup'

export const addSchema = Yup.object().shape({
  title: Yup.string().required(),
  category: Yup.string().required(),
  price: Yup.number().required(),
  stock: Yup.number().required()
})

export const updateSchema = Yup.object().shape({
  id: Yup.number().required()
}).concat(addSchema)

export type TAddSchema = Yup.InferType<typeof addSchema>
export type TUpdateSchema = Yup.InferType<typeof updateSchema>
