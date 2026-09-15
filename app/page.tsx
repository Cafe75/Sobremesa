import { redirect } from 'next/navigation'
import { getEditions } from '@/lib/data'

export default async function Root() {
  const editions = await getEditions()
  const first = editions.find((e) => e.is_active)
  redirect(`/${first?.slug ?? 'houston'}`)
}
