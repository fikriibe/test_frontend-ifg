import { ComponentProps } from "react"
import { FieldValues, Path, UseFormRegister } from "react-hook-form"

type TProps<T extends FieldValues> = {
  as?: 'input' | 'textarea' | 'checkbox'
  name: Path<T>
  label: string
  register: UseFormRegister<T>
  errorMessage?: string
} & (ComponentProps<"input"> | ComponentProps<"textarea">)

export default function Input<T extends FieldValues>({ as = 'input', name, label, register, errorMessage, ...other }: TProps<T> ) {
  return (
    <div>
      {as === 'checkbox' && <input {...other as ComponentProps<'input'>} {...register(name)} className="mr-2" /> }
      <label htmlFor={name}>
        {label}
      </label>
      {as === 'input' && <input {...other as ComponentProps<'input'>} {...register(name)} className="w-full" />}
      {as === 'textarea' && <textarea {...other as ComponentProps<'textarea'>} {...register(name)} className="w-full" />}
      {errorMessage && <span className="text-sm text-red-700">{errorMessage}</span>}
    </div>
  )
}
