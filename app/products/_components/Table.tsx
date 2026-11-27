import { useAppSelector } from "@/lib/hook"
import TableHeaderSort from "./TableHeaderSort"
import { useDispatch } from "react-redux"
import { useProductsQuery } from "@/services/api"
import { setFilter } from "@/lib/filterReducer"
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
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
                <path d="m15 5 4 4"/>
              </svg>
            </button>
            <button onClick={() => setDeleteId(item.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"/>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                <path d="M10 11v6"/>
                <path d="M14 11v6"/>
              </svg>
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
      <div className="w-full overflow-auto">
        <table className="mt-8 [&_tr]:h-8.5 [&_td]:px-2">
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
