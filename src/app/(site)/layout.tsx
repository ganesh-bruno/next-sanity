import {Footer} from '@/components/footer'
import {Navbar} from '@/components/navbar'

export default function SiteLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  )
}
