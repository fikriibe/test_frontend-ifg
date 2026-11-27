import { setFilter, TFilterState } from "@/lib/filterReducer"
import { useAppSelector } from "@/lib/hook"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"

function getParams(params: URLSearchParams): TFilterState {
  return {
    search: params.get("search") ?? '',
    category: params.get("category") ?? '',
    sort: params.get("sort") ?? '',
    page: +(params.get("page") ?? 1),

  }
}

function setParams(state: TFilterState) {
  const params = new URLSearchParams();
  if (state.search) params.set("search", state.search)
  if (state.category) params.set("category", state.category)
  if (state.sort) params.set("sort", state.sort)
  if (state.page) params.set("page", `${state.page}`)
  return params.toString()
}

export function useSyncFilter() {
  const filter = useAppSelector(s => s.filter)
  const dispatch = useDispatch()
  const params = useSearchParams()
  const mount = useRef(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    dispatch(setFilter(getParams(params)))
    mount.current = true
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (mount.current) {
      const newParams = setParams({
        page: filter.page,
        category: filter.category,
        search: filter.search,
        sort: filter.sort
      })
      router.replace(newParams ? `${pathname}?${newParams}` : pathname, { scroll: false })
    }

  }, [filter.category, filter.page, filter.search, filter.sort])
}
