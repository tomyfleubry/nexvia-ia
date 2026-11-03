---
name: Nexvia IA — Muestras navegables
description: La ruta de marca conecta servicios, ejemplos y diagnóstico.
colors:
  ink: "#0A243E"
  blue: "#1E6BFF"
  teal: "#2DD4BF"
  bg: "#F6F8FB"
  surface: "#FFFFFF"
  surface-2: "#EDF2F8"
  text: "#22364C"
  muted: "#54687E"
  line: "#D9E3EE"
  dark-bg: "#081A2E"
  dark-surface: "#0C2745"
  dark-surface-2: "#0A2138"
  dark-text: "#DCE8F5"
  dark-muted: "#9DB2C8"
  dark-line: "#1D3B5C"
  whatsapp: "#25D366"
  whatsapp-action: "#147A3D"
  whatsapp-hover: "#106331"
  teal-ink: "#0B7C6E"
  blue-dark: "#1553CC"
  ink-2: "#0E2F52"
  dark-link: "#9DC3FF"
typography:
  display:
    fontFamily: "Sora, sans-serif"
    fontSize: "50px"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-.025em"
  headline:
    fontFamily: "Sora, sans-serif"
    fontSize: "40px"
    fontWeight: 700
    lineHeight: 1.18
  title:
    fontFamily: "Sora, sans-serif"
    fontSize: "23px"
    fontWeight: 700
    lineHeight: 1.26
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "16.5px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  card: "22px"
  panel: "28px"
  pill: "999px"
  circle: "50%"
spacing:
  container: "1160px"
  mobile-inset: "20px"
  section: "96px"
  section-mobile: "68px"
  anchor: "92px"
components:
  button-primary:
    backgroundColor: "{colors.whatsapp-action}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "13px 24px"
  button-example:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  filter:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "11px 21px"
  filter-selected:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.surface}"
  example-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.card}"
  whatsapp-floating:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.surface}"
    rounded: "{rounded.circle}"
    width: "58px"
    height: "58px"
---

# Design System: Nexvia IA

## Overview

**Creative North Star: "La ruta hacia tu siguiente paso"**

La ruta turquesa del hero se dibuja al entrar y reaparece como conexión entre las tres etapas. La identidad existente sigue siendo la autoridad: petróleo, azul y turquesa, logo actual y Sora con Inter. La página suma demostración concreta mediante siete muestras navegables.

La referencia [MotionSites](https://motionsites.ai/) se usa por su lógica de biblioteca visual, filtros y piezas de distinta escala. Los efectos pedidos se interpretan de forma ligera con CSS y el JavaScript nativo existente: no se copian textos, imágenes ni implementaciones de la referencia.

**Key Characteristics:**
- Hero de marca con ruta SVG y énfasis azul–turquesa.
- Servicios bento; Agentes de IA destacado con conversación ilustrativa.
- Catálogo por rubro con fotos reales de los heroes dentro de ventanas de navegador.
- Proceso conectado, contacto en panel translúcido y wordmark de fondo.
- Paridad entre modo claro y oscuro; movimiento reducido completo.

## Colors

### Primary
- **Azul Nexvia** ({colors.blue}): selección de filtros, botones de ejemplo y acentos de interacción.
- **Turquesa de ruta** ({colors.teal}): ruta, conexiones y foco sobre superficies oscuras.

### Secondary
- **Verde WhatsApp** ({colors.whatsapp}): flotante de58px con símbolo blanco. Las acciones usan {colors.whatsapp-action}, con hover {colors.whatsapp-hover} para mantener contraste blanco.
- **Acentos de lectura** ({colors.teal-ink}, {colors.blue-dark}, {colors.dark-link}): tildes claras, hover azul y enlaces legibles en modo oscuro.
- **Petróleo secundario** ({colors.ink-2}): franja de datos existente.

### Neutral
- **Petróleo** ({colors.ink}): hero, agente destacado, banda de diagnóstico, contacto y footer.
- **Fondo y papel** ({colors.bg}, {colors.surface}, {colors.surface-2}): bloques claros y catálogo.
- **Lectura** ({colors.text}, {colors.muted}, {colors.line}): texto, apoyo y divisores del modo claro.
- **Noche** ({colors.dark-bg}, {colors.dark-surface}, {colors.dark-surface-2}): superficies equivalentes del modo oscuro.
- **Lectura nocturna** ({colors.dark-text}, {colors.dark-muted}, {colors.dark-line}): textos y bordes sin invertir imágenes.

**The Same Brand Rule.** Los temas cambian la superficie y el contraste, nunca el logo ni las capturas de los ejemplos.

## Typography

Sora500/600/700/800 para marca, titulares y nombres de muestras; Inter400/500/600/700 para lectura. Se conserva el enlace Google Fonts existente.

Hero hasta 50px, móvil 34px; H2 hasta 40px / 30px. Los títulos de ejemplos usan Sora 23px / 700 / 1.26 y pasan a 24px en móvil. Los servicios usan 21px / 700 / 1.3; Agentes de IA destacado usa 27px, o 25px en móvil. Texto general 16.5px, introducciones 18px y metadatos 13–15px. Tracking mínimo -.025em en titulares; cifras tabulares. Los textos comerciales, listas y datos se conservan; solo se actualizan funciones antiguas de muestras, con autorización de Tomas.

## Layout

Contenedor1160px y margen lateral20px. Ritmo de96px entre bloques,68px móvil. Header fijo72px; scroll-margin-top92px. Menú móvil hasta1080px para admitir el enlace Ejemplos sin comprimir la navegación.

La cinta va inmediatamente después del hero. La sección Ejemplos se ubica después de Servicios y antes de Cómo trabajo. Se mantienen también los bloques actuales de problemas, fundador y preguntas.

Servicios: grilla de tres columnas, Agentes ocupa dos y contiene texto más mini-chat; las cuatro restantes son estándar. Dos columnas en tablet y una en móvil. Ejemplos: tres columnas en escritorio, dos en tablet, una a430px. Todas las tarjetas conservan el mismo orden bajo cada filtro.

## Elevation & Depth

El vidrio se limita a la insignia del hero y al panel de contacto pedido en el brief. Blur12px /16px, con respaldo de color sólido translúcido si no está disponible. Sin video ni fondos de reproducción automática.

Las muestras se separan por un borde, no por sombra en reposo. Hover eleva3px y acerca levemente la foto. El flotante conserva sombra suave 0 8px 24px rgba(0,0,0,.22).

## Shapes

Ventanas de ejemplos22px, barra superior fina y tres puntos decorativos; panel de contacto28px; cápsulas para acciones y filtros; círculos para hitos y WhatsApp. El encuadre mantiene fotos sin deformación.

## Components

### Hero y cinta
Mismos textos, foto incrustada y geometría de ruta existentes. Se dibuja el path una vez al cargar; énfasis de titular con degradado muy suave. La insignia adopta vidrio. Cinta lenta con ocho rubros, duplicado oculto a lectores de pantalla y control de pausa. Sin JS o movimiento reducido, queda estática.

### Servicios bento
Cinco tarjetas y sus listas originales. Agentes se presenta primero en una celda doble, con mini-chat rotulado Conversación ilustrativa. No es atención real, testimonio ni dato de cliente. El resto de la página conserva sus bloques y copy.

### Catálogo de ejemplos
Filtros nativos con aria-pressed; estado anunciado y tarjetas hidden fuera de selección. Sin JS se muestran las siete. El recorte de cada hero se obtiene en navegador a430px, se optimiza en WebP y se incrusta en base64. Ventana con zoom al hover, foco y toque; botón Ver el ejemplo en pestaña nueva. No se incorporan fotos de otros sitios.

### Proceso y contacto
Tres pasos actuales, números con degradado de marca y conector que se revela al llegar a la sección. Panel de contacto petróleo con fondo azul/turquesa suave, vidrio y textos originales. Correo, Instagram y WhatsApp intactos; sin formularios.

### WhatsApp
Un símbolo i-wa de viewBox24 con el path literal del brief. Usos de20px en botones,28px en flotante verde58px. Blanco sobre botones oscuros o verdes; sin stroke. Se conserva el mensaje de diagnóstico existente. La banda nueva lo reutiliza.

### Movimiento y accesibilidad
Reveal coordinado600ms, demoras escalonadas hasta180ms. Brillo discreto en hover y foco. Cinta44s, pausada por control, hover y foco. Proceso850ms; ruta1400ms. Todo se desactiva con prefers-reduced-motion; contenido visible aunque falle JS. Foco visible, selección y scrollbars desde la paleta. Se verifican claro/oscuro y móvil/escritorio en una misma tanda.

## Do's and Don'ts

### Do:
- **Do** conservar los textos comerciales, canales y mensajes existentes.
- **Do** describir las funciones actuales de cada muestra.
- **Do** conservar un único HTML de ejecución con imágenes incrustadas.
- **Do** verificar siete destinos200, filtros y anclas en ambos temas.

### Don't:
- **Don't** agregar clientes, cifras, promesas, precios o testimonios.
- **Don't** presentar la conversación ilustrativa como atención real.
- **Don't** introducir video de fondo, librerías pesadas o formulario.
- **Don't** redibujar el símbolo de WhatsApp ni cambiar contactos.

## Fotografías y procedencia

Las imágenes originales incrustadas del sitio se conservan sin sustituciones. Se mantienen sus textos legales y el crédito a Unsplash.

Las siete imágenes nuevas son capturas propias de los heroes publicados de Nexvia, renderizadas a430px y recortadas desde sus contenedores visuales. Fuentes: demo-vidriera-peluqueria (cover-photo), veterinaria (clinical-photo), cafe (hero-media), tatuajes (hero-photo), dental (hero-photo), estetica (hero-photo), unas (hero-collage), en https://tomyfleubry.github.io/. El material subyacente y sus licencias se conservan en los repos respectivos. Se trata de muestras ficticias.

Antes de editar HTML se verificaron los siete destinos con200 y se eligieron estos recortes. No se descargaron fotos nuevas de bancos ni de MotionSites.

## Verificación final

El HTML conserva los textos, listas, cinco servicios, tres pasos, preguntas, imágenes originales y enlaces de contacto del commit8773c35. La sección nueva contiene siete muestras; los filtros producen4Belleza,2Salud,1Gastronomía y7Todos. Se corrigieron las menciones antiguas de funciones con autorización de Tomas.

Se verificaron claro y oscuro en1440,1024,768,430 y390px: sin overflow, errores de ejecución ni imágenes rotas; anclas libres, filtros, zoom, menú, FAQ y movimiento reducido operativos. Los botones de acción tienen contraste mínimo4.5:1; los enlaces de problemas y el crédito del pie se aclararon en modo oscuro. Flotante58px/ícono28px, blanco sobreverde#25D366; path único literal del brief. Se conserva el runtime de un solo archivo y no se agregan librerías.

Las capturas de revisión de páginas móviles largas se componen desde viewports reales para evitar el límite de rasterización de la captura completa del navegador. No modifica la web ni sus imágenes. El mini-chat permanece rotulado como ilustrativo.
