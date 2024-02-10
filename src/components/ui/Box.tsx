export default function Box({ children }: { children: React.ReactNode }) {
  return (
    <div className={`mb-4 rounded-md border bg-white shadow-sm `}>
      {children}
    </div>
  )
}
