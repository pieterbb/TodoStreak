export default function ContentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="w-full flex-initial lg:w-1/3">{children}</div>{' '}
    </>
  )
}
