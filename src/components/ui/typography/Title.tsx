import { ReactNode } from 'react'

export default function Title({ children }: { children: ReactNode }) {
  return <div className="text-xl font-bold">{children}</div>
}
