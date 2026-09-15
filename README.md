# Sobremesa

La guía gastronómica de alta gama en español. Primera edición: Houston.

Hecho con Next.js y Supabase. Proyecto independiente, no comparte código ni base de datos con otros proyectos.

## Qué incluye

| Página | Ruta |
|---|---|
| Inicio de la edición | `/houston` |
| Artículo o guía | `/houston/guias/[slug]` |
| Ficha de restaurante | `/houston/restaurantes/[slug]` |
| Anúnciate | `/anunciate` |

Cada edición (país o ciudad) vive en la tabla `editions`. Para abrir una nueva, se agrega la fila con `is_active = true` y su contenido.

## Probarlo en tu computadora

Necesitas Node.js 20 o superior.

```bash
npm install
npm run dev
```

Abre http://localhost:3000. Sin configurar nada, el sitio usa datos de ejemplo de `lib/sample-data.ts`.

## Conectar Supabase

1. Crea un proyecto nuevo en supabase.com (no reutilices el de otro proyecto).
2. En SQL Editor, ejecuta `supabase/schema.sql` y, si quieres datos de prueba, `supabase/seed.sql`.
3. Copia `.env.example` como `.env.local` y pega la URL y la clave `anon` del proyecto (Project Settings > API).
4. Reinicia `npm run dev`.

Nunca subas `.env.local` a GitHub ni uses la clave `service_role` en este proyecto.

## Publicar contenido

Al inicio, el equipo puede publicar desde el Table Editor de Supabase:

- **Artículos y guías:** tabla `articles`. Los párrafos del cuerpo se separan con una línea en blanco. Una fecha futura en `published_at` programa la publicación.
- **Patrocinios:** crea la marca en `sponsors` y en el artículo completa `sponsor_id` y `sponsor_format` (`presentado` o `colaboracion`). La etiqueta y la nota de transparencia aparecen solas.
- **Restaurantes:** tabla `restaurants`. Las fotos se suben a Supabase Storage y se pegan sus URL en `image_urls`. `is_featured` marca un espacio pagado y siempre se muestra como "Destacado".
- **Reseñas:** tabla `reviews`, separada de los restaurantes.
- **Formularios:** los suscriptores llegan a `newsletter_subscribers` y las solicitudes de marcas a `sponsor_leads`.

## Subir a GitHub

```bash
git init
git add .
git commit -m "Primera versión de Sobremesa"
git branch -M main
git remote add origin https://github.com/Cafe75/sobremesa.git
git push -u origin main
```

Antes, crea el repositorio vacío `sobremesa` en GitHub (privado).

## Publicar en internet

La forma más simple es Vercel: importa el repositorio, agrega las dos variables de entorno y publica.
