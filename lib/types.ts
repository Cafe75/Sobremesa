export type Edition = {
  slug: string
  city: string
  country: string
  is_active: boolean
}

export type Sponsor = {
  id: string
  name: string
  tagline: string | null
  url: string | null
  category: 'equipo' | 'insumos' | 'distribucion' | 'otro'
}

export type Restaurant = {
  id: string
  edition_slug: string
  slug: string
  name: string
  cuisine: string
  neighborhood: string
  price_level: 1 | 2 | 3 | 4
  address: string | null
  hours: string | null
  good_for: string | null
  reservation_url: string | null
  image_urls: string[]
  is_featured: boolean
}

export type Review = {
  id: string
  restaurant_id: string
  verdict: string
  body: string
  author: string
  published_at: string
}

export type Article = {
  id: string
  edition_slug: string
  slug: string
  kind: 'reportaje' | 'guia' | 'resena'
  title: string
  dek: string
  body: string
  author: string
  image_url: string | null
  sponsor_id: string | null
  sponsor_format: 'presentado' | 'colaboracion' | null
  published_at: string
}

export type ArticleWithSponsor = Article & { sponsor: Sponsor | null }
export type RestaurantWithReview = Restaurant & { review: Review | null }
