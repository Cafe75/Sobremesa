import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatDate, getArticle, getArticles, getEdition, getEditions } from '@/lib/data'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Photo } from '@/components/Photo'
import { SponsorLabel, sponsorText } from '@/components/SponsorLabel'
import { Paragraphs } from '@/components/Paragraphs'

type Props = { params: Promise<{ edicion: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { edicion, slug } = await params
  const article = await getArticle(edicion, slug)
  return article ? { title: article.title, description: article.dek } : {}
}

export default async function ArticlePage({ params }: Props) {
  const { edicion, slug } = await params
  const [edition, editions, article] = await Promise.all([getEdition(edicion), getEditions(), getArticle(edicion, slug)])
  if (!edition || !article) notFound()

  const related = (await getArticles(edition.slug)).filter((a) => a.id !== article.id).slice(0, 2)
  const disclosure = sponsorText(article)

  return (
    <>
      <SiteHeader edition={edition} editions={editions} />
      <main>
        <article>
          <header className="wrap article-head">
            {article.sponsor
              ? <SponsorLabel article={article} style={{ display: 'block', marginBottom: 22 }} />
              : <span className="kicker">{article.kind === 'guia' ? 'Guía' : 'Reportaje'}</span>}
            <h1>{article.title}</h1>
            <p className="dek">{article.dek}</p>
            <p className="meta">Por {article.author}, {formatDate(article.published_at)}</p>
          </header>
          <div className="wrap article-hero">
            <Photo src={article.image_url} alt={article.title} variant={2} priority />
          </div>
          <div className="wrap narrow body">
            <Paragraphs text={article.body} />
            {disclosure && (
              <p className="note">{disclosure}. Nuestro equipo editorial eligió y escribió este contenido de forma independiente.</p>
            )}
          </div>
        </article>

        {related.length > 0 && (
          <section className="wrap section" style={{ paddingBottom: 96 }}>
            <div className="sechead"><h2>Sigue leyendo</h2></div>
            <div className="latest" style={{ gridTemplateColumns: '1fr 1fr' }}>
              {related.map((a, i) => (
                <Link key={a.id} href={`/${edition.slug}/guias/${a.slug}`} className="big card-link">
                  <Photo src={a.image_url} alt={a.title} variant={i ? 3 : 1} style={{ aspectRatio: '3 / 2' }} />
                  {a.sponsor && <SponsorLabel article={a} style={{ display: 'block', marginTop: 18 }} />}
                  <h3 style={{ fontSize: 24 }}>{a.title}</h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  )
}
