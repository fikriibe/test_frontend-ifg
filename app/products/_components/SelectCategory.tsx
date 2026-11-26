import { useCategoriesQuery } from "@/services/api"

export default function SelectCategory() {
  const { data, isLoading, isError, error } = useCategoriesQuery()

  if (isLoading) {
    return <>loading</>
  }
  if (isError) {
    return <>{ error}</>
  }

  return (
    <div className="bg-white border pr-1.5 border-gray-700 rounded-sm h-8.5 flex items-stretch">
      <select className="outline-0" name="" id="">
        {data?.map(({ name, slug  }) => (
          <option key={slug} value={slug}>{name}</option>
        ))}
      </select>
    </div>

  )
}
