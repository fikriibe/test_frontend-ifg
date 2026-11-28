'use client'

import { useAppSelector } from "@/lib/hook"
import Step1Form from "./Step1Form"
import Step2Form from "./Step2Form"
import Step3Form from "./Step3Form"
import StepReview from "./StepReview"

const stepperInfo = [
  "Step 1",
  "Step 2",
  "Step 3",
  "Review",
]

export default function FormStepper() {
  const currentStep = useAppSelector((s) => s.formCreate.currentStep)

  return (
    <>
      <div className="grid place-items-center mb-5">
        <div className="form-create-stepper relative flex items-center justify-center gap-5">
          {stepperInfo.map((title, index) => {
            const step = index + 1
            const isCurrent = currentStep === step
            return (
              <div className={`z-10 place-items-center ${isCurrent ? "text-gray-900 font-semibold" : "text-gray-500"}`} key={step}>
                <span className={ `grid content-center text-center w-10 h-10 bg-white rounded-full ${isCurrent ? 'border-gray-700 border-2' : "border-gray-400 border"}`}>{step}</span>
                {title}
              </div>
            )
          })}
        </div>
      </div>
      <div className="grid place-items-center">
        <div className="w-full max-w-lg">
          {currentStep === 1 && <Step1Form />}
          {currentStep === 2 && <Step2Form />}
          {currentStep === 3 && <Step3Form />}
          {currentStep === 4 && <StepReview />}
        </div>
      </div>
    </>
  )
}
