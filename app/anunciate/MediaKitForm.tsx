'use client'

import { useActionState } from 'react'
import { requestMediaKit, type FormState } from '@/app/actions'

export function MediaKitForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(requestMediaKit, { ok: false, message: '' })
  if (state.ok) return <p className="success">{state.message}</p>
  return (
    <form action={action}>
      <label className="lb" htmlFor="name">Nombre</label>
      <input id="name" name="name" className="field" placeholder="Laura Méndez" required />
      <label className="lb" htmlFor="company">Empresa</label>
      <input id="company" name="company" className="field" placeholder="Nombre de tu empresa" required />
      <label className="lb" htmlFor="email">Correo de trabajo</label>
      <input id="email" name="email" type="email" className="field" placeholder="laura@empresa.com" required />
      <label className="lb" htmlFor="category">Tipo de empresa</label>
      <select id="category" name="category" className="field" defaultValue="equipo">
        <option value="equipo">Equipo de cocina</option>
        <option value="insumos">Materia prima e insumos</option>
        <option value="distribucion">Distribución</option>
        <option value="otro">Otro</option>
      </select>
      {state.message && <p className="error" role="alert">{state.message}</p>}
      <button className="btn dark" style={{ width: '100%', marginTop: 18 }} disabled={pending}>
        {pending ? 'Enviando…' : 'Enviarme el media kit'}
      </button>
    </form>
  )
}
