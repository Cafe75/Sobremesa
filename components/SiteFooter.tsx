import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p>
          <span className="logo">Sobremesa</span>
          La guía gastronómica en español. El contenido pagado siempre se identifica.
        </p>
        <nav aria-label="Pie de página">
          <Link href="/anunciate">Anúnciate</Link>
        </nav>
      </div>
    </footer>
  )
}
