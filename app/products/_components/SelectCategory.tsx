import { useCategoriesQuery } from "@/services/api"

type TProps = {
  value: string
  onChange: (val: string) => void
}

export default function SelectCategory({ value, onChange }: TProps) {
  const { data, isLoading, isError, error } = useCategoriesQuery()

  if (isLoading) {
    return <>loading</>
  }
  if (isError) {
    return <>{ error}</>
  }

  return (
    <div className="bg-white border pr-1.5 border-gray-700 rounded-sm h-8.5 flex items-stretch">
      <select className="outline-0" name="" id="" value={value} onChange={(e) => onChange(e.target.value)}>
        <option key="" >
          Select..
        </option>
        {data?.map(({ name, slug  }) => (
          <option key={slug} value={slug}>{name}</option>
        ))}
      </select>
    </div>

  )
}
