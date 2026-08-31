# Nivii web

Sitio **institucional** de Nivii. Next 15 (App Router) + Tailwind 4 + next-intl (en/es/pt).
El producto es otra cosa y vive en otro repo (`../wald-face`, la app de `app.nivii.ai`).

Que sea institucional define casi todas las decisiones: acá el contenido manda. Casi nada tiene que ser interactivo, casi nada tiene que ser cliente, y una página que carga rápido y se indexa bien vale más que cualquier feature. Si una sección se puede resolver con HTML y CSS, se resuelve con HTML y CSS.

## SSR siempre

- **Componentes de servidor por defecto.** `"use client"` sólo cuando hay estado, efectos o handlers del navegador. Hoy son 8 archivos; el noveno se justifica.
- Para animar sin volver cliente el componente: `import * as motion from "motion/react-client"`.
- Traducciones: `getTranslations` / `getMessages` de `next-intl/server` en servidor, `useTranslations` sólo en componentes cliente.
- Nada de traer datos con `useEffect`. Los envíos van por server actions en `src/actions`.

## Simplicidad

- Antes de sumar una dependencia, agotar lo que ya hay: `motion`, `lucide-react`, `clsx` + `tailwind-merge`, Radix (accordion, dialog).
- Sin state managers, sin librerías de formularios, sin librerías de fetching.
- No abstraer hasta el tercer uso. Un poco de repetición es más barata que la abstracción equivocada.
- Preferir la solución aburrida. Si hace falta explicar por qué algo es ingenioso, no va.

## Comentarios

Pocos y útiles, al estilo clean code: los nombres hacen el trabajo. Se comenta **por qué**, nunca **qué**.
Nada de comentarios que repiten el nombre de la función, ni JSDoc decorativo, ni encabezados de sección.

## Convenciones del repo

- Archivos en kebab-case, componentes en PascalCase, **named exports** (nada de `export default` salvo lo que Next exige).
- `src/components/home/` las secciones de la home, `src/components/ui/` las primitivas reusables, `src/icons/` los SVG propios.
- Secciones: `<section id="..." className="py-16 scroll-m-28">`. El `scroll-m-28` compensa el header fijo — si se saca, los anchors quedan tapados.
- `Link` viene de `@/i18n/navigation`, **nunca** de `next/link`: es lo que mantiene el prefijo de idioma.
- Clases condicionales con `cn()` de `@/lib/utils`.
- Iconos de `lucide-react`.
- `next/image` siempre con `width` y `height` explícitos.
- Assets por idioma: `/nombre_${locale}.ext`.

## Contenido e i18n

- **Ningún texto hardcodeado en JSX.** Todo a `messages/{en,es,pt}.json`.
- Los tres archivos quedan en sync. Si falta una traducción se agrega igual, no se deja la clave afuera.
- Los datos estructurados (equipo, posiciones abiertas) viven en `messages` y se leen con `getMessages()`.

## Accesibilidad y movimiento

- **Nada depende de JS para ser visible.** Hoy `#product`, `#use-cases` y `#team` quedan en `opacity: 0` sin JS: es un bug, no un patrón a copiar. Las animaciones de entrada degradan a contenido visible.
- Respetar `prefers-reduced-motion`.
- Animar sólo `transform` y `opacity`.

## Antes de dar algo por terminado

```bash
npm run lint
npm run type-check
```

**No correr `npm run build` con el dev server levantado**: los dos escriben en `.next` y el dev server queda roto (`Cannot find module for page`). Para verificar que algo anda, mirar el dev server, no buildear.
