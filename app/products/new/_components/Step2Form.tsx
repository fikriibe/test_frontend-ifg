'use client'

import Input from "@/components/Input"
import { useAppSelector } from "@/lib/hook"
import { step2Schema, TStep2Schema } from "@/schema/formCreate"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useFieldArray, useForm } from "react-hook-form"

export default function Step2Form() {
  const step2 = useAppSelector(s => s.formCreate.step2)
  const { register, control, formState, handleSubmit } = useForm<TStep2Schema>({
    resolver: yupResolver(step2Schema),
    defaultValues: step2,
    mode: 'onBlur'
  })
  const { fields, append, remove} = useFieldArray({ control, name: 'variants' })

  return (
    <form onSubmit={handleSubmit(console.log)} className="space-y-3">
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
                errorMessage={
                  formState.errors.variants?.find?.((_, index) => index === i)?.color?.message
                }
              />
              <Input
                register={register}
                name={`variants.${i}.size`}
                label="Size"
              />
              <Input
                register={register}
                name={`variants.${i}.sku`}
                label="SKU Code"
              />
              <Input
                register={register}
                name={`variants.${i}.extraPrice`}
                label="Extra Price"
                type='number'
              />
              <button className="button" onClick={() => remove(i)}>
                remove
              </button>
            </div>
          )
        })}
        <button
          className="button"
          onClick={() => append({
            color: '',
            size: '',
            sku: '',
          })}
        >
          Add
        </button>
      </div>
      <button className="button w-full mt-8">
        Next
      </button>
    </form>
  )
}
