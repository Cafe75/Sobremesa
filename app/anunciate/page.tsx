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
  return (
    <>
      <SiteHeader editions={editions} />
      <main>
        <div className="wrap" style={{ paddingTop: 64 }}>
          <span className="label">Anúnciate en Sobremesa</span>
          <h1 style={{ fontSize: 58, maxWidth: '18ch' }}>Llega a quienes cocinan y deciden en la gastronomía en español</h1>
          <p style={{ fontSize: 18, color: 'var(--muted)', margin: '20px 0 48px', maxWidth: '58ch' }}>
            Chefs, dueños de restaurantes y comensales exigentes, en {editions.filter((e) => e.is_active).map((e) => e.city).join(', ')} y pronto en más ciudades de habla hispana.
          </p>
          <div className="stats">
            <div className="stat"><div className="n">30%</div><div className="l">del área metropolitana de Houston habla español en casa</div></div>
            <div className="stat"><div className="n">3</div><div className="l">públicos en un solo medio: chefs, dueños y comensales</div></div>
            <div className="stat"><div className="n">{editions.length}</div><div className="l">ediciones planeadas</div></div>
          </div>
        </div>

        <div className="wrap" style={{ marginTop: 72 }}>
          <hr className="divider" />
          <h2 style={{ fontSize: 34, marginBottom: 28 }}>Tres formas de colaborar</h2>
          <div className="formats">
            {formats.map((f) => (
              <div className="box" key={f.name}>
                <h3 style={{ fontSize: 22 }}>{f.name}</h3>
                <p className="meta">{f.text}</p>
                <p className="price">{f.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="wrap" style={{ marginTop: 72 }}>
          <div className="two">
            <div>
              <h2 style={{ fontSize: 32, marginBottom: 14 }}>Nuestras reglas</h2>
              <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 19, lineHeight: 1.75, color: 'var(--muted)', maxWidth: '46ch' }}>
                Todo contenido pagado se identifica. Las reseñas y recomendaciones nunca están a la venta. Solo trabajamos con marcas que un buen cocinero querría tener en su cocina.
              </p>
            </div>
            <div className="box">
              <h3>Solicita el media kit</h3>
              <MediaKitForm />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
