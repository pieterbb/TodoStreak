export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="w-full lg:w-96">{children}</div>
    </>
  )
}
