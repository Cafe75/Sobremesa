import { createClient, isSupabaseConfigured } from './supabase/server'
import * as sample from './sample-data'
import type { ArticleWithSponsor, Edition, RestaurantWithReview } from './types'

export async function getEditions(): Promise<Edition[]> {
  if (!isSupabaseConfigured()) return sample.editions
  const supabase = await createClient()
  const { data } = await supabase.from('editions').select('*').order('is_active', { ascending: false })
  return data ?? []
}

export async function getEdition(slug: string): Promise<Edition | null> {
  const all = await getEditions()
  return all.find((e) => e.slug === slug && e.is_active) ?? null
}

export async function getArticles(edition: string): Promise<ArticleWithSponsor[]> {
  if (!isSupabaseConfigured()) {
    return sample.articles
      .filter((a) => a.edition_slug === edition)
      .map((a) => ({ ...a, sponsor: sample.sponsors.find((s) => s.id === a.sponsor_id) ?? null }))
  }
  const supabase = await createClient()
  const { data } = await supabase
    .from('articles')
    .select('*, sponsor:sponsors(*)')
    .eq('edition_slug', edition)
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
  return (data as ArticleWithSponsor[]) ?? []
}

export async function getArticle(edition: string, slug: string): Promise<ArticleWithSponsor | null> {
  const list = await getArticles(edition)
  return list.find((a) => a.slug === slug) ?? null
}

export async function getRestaurant(edition: string, slug: string): Promise<RestaurantWithReview | null> {
  if (!isSupabaseConfigured()) {
    const r = sample.restaurants.find((x) => x.edition_slug === edition && x.slug === slug)
    if (!r) return null
    return { ...r, review: sample.reviews.find((v) => v.restaurant_id === r.id) ?? null }
  }
  const supabase = await createClient()
  const { data } = await supabase
    .from('restaurants')
    .select('*, review:reviews(*)')
    .eq('edition_slug', edition)
    .eq('slug', slug)
    .maybeSingle()
  if (!data) return null
  const reviews = (data as { review: RestaurantWithReview['review'][] }).review ?? []
  return { ...(data as RestaurantWithReview), review: reviews[0] ?? null }
}

export async function getRestaurants(edition: string) {
  if (!isSupabaseConfigured()) return sample.restaurants.filter((r) => r.edition_slug === edition)
  const supabase = await createClient()
  const { data } = await supabase.from('restaurants').select('*').eq('edition_slug', edition).order('name')
  return data ?? []
}

export function priceLabel(level: number) {
  return '$'.repeat(level)
}

export function formatDate(iso: string) {
  return new Date(iso + (iso.length === 10 ? 'T12:00:00' : '')).toLocaleDateString('es', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}
