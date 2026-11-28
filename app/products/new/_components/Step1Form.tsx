'use client'

import Input from "@/components/Input"
import { useAppSelector } from "@/lib/hook"
import { step1Schema, TStep1Schema } from "@/schema/formCreate"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import SelectCategory from "../../_components/SelectCategory"
import { useDispatch } from "react-redux"
import { submitStep1 } from "@/lib/reducer/formCreate"

export default function Step1Form() {
  const dispatch = useDispatch()
  const step1 = useAppSelector(s => s.formCreate.step1)
  const { register, control, formState, handleSubmit, getErrors } = useForm<TStep1Schema>({
    resolver: yupResolver(step1Schema),
    defaultValues: step1,
    mode: 'onBlur'
  })

  const onSubmit = (values: TStep1Schema) => {
    dispatch(submitStep1(values))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 card">
      <h3 className="text-lg font-semibold">Basic Informantion</h3>
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
      <button className="button w-full mt-8 bg-blue-700 text-white border-blue-800">
        Next
      </button>
    </form>
  )
}
