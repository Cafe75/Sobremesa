import Link from 'next/link'
import type { Edition } from '@/lib/types'

export function SiteHeader({ edition, editions }: { edition?: Edition; editions: Edition[] }) {
  const base = `/${edition?.slug ?? editions.find((e) => e.is_active)?.slug ?? 'houston'}`
  const upcoming = editions.filter((e) => !e.is_active).map((e) => e.city)
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href={base} className="logo">Sobremesa</Link>
        <nav aria-label="Principal">
          <Link href={base}>Reseñas</Link>
          <Link href={base}>Guías</Link>
          <Link href="/anunciate">Anúnciate</Link>
        </nav>
        <p className="edition">
          Edición {edition?.city ?? 'internacional'}
          {upcoming.length > 0 && <span className="meta">, pronto {upcoming.slice(0, 2).join(' y ')}</span>}
        </p>
      </div>
    </header>
  )
}
