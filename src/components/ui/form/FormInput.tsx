import { forwardRef } from 'react'

interface FormInputProps {
  id: string
  label: string
  defaultValue?: string
  placeholder?: string
  error?: string
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  function FormInput(
    { id, label, defaultValue, placeholder, error, ...rest }: FormInputProps,
    ref
  ) {
    return (
      <div className="mb-2 flex flex-col space-y-2">
        <label htmlFor={id} className="font-bold">
          {label}
        </label>
        <input
          className="rounded-md border border-gray-300 p-2"
          defaultValue={defaultValue}
          id={id}
          name={id}
          placeholder={placeholder}
          type={'text'}
          ref={ref}
          {...rest}
        />
        {error && <div className="text-red-400">{error}</div>}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'

export default FormInput
