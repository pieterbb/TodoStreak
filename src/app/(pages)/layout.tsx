import MenuBarWrapper from '@/components/sidebar/SidebarMenu'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="flex flex-col justify-center gap-4 px-4 lg:flex-row lg:gap-16">
        <div className="flex-none">
          <MenuBarWrapper />
        </div>
        {children}
      </div>
    </>
  )
}
