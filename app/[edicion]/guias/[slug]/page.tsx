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
          <header className="wrap narrow" style={{ paddingTop: 64 }}>
            <SponsorLabel article={article} style={{ display: 'block', marginBottom: 14 }} />
            <h1 style={{ fontSize: 54 }}>{article.title}</h1>
            <p style={{ fontSize: 19, color: 'var(--muted)', margin: '20px 0' }}>{article.dek}</p>
            <p className="meta">Por {article.author}, {formatDate(article.published_at)}</p>
          </header>
          <div className="wrap" style={{ margin: '40px auto 48px' }}>
            <Photo src={article.image_url} alt={article.title} variant={2} style={{ aspectRatio: '16 / 8' }} />
          </div>
          <div className="wrap narrow body">
            <Paragraphs text={article.body} />
            {disclosure && (
              <p className="note">
                {disclosure}. Nuestro equipo editorial eligió y escribió este contenido de forma independiente.
              </p>
            )}
          </div>
        </article>

        {related.length > 0 && (
          <div className="wrap" style={{ marginTop: 56 }}>
            <hr className="divider" />
            <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              {related.map((a) => (
                <Link key={a.id} href={`/${edition.slug}/guias/${a.slug}`} className="card">
                  <Photo src={a.image_url} alt={a.title} variant={1} style={{ aspectRatio: '3 / 2' }} />
                  <SponsorLabel article={a} />
                  <h3>{a.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  )
}
