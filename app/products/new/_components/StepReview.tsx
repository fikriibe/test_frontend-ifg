import { useAppSelector } from "@/lib/hook"

export default function StepReview() {
  const { step1, step2, step3 } = useAppSelector(s => s.formCreate)
  return (
    <div>
      <h3>Review</h3>
      <div className="card">
        <h5>
          Step 1: Basic Informantion
        </h5>
        <div>
          {Object.entries(step1).map(([key, value]) => (
            <div key={key}>
              <p>{key}</p>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <h5>
          Step 1: Basic Informantion
        </h5>
        <div>
          {Object.entries(step1).map(([key, value]) => (
            <div key={key}>
              <p>{key}</p>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <h5>
          Step 2: Pricing, Stock & Dynamic Product
        </h5>
        <div>
          {Object.entries(step1).map(([key, value]) => (
            <div key={key}>
              <p>{key}</p>
              {Array.isArray(value) ?
                value.map((_, i) => `i`)
                : <p>{value}</p>}
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <h5>
          Step 3: Shipping & Supplier Details
        </h5>
        <div>
          {Object.entries(step1).map(([key, value]) => (
            <div key={key}>
              <p>{key}</p>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </div>
      <button>Submit</button>
    </div>
  )
}
