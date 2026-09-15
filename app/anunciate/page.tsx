import type { Metadata } from 'next'
import { getEditions } from '@/lib/data'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { MediaKitForm } from './MediaKitForm'

export const metadata: Metadata = { title: 'Anúnciate' }

const formats = [
  { name: 'Guía presentada', text: 'Tu marca presenta una guía ligada a tu producto, como fuego vivo para hornos o panaderías para harinas.', price: 'Desde 3,500 dólares' },
  { name: 'Boletín patrocinado', text: 'Espacio principal en La mesa del domingo durante cuatro ediciones.', price: 'Desde 1,800 dólares' },
  { name: 'Serie de contenido', text: 'Reportajes y videos sobre el origen de los ingredientes o el oficio en la cocina.', price: 'Desde 9,000 dólares' },
]

export default async function Advertise() {
  const editions = await getEditions()
  const active = editions.filter((e) => e.is_active).map((e) => e.city).join(', ')
  return (
    <>
      <SiteHeader editions={editions} dark />
      <main>
        <section className="ad-hero">
          <div className="wrap">
            <span className="kicker">Para marcas de equipo, insumos y distribución</span>
            <h1>Llega a quienes cocinan y deciden</h1>
            <p>Chefs, dueños de restaurantes y comensales exigentes en {active}, y pronto en más ciudades de habla hispana.</p>
            <div className="stats">
              <div className="stat"><div className="n">30%</div><div className="l">del área metropolitana de Houston habla español en casa</div></div>
              <div className="stat"><div className="n">3</div><div className="l">públicos en un solo medio: chefs, dueños y comensales</div></div>
              <div className="stat"><div className="n">{editions.length}</div><div className="l">ediciones planeadas en ciudades de habla hispana</div></div>
            </div>
          </div>
        </section>

        <section className="wrap section">
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', marginBottom: 32 }}>Tres formas de colaborar</h2>
          <div className="formats">
            {formats.map((f) => (
              <div key={f.name}>
                <h3>{f.name}</h3>
                <p className="meta" style={{ fontSize: 15 }}>{f.text}</p>
                <p className="price">{f.price}</p>
              </div>
            ))}
          </div>
          <p className="meta" style={{ marginTop: 14 }}>Precios sugeridos.</p>
        </section>

        <section className="wrap section" style={{ paddingBottom: 96 }}>
          <div className="two">
            <div>
              <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', marginBottom: 20 }}>Nuestras reglas</h2>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 19, lineHeight: 1.65, color: 'var(--muted)', maxWidth: '40ch' }}>
                Todo contenido pagado se identifica. Las reseñas y recomendaciones nunca están a la venta. Solo trabajamos con marcas que un buen cocinero querría tener en su cocina.
              </p>
            </div>
            <div className="box">
              <h3>Solicita el media kit</h3>
              <MediaKitForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
