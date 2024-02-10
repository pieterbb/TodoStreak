import { ReactNode } from 'react'

export default function WidgetTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-2 text-xs font-bold uppercase text-gray-500">
      {children}
    </div>
  )
}
