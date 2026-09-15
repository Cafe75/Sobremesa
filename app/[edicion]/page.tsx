import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticles, getEdition, getEditions, getRestaurants, priceLabel } from '@/lib/data'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Photo } from '@/components/Photo'
import { SponsorLabel } from '@/components/SponsorLabel'
import { NewsletterForm } from './NewsletterForm'

const kindLabel = { reportaje: 'Reportaje', guia: 'Guía', resena: 'Reseña' } as const

export default async function EditionHome({ params }: { params: Promise<{ edicion: string }> }) {
  const { edicion } = await params
  const [edition, editions] = await Promise.all([getEdition(edicion), getEditions()])
  if (!edition) notFound()

  const [articles, restaurants] = await Promise.all([getArticles(edition.slug), getRestaurants(edition.slug)])
  const series = articles.find((a) => a.sponsor_format === 'colaboracion')
  const editorial = articles.filter((a) => a.id !== series?.id)
  const [lead, big, ...rest] = editorial
  const href = (slug: string) => `/${edition.slug}/guias/${slug}`

  return (
    <>
      <SiteHeader edition={edition} editions={editions} dark />
      <main>
        {lead ? (
          <section className="cover">
            <div className="inner">
              <div className="text">
                {lead.sponsor ? <SponsorLabel article={lead} style={{ marginBottom: 18 }} /> : <span className="kicker">{kindLabel[lead.kind]}</span>}
                <h1><Link href={href(lead.slug)}>{lead.title}</Link></h1>
                <p className="dek">{lead.dek}</p>
                <div className="byline">
                  <Link href={href(lead.slug)} className="btn gold">Leer {kindLabel[lead.kind].toLowerCase()}</Link>
                  <span className="meta">Por {lead.author}</span>
                </div>
              </div>
              <Photo src={lead.image_url} alt={lead.title} variant={0} priority />
            </div>
          </section>
        ) : (
          <p className="wrap meta" style={{ padding: '96px 40px' }}>Todavía no hay artículos publicados en esta edición.</p>
        )}

        {big && (
          <section className="wrap section" id="lo-ultimo">
            <div className="sechead"><h2>Lo último</h2><span className="meta">{edition.city}</span></div>
            <div className="latest">
              <Link href={href(big.slug)} className="big card-link">
                <Photo src={big.image_url} alt={big.title} variant={2} style={{ aspectRatio: '4 / 3' }} />
                {big.sponsor ? <SponsorLabel article={big} style={{ display: 'block', marginTop: 18 }} /> : null}
                <h3>{big.title}</h3>
                <p className="meta" style={{ fontSize: 15, marginTop: 12, maxWidth: '48ch' }}>{big.dek}</p>
              </Link>
              <div className="stack">
                {rest.slice(0, 4).map((a, i) => (
                  <Link key={a.id} href={href(a.slug)} className="small card-link">
                    <Photo src={a.image_url} alt={a.title} variant={(i % 2 ? 3 : 1)} style={{ aspectRatio: '1' }} />
                    <div>
                      {a.sponsor ? <SponsorLabel article={a} /> : <span className="meta">{kindLabel[a.kind]}</span>}
                      <h3>{a.title}</h3>
                    </div>
                  </Link>
                ))}
                {rest.length === 0 && restaurants[0] && (
                  <Link href={`/${edition.slug}/restaurantes/${restaurants[0].slug}`} className="small card-link">
                    <Photo src={restaurants[0].image_urls[0]} alt={restaurants[0].name} variant={1} style={{ aspectRatio: '1' }} />
                    <div><span className="meta">Reseña</span><h3>{restaurants[0].name}: {restaurants[0].cuisine.toLowerCase()} en {restaurants[0].neighborhood}</h3></div>
                  </Link>
                )}
              </div>
            </div>
          </section>
        )}

        {restaurants.length > 0 && (
          <section className="wrap section" id="restaurantes">
            <div className="sechead"><h2>Restaurantes reseñados</h2><span className="meta">{restaurants.length} en {edition.city}</span></div>
            <div className="index">
              {restaurants.map((r) => (
                <Link key={r.id} href={`/${edition.slug}/restaurantes/${r.slug}`}>
                  <span className="name">{r.name}</span>
                  <span className="right">
                    {r.is_featured && <span className="sponsor">Destacado<br /></span>}
                    {r.cuisine}<br />{r.neighborhood}, {priceLabel(r.price_level)}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {series && (
          <section className="series">
            <div className="inner">
              <Photo src={series.image_url} alt={series.title} variant={3} />
              <div className="text">
                <SponsorLabel article={series} />
                <h2>{series.title}</h2>
                <p className="d">{series.dek}</p>
                <div><Link href={href(series.slug)} className="btn">Ver la serie</Link></div>
              </div>
            </div>
          </section>
        )}

        <section className="newsletter" id="boletin" style={{ marginTop: series ? 0 : 96 }}>
          <h2>La mesa del domingo</h2>
          <p>Aperturas, reservas difíciles y una receta de chef, cada domingo en tu correo.</p>
          <NewsletterForm edition={edition.slug} />
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
