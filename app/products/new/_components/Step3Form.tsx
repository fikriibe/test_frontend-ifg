'use client'

import Input from "@/components/Input"
import { useAppSelector } from "@/lib/hook"
import { submitStep3 } from "@/lib/reducer/formCreate"
import { step3Schema, TStep3Schema } from "@/schema/formCreate"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

export default function Step3Form() {
  const dispatch = useDispatch()
  const step3 = useAppSelector(s => s.formCreate.step3)
  const { register, formState, handleSubmit } = useForm<TStep3Schema>({
    resolver: yupResolver(step3Schema),
    defaultValues: step3,
    mode: 'onBlur'
  })

  const onSubmit = (values: TStep3Schema) => {
    dispatch(submitStep3(values))
  }

  const onBack = () => dispatch(setCurrentStep(1))

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 card">
      <h3 className="text-lg font-semibold">Shipping & Supplier Details</h3>
      <Input
        register={register}
        name="weight"
        label="Weight"
        errorMessage={formState.errors.weight?.message}
        type="number"
      />
      <h3>Dimensions</h3>
      <div>
        <Input
          register={register}
          name="dimensions.width"
          label="Width"
          errorMessage={formState.errors.dimensions?.width?.message}
          type="number"
        />
        <Input
          register={register}
          name="dimensions.height"
          label="Height"
          errorMessage={formState.errors.dimensions?.height?.message}
          type="number"
        />
        <Input
          register={register}
          name="dimensions.depth"
          label="Depth"
          errorMessage={formState.errors.dimensions?.depth?.message}
          type="number"
        />
      </div>
      <Input
        register={register}
        name="fragile"
        label="is Fragile"
        type="checkbox"
      />
      <Input
        register={register}
        name="shippingInformation"
        label="Shipping Information"
        as='textarea'
        errorMessage={formState.errors.shippingInformation?.message}
      />
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
