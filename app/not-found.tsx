import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="wrap narrow" style={{ padding: '120px 32px', textAlign: 'center' }}>
      <h1 style={{ fontSize: 52 }}>Esta mesa no está servida</h1>
      <p className="meta" style={{ fontSize: 16, margin: '18px 0 28px' }}>
        La página que buscas cambió de lugar o ya no existe.
      </p>
      <Link href="/" className="btn dark">Volver al inicio</Link>
    </main>
  )
}
