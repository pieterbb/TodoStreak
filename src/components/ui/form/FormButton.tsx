import { ReactNode } from 'react'

interface FormButtonProps {
  children: ReactNode
  disabled?: boolean
}

export default function FormButton({ children, disabled }: FormButtonProps) {
  return (
    <>
      <button
        type="submit"
        disabled={disabled}
        className={`mb-2 mr-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 ${
          disabled
            ? 'bg-gray-500 focus:ring-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
            : 'bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        }`}
      >
        {children}
      </button>
    </>
  )
}
