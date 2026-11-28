'use client'

import Input from "@/components/Input"
import { useAppSelector } from "@/lib/hook"
import { setCurrentStep, submitStep2 } from "@/lib/reducer/formCreate"
import { step2Schema, TStep2Schema, TVariantSchema } from "@/schema/formCreate"
import { yupResolver } from "@hookform/resolvers/yup"
import { useFieldArray, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

export default function Step2Form() {
  const dispatch = useDispatch()
  const step2 = useAppSelector(s => s.formCreate.step2)
  const { register, control, formState, handleSubmit } = useForm<TStep2Schema>({
    resolver: yupResolver(step2Schema),
    defaultValues: step2,
    mode: 'onBlur'
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'variants' })

  const onSubmit = (values: TStep2Schema) => {
    dispatch(submitStep2(values))
  }

  const onBack = () => dispatch(setCurrentStep(1))

  const getErrorMessageVariants = (i: number, key: keyof TVariantSchema) => {
    return formState.errors.variants?.find?.((_, index) => index === i)?.[key]?.message
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 card">
      <h3 className="text-lg font-semibold">Pricing, Stock & Dynamic Product</h3>
      <Input
        register={register}
        name="price"
        label="Price"
        errorMessage={formState.errors.price?.message}
        type="number"
      />
      <Input
        register={register}
        name="stock"
        label="Stock"
        errorMessage={formState.errors.stock?.message}
        type="number"
      />
      <Input
        register={register}
        name="discountPercentage"
        label="Discount Persentage"
        errorMessage={formState.errors.discountPercentage?.message}
        type="number"
      />
      <div>
        <h3 className="text-lg">
          Variants
        </h3>
        {fields.map((field, i) => {
          return (
            <div key={field.id} className="space-y-4">
              <Input
                register={register}
                name={`variants.${i}.color`}
                label="Color"
                type="color"
                errorMessage={getErrorMessageVariants(i, 'color')}
              />
              <Input
                register={register}
                name={`variants.${i}.size`}
                label="Size"
                errorMessage={getErrorMessageVariants(i, 'size')}
              />
              <Input
                register={register}
                name={`variants.${i}.sku`}
                label="SKU Code"
                errorMessage={getErrorMessageVariants(i, 'sku')}
              />
              <Input
                register={register}
                name={`variants.${i}.extraPrice`}
                label="Extra Price"
                type='number'
                errorMessage={getErrorMessageVariants(i, 'extraPrice')}
              />
              <button className="button bg-red-700 border-red-800 text-white" onClick={() => remove(i)}>
                remove
              </button>
            </div>
          )
        })}
        <button
          className="button mt-4 bg-green-700 border-green-800 text-white"
          onClick={() => append({
            color: '',
            size: '',
            sku: '',
          })}
        >
          Add
        </button>
      </div>
      <div className="flex gap-2.5 mt-8">
        <button className="button w-full" onClick={onBack}>
          Back
        </button>
        <button className="button w-full bg-blue-700 text-white border-blue-800">
          Next
        </button>
      </div>
    </form>
  )
}
