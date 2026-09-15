-- Datos de ejemplo ficticios. Bórralos antes de lanzar.

insert into editions (slug, city, country, is_active) values
  ('houston', 'Houston', 'Estados Unidos', true),
  ('cdmx', 'Ciudad de México', 'México', false),
  ('bogota', 'Bogotá', 'Colombia', false),
  ('madrid', 'Madrid', 'España', false);

with s as (
  insert into sponsors (name, tagline, category) values
    ('Hornos Ceniza', 'Hornos de brasa para cocinas profesionales', 'equipo')
  returning id
)
insert into articles (edition_slug, slug, kind, title, dek, body, author, sponsor_id, sponsor_format)
select 'houston', 'fuego-vivo', 'guia',
  'Los 10 mejores restaurantes de fuego vivo en Houston',
  'Parrillas argentinas, asadores mexicanos y hornos de leña donde la brasa es la protagonista.',
  E'En Houston la carne asada nunca fue una moda: es una costumbre de domingo.\n\nVisitamos cada lugar al menos dos veces y pagamos todas las comidas.',
  'Marcus Greene', s.id, 'presentado'
from s;

insert into articles (edition_slug, slug, kind, title, dek, body, author) values
  ('houston', 'capital-cocina-latina', 'reportaje',
   'Houston ya es la capital de la cocina latina en Estados Unidos',
   'Chefs de Monterrey, Caracas y Bogotá están llevando la comida de su casa a los mejores comedores de la ciudad.',
   E'Pregúntale a alguien de Houston dónde comer y la respuesta casi nunca viene con código de vestimenta.\n\nLo que cambió es quién cocina y dónde.',
   'Inés Robledo');

with r as (
  insert into restaurants (edition_slug, slug, name, cuisine, neighborhood, price_level, address, hours, good_for)
  values ('houston', 'maiz-y-brasa', 'Maíz y Brasa', 'Cocina mexicana contemporánea', 'Montrose', 4,
          'Westheimer Road, Montrose, Houston, TX', 'Martes a sábado, 5:30 a 10:30 pm', 'Celebraciones y cenas en barra')
  returning id
)
insert into reviews (restaurant_id, verdict, body, author)
select r.id,
  'La mejor tortilla de Houston se hace aquí cada tarde, con maíz criollo nixtamalizado en casa.',
  E'El menú de siete tiempos va de una tostada de huachinango a un mole negro que tarda tres días.\n\nReserve con dos semanas de anticipación.',
  'Inés Robledo'
from r;
