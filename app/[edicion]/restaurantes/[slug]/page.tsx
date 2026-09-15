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
      <main>
        <div className="r-gallery">
          <Photo src={img0} alt={r.name} variant={0} priority />
          <Photo src={img1} alt={r.name} variant={1} />
          <Photo src={img2} alt={r.name} variant={3} />
        </div>
        <div className="wrap">
          <div className="r-head">
            <div>
              <p className="meta" style={{ marginBottom: 14 }}>
                <Link href={`/${edition.slug}#restaurantes`}>{edition.city}</Link> / {r.neighborhood}
                {r.is_featured && <span className="sponsor" style={{ marginLeft: 12 }}>Destacado</span>}
              </p>
              <h1>{r.name}</h1>
            </div>
            <div className="facts">
              <span className="price">{priceLabel(r.price_level)}</span><br />
              {r.cuisine}<br />{r.neighborhood}
            </div>
          </div>

          <div className="two" style={{ paddingBottom: 96 }}>
            <div>
              {r.review ? (
                <>
                  <p className="verdict">{r.review.verdict}</p>
                  <p className="meta" style={{ marginBottom: 8 }}>Reseña de {r.review.author}, {formatDate(r.review.published_at)}</p>
                  <div className="body" style={{ paddingTop: 24 }}><Paragraphs text={r.review.body} /></div>
                  <p className="meta">Sobremesa paga todas sus comidas y nunca acepta pagos por reseñas.</p>
                </>
              ) : (
                <p className="verdict" style={{ color: 'var(--muted)' }}>Todavía no hemos reseñado este restaurante.</p>
              )}
            </div>
            <aside style={{ paddingTop: 48 }}>
              <div className="box" style={{ position: 'sticky', top: 24 }}>
                <h3>Reservar</h3>
                {r.reservation_url ? (
                  <>
                    <a href={r.reservation_url} target="_blank" rel="noopener noreferrer" className="btn dark" style={{ width: '100%' }}>Reservar mesa</a>
                    <p className="meta" style={{ marginTop: 8, fontSize: 12 }}>Te llevamos al sistema de reservas del restaurante.</p>
                  </>
                ) : (
                  <p className="meta">Este restaurante no toma reservas en línea.</p>
                )}
                <div className="info" style={{ marginTop: 18 }}>
                  {r.address && <p><b>Dirección</b>{r.address}</p>}
                  {r.hours && <p><b>Horario</b>{r.hours}</p>}
                  {r.good_for && <p><b>Ideal para</b>{r.good_for}</p>}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
