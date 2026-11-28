'use client'

import Input from "@/components/Input"
import { useAppSelector } from "@/lib/hook"
import { step3Schema, TStep3Schema } from "@/schema/formCreate"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

export default function Step3Form() {
  const step3 = useAppSelector(s => s.formCreate.step3)
  const { register, formState, handleSubmit } = useForm<TStep3Schema>({
    resolver: yupResolver(step3Schema),
    defaultValues: step3,
    mode: 'onBlur'
  })

  return (
    <form onSubmit={handleSubmit(console.log)} className="space-y-3">
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
      <button className="button w-full mt-8">
        Next
      </button>
    </form>
  )
}
