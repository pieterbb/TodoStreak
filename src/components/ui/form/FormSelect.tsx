import { forwardRef } from 'react'

interface FormSelectProps {
  id: string
  label: string
  options: string[]
  placeholder?: string
  error?: string
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ id, label, options, error, ...rest }, ref) => {
    return (
      <div className="mb-2 flex flex-col space-y-2">
        <label htmlFor={id} className="font-bold">
          {label}
        </label>
        <select
          id={id}
          name={id}
          className="rounded-md border border-gray-300 p-2"
          ref={ref}
        >
          {options.map((option) => (
            <option key={option} value={option.toLowerCase()}>
              {option}
            </option>
          ))}
        </select>

        {error && <div className="text-red-400">{error}</div>}
      </div>
    )
  }
)

FormSelect.displayName = 'FormSelect'
export default FormSelect
