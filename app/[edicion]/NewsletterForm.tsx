'use client'

import { useActionState } from 'react'
import { subscribe, type FormState } from '@/app/actions'

export function NewsletterForm({ edition }: { edition: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(subscribe, { ok: false, message: '' })
  if (state.ok) return <p className="success">{state.message}</p>
  return (
    <form action={action}>
      <input type="hidden" name="edition" value={edition} />
      <input className="field" type="email" name="email" required placeholder="tu@correo.com" aria-label="Correo electrónico" />
      <button className="btn dark" disabled={pending}>{pending ? 'Enviando…' : 'Suscribirme'}</button>
      {state.message && <p className="error" role="alert">{state.message}</p>}
    </form>
  )
}
