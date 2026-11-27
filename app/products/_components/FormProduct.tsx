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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 [&_label]:block [&_input]:w-full">
      <div>
        <label htmlFor="title">
          Title
        </label>
        <input {...register("title" as Path<T>)} disabled={isLoading} className="w-full"  />
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
      <div>
        <label>
          Stock
        </label>
        <input {...register('stock' as Path<T>)} type="number" disabled={isLoading} />
      </div>
      <div>
        <label>
          Price
        </label>
        <input {...register('price' as Path<T>)} disabled={ isLoading} />
      </div>

      <button className="button w-full bg-blue-800 border=blue-800 text-white mt-8 h-10!" type="submit" disabled={isLoading}>Edit</button>
    </form>
  )
}
