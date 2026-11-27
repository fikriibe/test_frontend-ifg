import { useCategoriesQuery } from "@/services/api"

type TProps = {
  value: string
  onChange: (val: string) => void
}

export default function SelectCategory({ value, onChange }: TProps) {
  const { data, isLoading, isError, error } = useCategoriesQuery()
  if (isError) {
    return <span className="h-8.5 text-red-600 border border-red-700 rounded-sm flex items-center px-3 max-w-xs">
      {JSON.stringify(error) || 'Terjadi Kesalahan'}
    </span>
  }

  return (
    <div className={ `${isLoading ? "text-gray-500 border-gray-500" : "border-gray-700"} border pr-1.5  rounded-sm h-8.5 flex items-stretch`}>
      <select className="outline-0 w-full" name="" id="" value={value} onChange={(e) => onChange(e.target.value)} disabled={isLoading}>
        <option key="" className="text-gray-700" >
          {isLoading ? "Loading..." : "Select.."}
        </option>
        {data?.map(({ name, slug  }) => (
          <option key={slug} value={slug}>{name}</option>
        ))}
      </select>
    </div>

  )
}
