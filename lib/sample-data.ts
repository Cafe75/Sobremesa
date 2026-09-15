import type { Article, Edition, Restaurant, Review, Sponsor } from './types'

// Datos ficticios para ver el sitio sin conectar Supabase.

export const editions: Edition[] = [
  { slug: 'houston', city: 'Houston', country: 'Estados Unidos', is_active: true },
  { slug: 'cdmx', city: 'Ciudad de México', country: 'México', is_active: false },
  { slug: 'bogota', city: 'Bogotá', country: 'Colombia', is_active: false },
  { slug: 'madrid', city: 'Madrid', country: 'España', is_active: false },
]

export const sponsors: Sponsor[] = [
  { id: 's1', name: 'Hornos Ceniza', tagline: 'Hornos de brasa para cocinas profesionales', url: null, category: 'equipo' },
  { id: 's2', name: 'Molino Real de Maíz', tagline: 'Maíz criollo nixtamalizado para restaurantes', url: null, category: 'insumos' },
]

export const restaurants: Restaurant[] = [
  {
    id: 'r3', edition_slug: 'houston', slug: 'la-ceiba', name: 'La Ceiba',
    cuisine: 'Cocina venezolana de autor', neighborhood: 'The Heights', price_level: 3,
    address: 'The Heights, Houston, TX', hours: 'Miércoles a domingo, 5 a 10 pm',
    good_for: 'Parejas y cenas tranquilas', reservation_url: null, image_urls: [], is_featured: false,
  },
  {
    id: 'r4', edition_slug: 'houston', slug: 'marea-alta', name: 'Marea Alta',
    cuisine: 'Mariscos del Golfo y cebichería', neighborhood: 'Upper Kirby', price_level: 3,
    address: 'Upper Kirby, Houston, TX', hours: 'Martes a domingo, 12 a 10 pm',
    good_for: 'Almuerzos largos', reservation_url: null, image_urls: [], is_featured: false,
  },
  {
    id: 'r1', edition_slug: 'houston', slug: 'maiz-y-brasa', name: 'Maíz y Brasa',
    cuisine: 'Cocina mexicana contemporánea', neighborhood: 'Montrose', price_level: 4,
    address: 'Westheimer Road, Montrose, Houston, TX', hours: 'Martes a sábado, 5:30 a 10:30 pm',
    good_for: 'Celebraciones y cenas en barra', reservation_url: null, image_urls: [], is_featured: false,
  },
  {
    id: 'r2', edition_slug: 'houston', slug: 'pampa-norte', name: 'Pampa Norte',
    cuisine: 'Parrilla argentina', neighborhood: 'River Oaks', price_level: 3,
    address: 'River Oaks, Houston, TX', hours: 'Todos los días, 5 a 11 pm',
    good_for: 'Cenas largas y grupos', reservation_url: null, image_urls: [], is_featured: true,
  },
]

export const reviews: Review[] = [
  {
    id: 'v1', restaurant_id: 'r1', author: 'Inés Robledo', published_at: '2026-09-05',
    verdict: 'La mejor tortilla de Houston se hace aquí cada tarde, con maíz criollo nixtamalizado en casa. El resto del menú casi está a la altura.',
    body: 'La chef creció entre Monterrey y Alief, y su cocina vive cómoda en ambos lugares. El menú de siete tiempos va de una tostada de huachinango curado en naranja agria a un mole negro que tarda tres días.\n\nReserve con dos semanas de anticipación para viernes y sábado, o pida la barra de ocho lugares, que guarda algunos espacios sin reservación.',
  },
]

export const articles: Article[] = [
  {
    id: 'a1', edition_slug: 'houston', slug: 'capital-cocina-latina', kind: 'reportaje',
    title: 'Houston ya es la capital de la cocina latina en Estados Unidos',
    dek: 'Chefs de Monterrey, Caracas y Bogotá están llevando la comida de su casa a los mejores comedores de la ciudad.',
    body: 'Pregúntale a alguien de Houston dónde comer y la respuesta casi nunca viene con código de vestimenta. Viene con una dirección, un plato que hay que pedir y el nombre de quien lo cocina.\n\nLo que cambió no es la comida, que lleva décadas siendo extraordinaria, sino quién la cocina y dónde.',
    author: 'Inés Robledo', image_url: '/images/taco-portada.jpg', sponsor_id: null, sponsor_format: null, published_at: '2026-09-12',
  },
  {
    id: 'a6', edition_slug: 'houston', slug: 'grupo-alpha-llega-a-houston', kind: 'reportaje',
    title: 'Grupo Alpha, el gigante mexicano de los hornos para panadería, llega a Houston',
    dek: 'Con medio siglo de historia y más de 25,000 hornos instalados en Latinoamérica, la empresa detrás de Zucchelli Alpha prepara oficinas en Texas.',
    body: 'En muchas panaderías de México y Centroamérica hay un horno que lleva décadas encendido sin descanso, y con frecuencia tiene el mismo logotipo. Grupo Alpha, la empresa detrás de Zucchelli Alpha y de las marcas Zucchelli Forni y Alpha Simet, prepara ahora su llegada a Houston con oficinas propias en la ciudad.\n\nLa historia empezó en México en agosto de 1974. Su primera salida del país fue a Guatemala en 1998, y desde 2017 abrió operaciones en Costa Rica, El Salvador, República Dominicana, Colombia y Perú. En México cuenta con nueve sucursales, de Tijuana a Cancún, pasando por Monterrey, Guadalajara y la capital. Estados Unidos es el siguiente paso que la propia empresa ya anunciaba en su sitio web.\n\nSu catálogo cubre casi todo lo que necesita una cocina profesional: hornos, amasadoras y laminadoras para panadería y repostería, equipo para gastronomía, heladería y cafetería, refrigeración y mobiliario de acero inoxidable. Entre sus equipos más compactos está el Mini Combo de Zucchelli, que reúne horno y cámara de fermentación en un solo mueble, pensado para panaderías y cafeterías con poco espacio. También diseña proyectos completos, desde cocinas comerciales hasta comisariatos. La compañía asegura haber instalado más de 25,000 hornos, algunos con más de treinta años de servicio continuo, y afirma que sus equipos consumen la mitad de energía que los convencionales.\n\nPara quien tiene un restaurante, lo que más pesa no es el horno sino lo que pasa cuando falla un sábado por la mañana. Ahí Grupo Alpha tiene su mejor argumento: más de cien técnicos en su red, un servicio postventa propio llamado Euromex y chefs certificados que capacitan a los equipos de cocina para aprovechar cada máquina.\n\nLa apuesta por Houston tiene lógica. Es una de las ciudades con más panaderías mexicanas, cafeterías latinas y cocinas de autor latinoamericanas de Estados Unidos, y muchos de sus dueños conocen la marca desde sus países de origen. Una oficina local podría significar refacciones, instalación y soporte técnico en español, sin depender de importaciones ni de intermediarios.\n\nLa empresa todavía no ha detallado públicamente la fecha de apertura ni la ubicación de sus oficinas en Texas. En Sobremesa seguiremos de cerca su llegada, porque pocas marcas de equipo conocen tan bien la manera en que cocina Latinoamérica.',
    author: 'Redacción Sobremesa', image_url: '/images/grupo-alpha-horno.jpg', sponsor_id: null, sponsor_format: null, published_at: '2026-09-11',
  },
  {
    id: 'a2', edition_slug: 'houston', slug: 'fuego-vivo', kind: 'guia',
    title: 'Los 10 mejores restaurantes de fuego vivo en Houston',
    dek: 'Parrillas argentinas, asadores mexicanos y hornos de leña donde la brasa es la protagonista.',
    body: 'En Houston la carne asada nunca fue una moda: es una costumbre de domingo. Lo nuevo es que una generación de cocineros latinos está tratando el fuego con precisión de alta cocina.\n\nVisitamos cada lugar al menos dos veces y pagamos todas las comidas. La marca que presenta esta guía no participó en la selección.',
    author: 'Marcus Greene', image_url: null, sponsor_id: 's1', sponsor_format: 'presentado', published_at: '2026-09-10',
  },
  {
    id: 'a4', edition_slug: 'houston', slug: 'arepas-de-verdad', kind: 'guia',
    title: 'Dónde comer arepas, cachapas y pabellón de verdad',
    dek: 'La diáspora venezolana convirtió a Houston en una de sus mejores mesas fuera de casa.',
    body: 'Hace diez años había que manejar media hora para encontrar una arepa decente.\n\nHoy la conversación es otra.',
    author: 'Ana Beltrán', image_url: null, sponsor_id: null, sponsor_format: null, published_at: '2026-09-07',
  },
  {
    id: 'a5', edition_slug: 'houston', slug: 'cebiche-golfo', kind: 'reportaje',
    title: 'El cebiche peruano descubre el pescado del Golfo',
    dek: 'Cocineros limeños están cambiando la corvina por huachinango y los resultados sorprenden.',
    body: 'El limón tiene que ser ácido, el pescado tiene que ser del día.\n\nLo demás es conversación.',
    author: 'Marcus Greene', image_url: null, sponsor_id: null, sponsor_format: null, published_at: '2026-09-05',
  },
  {
    id: 'a3', edition_slug: 'houston', slug: 'origen-del-plato-1', kind: 'reportaje',
    title: 'El origen del plato: los productores detrás de la cocina latina de Houston',
    dek: 'De la milpa a la mesa, la historia de quienes abastecen las mejores cocinas de la ciudad.',
    body: 'Antes de llegar al comal, el maíz recorre un camino largo.\n\nEsta serie cuenta ese camino.',
    author: 'Inés Robledo', image_url: null, sponsor_id: 's2', sponsor_format: 'colaboracion', published_at: '2026-09-08',
  },
]
