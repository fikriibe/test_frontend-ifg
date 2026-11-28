import * as Yup from 'yup'

const rulesMin1 = Yup.number().required().min(1)

export const step1Schema = Yup.object().shape({
  title: Yup.string().required().min(3).max(100),
  brand: Yup.string().required(),
  category: Yup.string().required(),
  description: Yup.string().min(20),
})

const variant = Yup.object().shape({
  color: Yup.string().required(),
  size: Yup.string().required(),
  sku: Yup.string().matches(/^SKU-[A-Z]{3}-[0-9]{4}$/),
  extraPrice: Yup.number().min(0)
})

export const step2Schema = Yup.object().shape({
  price: rulesMin1,
  stock: Yup.number().required().min(0),
  discountPercentage: Yup.number().optional().min(0).max(99),
  variants: Yup.array().of(variant)
})

export const step3Schema = Yup.object().shape({
  weight: rulesMin1,
  dimensions: Yup.object().shape({
    width: rulesMin1,
    height: rulesMin1,
    depth: rulesMin1,
  }),
  fragile: Yup.boolean(),
  shippingInformation: Yup.string().when('fragile', {
    is: true,
    then: schema => schema.min(10).required(),
    otherwise: schema => schema.notRequired()
  }),
})

export type TStep1Schema = Yup.InferType<typeof step1Schema>
export type TStep2Schema = Yup.InferType<typeof step2Schema>
export type TStep3Schema = Yup.InferType<typeof step3Schema>
export type TVariantSchema = Yup.InferType<typeof variant>
