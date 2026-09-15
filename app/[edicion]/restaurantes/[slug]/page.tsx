import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatDate, getEdition, getEditions, getRestaurant, priceLabel } from '@/lib/data'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Photo } from '@/components/Photo'
import { Paragraphs } from '@/components/Paragraphs'

type Props = { params: Promise<{ edicion: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { edicion, slug } = await params
  const r = await getRestaurant(edicion, slug)
  return r ? { title: r.name, description: `${r.cuisine} en ${r.neighborhood}` } : {}
}

export default async function RestaurantPage({ params }: Props) {
  const { edicion, slug } = await params
  const [edition, editions, r] = await Promise.all([getEdition(edicion), getEditions(), getRestaurant(edicion, slug)])
  if (!edition || !r) notFound()
  const [img0, img1, img2] = r.image_urls

  return (
    <>
      <SiteHeader edition={edition} editions={editions} />
      <main className="wrap" style={{ paddingTop: 36 }}>
        <p className="meta"><Link href={`/${edition.slug}`}>{edition.city}</Link> / {r.neighborhood}</p>
        <div className="gallery">
          <Photo src={img0} alt={r.name} variant={1} />
          <div className="side">
            <Photo src={img1} alt={r.name} />
            <Photo src={img2} alt={r.name} variant={2} />
          </div>
        </div>

        <div className="two">
          <div>
            <h1 style={{ fontSize: 60 }}>{r.name}</h1>
            <p style={{ fontSize: 16, color: 'var(--muted)', margin: '12px 0 32px' }}>
              {r.cuisine} en {r.neighborhood}, {priceLabel(r.price_level)}
              {r.is_featured && <span className="sponsor" style={{ marginLeft: 12 }}>Destacado</span>}
            </p>
            {r.review ? (
              <>
                <div style={{ borderTop: '1px solid var(--ink)', paddingTop: 22, marginBottom: 26 }}>
                  <span className="label">Nuestra opinión</span>
                  <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 25, lineHeight: 1.4 }}>{r.review.verdict}</p>
                </div>
                <div className="body"><Paragraphs text={r.review.body} /></div>
                <p className="meta">
                  Reseña de {r.review.author}, {formatDate(r.review.published_at)}. Sobremesa paga todas sus comidas.
                </p>
              </>
            ) : (
              <p className="meta">Todavía no hemos reseñado este restaurante.</p>
            )}
          </div>
          <aside>
            <div className="box" style={{ position: 'sticky', top: 24 }}>
              <h3>Reservar</h3>
              {r.reservation_url ? (
                <>
                  <a href={r.reservation_url} target="_blank" rel="noopener noreferrer" className="btn dark" style={{ width: '100%' }}>
                    Reservar mesa
                  </a>
                  <p className="meta" style={{ marginTop: 8, fontSize: 12 }}>Te llevamos al sistema de reservas del restaurante.</p>
                </>
              ) : (
                <p className="meta">Este restaurante no toma reservas en línea.</p>
              )}
              <div className="info" style={{ marginTop: 18 }}>
                {r.address && <p><b>Dirección</b>{r.address}</p>}
                {r.hours && <p><b>Horario</b>{r.hours}</p>}
                <p><b>Precio</b>{priceLabel(r.price_level)}</p>
                {r.good_for && <p><b>Ideal para</b>{r.good_for}</p>}
              </div>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
