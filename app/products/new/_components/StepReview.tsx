import PencilIcon from "@/components/icon/PencilIcon"
import { useAppSelector } from "@/lib/hook"
import { resetStep, setCurrentStep } from "@/lib/reducer/formCreate"
import { useProductAddMutation } from "@/services/api"
import { TProduct } from "@/types/api"
import { useRouter } from "next/navigation"
import { Fragment } from "react"
import { useDispatch } from "react-redux"

function TableStepReview({ children, title, step }: React.PropsWithChildren<{ title: string, step: number }>) {
  const dispatch = useDispatch()

  const moveToStep = () => dispatch(setCurrentStep(step))

  return (
    <div className="card">
      <div className="flex items-center gap-3 justify-between mb-4">
        <h5 className="font-semibold">
          { title}
        </h5>
        <button onClick={moveToStep}>
          <PencilIcon />
        </button>
      </div>
      <table className="w-full [&_td]:border [&_td]:pl-3 [&_td:first-child]:text-sm">
        <tbody>
        {children}
        </tbody>
      </table>
    </div>
  )
}

export default function StepReview() {
  const [addProduct] = useProductAddMutation()
  const dispatch = useDispatch()
  const router = useRouter()
  const { step1, step2, step3 } = useAppSelector(s => s.formCreate)

  const submit = () => {
    const product = {
      title: step1.title ?? '',
      brand: step1.brand ?? '',
      category: step1.category ?? '',
      description: step1.description ?? '',
      price: step2.price ?? 1,
      stock: step2.stock ?? 0,
      discountPercentage: step2.discountPercentage ?? 0,
      // SKU
      weight: step3.weight ?? 0,
      dimensions: {
        width: step3.dimensions?.width ?? 1,
        height: step3.dimensions?.height ?? 1,
        depth: step3.dimensions?.depth ?? 1,
      },
     shippingInformation: step3.shippingInformation ?? ''
    } as Omit<TProduct, 'id'>
    addProduct(product).then(() => {
      dispatch(resetStep())
      router.back()
    })

  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Review</h3>
      <TableStepReview title="Step 1: Basic Informantion" step={1}>
        <tr>
          <td className="">Title</td>
          <td>{step1.title}</td>
        </tr>
        <tr>
          <td>Brand</td>
          <td>{step1.brand}</td>
        </tr>
        <tr>
          <td>Category</td>
          <td>{step1.category}</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>{step1.description}</td>
        </tr>
      </TableStepReview>
      <TableStepReview title="Step 2: Pricing, Stock & Dynamic Product" step={2}>
        <tr>
          <td>Base Price</td>
          <td>{step2.price}</td>
        </tr>
        <tr>
          <td>Stock Quantity</td>
          <td>{step2.stock}</td>
        </tr>
        <tr>
          <td>Discount Percentage</td>
          <td>{step2.discountPercentage}</td>
        </tr>
        <tr>
          <td>Variants</td>
          <td>
            <div className="grid grid-cols-4 gap-y-2.5 text-sm [&>div>div:first-child]:text-xs [&>div>div:first-child]:text-gray-600">
              {step2.variants?.map((variant, i) => (
                <Fragment key={i}>
                  <div>
                    <div>Color</div>
                    <div>{variant.color}</div>
                  </div>
                  <div>
                    <div>Size</div>
                    <div>{variant.size}</div>
                  </div>
                  <div>
                    <div>SKU Code</div>
                    <div>{variant.sku}</div>
                  </div>
                  <div>
                    <div>Extra Price</div>
                    <div>{variant.extraPrice}</div>
                  </div>
                </Fragment>
              ))}
            </div>
          </td>
        </tr>
      </TableStepReview>
      <TableStepReview title="Step 3: Shipping & Supplier Details" step={3}>
        <tr>
          <td>Weight</td>
          <td>{step3.weight}</td>
        </tr>
        <tr>
          <td>Dimensions</td>
          <td>{Object.entries(step3.dimensions || {}).map(([key, value]) => (
            <div key={key}>
              <p className="text-xs text-gray-600">{key}</p>
              <p className="text-sm">{ value}</p>
            </div>
          ))}</td>
        </tr>
        <tr>
          <td>is Fragile</td>
          <td>{step3.fragile ? "true" : "false"}</td>
        </tr>
        <tr>
          <td>Spesial Shipping Notes</td>
          <td>{step3.shippingInformation}</td>
        </tr>
      </TableStepReview>

      <button onClick={submit} className="button bg-blue-700 border-blue-800 text-white w-full">Submit</button>
    </div>
  )
}
