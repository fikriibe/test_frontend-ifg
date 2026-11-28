'use client'

import Input from "@/components/Input"
import { useAppSelector } from "@/lib/hook"
import { step1Schema, TStep1Schema } from "@/schema/formCreate"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import SelectCategory from "../../_components/SelectCategory"

export default function Step1Form() {
  const step1 = useAppSelector(s => s.formCreate.step1)
  const { register, control, formState, handleSubmit, getErrors } = useForm<TStep1Schema>({
    resolver: yupResolver(step1Schema),
    defaultValues: step1,
    mode: 'onBlur'
  })

  return (
    <form onSubmit={handleSubmit(console.log)} className="space-y-3">
      <Input
        register={register}
        name="title"
        label="Title"
        errorMessage={formState.errors.title?.message}
      />
      <Input
        register={register}
        name="brand"
        label="Brand"
        errorMessage={formState.errors.brand?.message}
      />
      <Controller
        name="category"
        control={control}
        render={({ field, fieldState }) => {
          const errorMessage = fieldState.error?.message
          return (
            <div>
              <label>
                Category
              </label>
              <SelectCategory value={field.value} onChange={field.onChange} />
              {errorMessage && <span className="text-sm text-red-700">{errorMessage}</span>}
            </div>
          )
        }}
      />
      <Input
        as="textarea"
        register={register}
        name="description"
        label="Description"
        errorMessage={getErrors('description')?.message}
      />
      <button className="button w-full mt-8">
        Next
      </button>
    </form>
  )
}
