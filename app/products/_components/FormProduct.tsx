import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"
import SelectCategory from "./SelectCategory"

type TProps<T extends FieldValues> = {
  form: UseFormReturn<T>
  onSubmit: (v: T) => void
  isLoading: boolean
}

export default function FormProduct<T extends FieldValues>({ form, onSubmit, isLoading }: TProps<T>) {
  const { register, control, handleSubmit } = form
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-1 flex flex-col">
      <div>
        <label className="block">
          Title
        </label>
        <input {...register("title" as Path<T>)} disabled={isLoading}  />
      </div>
      <Controller
        name={"category" as Path<T>}
        control={control}
        render={({field}) => {
          return (
            <div>
              <label>
                Category
              </label>
              <SelectCategory value={ field.value} onChange={field.onChange} />
            </div>
          )
        }}
      />
      <label>
        Stock
      </label>
      <input {...register('stock' as Path<T>)} disabled={isLoading} />
      <label>
        Price
      </label>
      <input {...register('price' as Path<T>)} disabled={ isLoading} />
      <button type="submit" disabled={isLoading}>Edit</button>
    </form>
  )
}
