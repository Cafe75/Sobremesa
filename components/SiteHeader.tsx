import Link from 'next/link'
import type { Edition } from '@/lib/types'

export function SiteHeader({ edition, editions, dark }: { edition?: Edition; editions: Edition[]; dark?: boolean }) {
  const base = `/${edition?.slug ?? editions.find((e) => e.is_active)?.slug ?? 'houston'}`
  const upcoming = editions.filter((e) => !e.is_active).map((e) => e.city)
  return (
    <header className={`masthead${dark ? ' on-dark' : ''}`}>
      <div className="wrap top">
        <p className="edition">
          Edición <b>{edition?.city ?? 'internacional'}</b>
          {upcoming.length > 0 && <><br />Pronto {upcoming.slice(0, 2).join(' y ')}</>}
        </p>
        <Link href={base} className="logo">Sobremesa</Link>
        <Link href="/anunciate" className="cta btn" style={{ padding: '8px 16px' }}>Anúnciate</Link>
      </div>
      <nav className="wrap" aria-label="Principal">
        <Link href={`${base}#lo-ultimo`}>Lo último</Link>
        <Link href={`${base}#restaurantes`}>Restaurantes</Link>
        <Link href={`${base}#boletin`}>Boletín</Link>
        <Link href="/anunciate">Para marcas</Link>
      </nav>
    </header>
  )
}
