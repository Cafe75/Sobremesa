import type { ArticleWithSponsor } from '@/lib/types'

export function sponsorText(article: Pick<ArticleWithSponsor, 'sponsor' | 'sponsor_format' | 'kind'>) {
  if (!article.sponsor) return null
  const kind = article.kind === 'guia' ? 'Guía presentada' : 'Presentado'
  return article.sponsor_format === 'colaboracion'
    ? `En colaboración con ${article.sponsor.name}`
    : `${kind} por ${article.sponsor.name}`
}

export function SponsorLabel({ article, style }: { article: ArticleWithSponsor; style?: React.CSSProperties }) {
  const text = sponsorText(article)
  if (!text) return null
  return <span className="sponsor" style={style}>{text}</span>
}
