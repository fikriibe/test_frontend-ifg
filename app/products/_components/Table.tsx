import { useAppSelector } from "@/lib/hook"
import TableHeaderSort from "./TableHeaderSort"
import { useDispatch } from "react-redux"
import { useProductsQuery } from "@/services/api"
import { setFilter } from "@/lib/reducer/filter"
import PencilIcon from "@/components/icon/PencilIcon"
import TrashIcon from "@/components/icon/TrashIcon"
type TProps = {
  setEditId: (id: number) => void
  setDeleteId: (id: number) => void
}
export default function Table({ setEditId,setDeleteId }: TProps) {
  const filter = useAppSelector(s => s.filter)
  const dispatch = useDispatch()
  const { data, isLoading, isError, error, isFetching } = useProductsQuery(filter)
  console.log(isLoading, isFetching)

  const onChangePage = (page: number) => {
    dispatch(setFilter({ page }))
  }

  const renderTableContent = () => {
    if (isLoading || isFetching) {
      return Array(4).fill("").map((_, i) => (
        <tr key={`skeleton-${i}`}>
          <td>
            <div className="animate-pulse h-3 bg-gray-400 rounded-xl w-8" />
          </td>
          <td>
            <div className="animate-pulse h-3 bg-gray-400 rounded-xl w-16" />
          </td>
          <td>
            <div className="animate-pulse h-3 bg-gray-400 rounded-xl w-14" />
          </td>
          <td>
            <div className="animate-pulse h-3 bg-gray-400 rounded-xl w-10" />
          </td>
          <td>
            <div className="animate-pulse h-3 bg-gray-400 rounded-xl w-10" />
          </td>
          <td>
            <div className="animate-pulse h-3 bg-gray-400 rounded-xl w-10" />
          </td>
    		</tr>
      ))
    }
    if (!data?.products.length) {
      return (
        <tr>
          <td colSpan={6} className="text-center text-gray-600 font-semibold h-15">
            Data tidak di temukan
          </td>
        </tr>
      )
    }

    return data?.products.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.title}</td>
          <td>{item.category}</td>
          <td>{item.price}</td>
          <td>{item.stock}</td>
          <td className="space-x-2">
            <button onClick={() => setEditId(item.id)}>
              <PencilIcon />
            </button>
            <button onClick={() => setDeleteId(item.id)} className="text-red-700">
              <TrashIcon />
            </button>
          </td>
       	</tr>
      )
  })
  }

  if (isError) {
    return (
      <div className="bg-red-200 text-red-800 border-red-800 p-4 border rounded-sm mt-8">
        <h3 className="text-md font-semibold">Terjadi Kesalahan</h3>
        <span className="text-sm">
          { JSON.stringify(error) || 'Error 500'}
        </span>
      </div>
    )
  }




  return (
    <>
      <div className="w-full overflow-auto mt-8">
        <table className="w-full [&_tr]:h-8.5 [&_td]:px-2">
        	<thead className="[&_td]:bg-gray-300 [&_td]:font-semibold">
        		<tr>
              <td>ID</td>
              <td>
                <TableHeaderSort sortBy="title">
                  Title
                </TableHeaderSort>
              </td>
              <td>
                <TableHeaderSort sortBy="category">
                Category
                </TableHeaderSort>
              </td>
              <td>
                <TableHeaderSort sortBy="price">
                Price
                </TableHeaderSort>
              </td>
              <td>
                <TableHeaderSort sortBy="stock">
                Stock
                </TableHeaderSort>
              </td>
              <td>Action</td>
        		</tr>
          </thead>
          <tbody className="[&_tr:nth-child(even)]:bg-gray-300">
            {renderTableContent()}
          </tbody>
        </table>
      </div>

      {data && (
        <div className="flex items-center justify-end gap-4 mt-5 w-full pr-10">
          <span className="mr-2">
            Pages
          </span>
          {Array(data.totalPages || 1).fill("").map((_, index) => {
            const thisPage = index + 1
            return (
              <button key={index} className={filter.page === thisPage ? 'text-gray-900 font-bold' : 'text-gray-800'} onClick={() => onChangePage(thisPage)}>
                {thisPage}
              </button>
            )
          })}
        </div>
      )}
    </>
  )
}
