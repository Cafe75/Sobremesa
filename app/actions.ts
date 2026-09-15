'use server'

import { createClient, isSupabaseConfigured } from '@/lib/supabase/server'

export type FormState = { ok: boolean; message: string }

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

export async function subscribe(_: FormState, form: FormData): Promise<FormState> {
  const email = String(form.get('email') ?? '').trim().toLowerCase()
  const edition = String(form.get('edition') ?? '')
  if (!emailOk(email)) return { ok: false, message: 'Escribe un correo válido.' }
  if (isSupabaseConfigured()) {
    const supabase = await createClient()
    const { error } = await supabase.from('newsletter_subscribers').insert({ email, edition_slug: edition })
    if (error && error.code !== '23505') return { ok: false, message: 'No pudimos guardar tu correo. Intenta de nuevo.' }
  }
  return { ok: true, message: 'Listo, te llegará el próximo domingo.' }
}

export async function requestMediaKit(_: FormState, form: FormData): Promise<FormState> {
  const name = String(form.get('name') ?? '').trim()
  const company = String(form.get('company') ?? '').trim()
  const email = String(form.get('email') ?? '').trim().toLowerCase()
  const category = String(form.get('category') ?? 'otro')
  if (!name || !company) return { ok: false, message: 'Completa tu nombre y el de tu empresa.' }
  if (!emailOk(email)) return { ok: false, message: 'Escribe un correo de trabajo válido.' }
  if (isSupabaseConfigured()) {
    const supabase = await createClient()
    const { error } = await supabase.from('sponsor_leads').insert({ name, company, email, category })
    if (error) return { ok: false, message: 'No pudimos enviar tu solicitud. Intenta de nuevo.' }
  }
  return { ok: true, message: 'Recibimos tu solicitud. Te enviaremos el media kit en menos de dos días hábiles.' }
}
