import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticles, getEdition, getEditions, getRestaurants, priceLabel } from '@/lib/data'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Photo } from '@/components/Photo'
import { SponsorLabel } from '@/components/SponsorLabel'
import { NewsletterForm } from './NewsletterForm'

export default async function EditionHome({ params }: { params: Promise<{ edicion: string }> }) {
  const { edicion } = await params
  const [edition, editions] = await Promise.all([getEdition(edicion), getEditions()])
  if (!edition) notFound()

  const [articles, restaurants] = await Promise.all([getArticles(edition.slug), getRestaurants(edition.slug)])
  const [lead, ...rest] = articles
  const href = (slug: string) => `/${edition.slug}/guias/${slug}`

  return (
    <>
      <SiteHeader edition={edition} editions={editions} />
      <main className="wrap">
        {lead ? (
          <div className="hero">
            <Link href={href(lead.slug)} aria-label={lead.title}>
              <Photo src={lead.image_url} alt={lead.title} style={{ aspectRatio: '4 / 3' }} />
            </Link>
            <div>
              <SponsorLabel article={lead} style={{ display: 'block', marginBottom: 10 }} />
              {!lead.sponsor && <span className="label">{lead.kind === 'guia' ? 'Guía' : 'Reportaje'}</span>}
              <h1><Link href={href(lead.slug)}>{lead.title}</Link></h1>
              <p className="dek">{lead.dek}</p>
              <p className="meta">Por {lead.author}</p>
            </div>
          </div>
        ) : (
          <p className="meta" style={{ padding: '80px 0' }}>Todavía no hay artículos publicados en esta edición.</p>
        )}

        {rest.length > 0 && (
          <>
            <hr className="divider" />
            <div className="grid">
              {rest.slice(0, 6).map((a, i) => (
                <Link key={a.id} href={href(a.slug)} className="card">
                  <Photo src={a.image_url} alt={a.title} variant={((i % 2) + 1) as 1 | 2} style={{ aspectRatio: '4 / 5' }} />
                  <SponsorLabel article={a} />
                  <h3>{a.title}</h3>
                  {!a.sponsor && <span className="meta">Por {a.author}</span>}
                </Link>
              ))}
            </div>
          </>
        )}

        {restaurants.length > 0 && (
          <section style={{ marginTop: 72 }}>
            <hr className="divider" />
            <h2 style={{ fontSize: 30, marginBottom: 12 }}>Restaurantes reseñados</h2>
            {restaurants.map((r) => (
              <Link key={r.id} href={`/${edition.slug}/restaurantes/${r.slug}`} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
                <span>
                  <span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 20 }}>{r.name}</span>
                  {r.is_featured && <span className="sponsor" style={{ marginLeft: 10 }}>Destacado</span>}
                  <span className="meta" style={{ display: 'block' }}>{r.cuisine} en {r.neighborhood}</span>
                </span>
                <span className="meta">{priceLabel(r.price_level)}</span>
              </Link>
            ))}
          </section>
        )}

        <section className="news">
          <h2 style={{ fontSize: 34 }}>La mesa del domingo</h2>
          <p className="meta" style={{ fontSize: 15, marginTop: 10 }}>
            Aperturas, reservas difíciles y una receta de chef, cada domingo en tu correo.
          </p>
          <NewsletterForm edition={edition.slug} />
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
