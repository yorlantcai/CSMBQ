# Guía de Mantenimiento — Clínica San Martín Web

## Cómo subir el logo real

1. Tomar el archivo PNG original del logo (fondo transparente recomendado)
2. Renombrarlo como `logo.png`
3. Copiarlo a la carpeta `public/` del proyecto
4. El logo aparecerá automáticamente en: Navbar, Footer y sección Nosotros
5. Si tienes versión @2x (retina), colocarla como `public/logo@2x.png`

> ⚠️ El logo `public/logo-placeholder.svg` es solo un marcador temporal.
> Una vez colocado `logo.png`, el placeholder ya no se usará.

---

## Cómo cambiar banners / imágenes de fondo

Las imágenes de fondo actuales son **gradientes CSS** (no archivos de imagen).
Para reemplazarlos con fotos reales:

### Hero (pantalla principal)

En `src/pages/Home/sections/Hero.tsx`, reemplaza el fondo CSS:

```tsx
// ANTES — gradiente CSS
className="... bg-hero-gradient"

// DESPUÉS — imagen real
className="... bg-cover bg-center bg-no-repeat"
style={{ backgroundImage: 'url(/images/hero-clinica.jpg)' }}
```

Coloca la imagen en: `public/images/hero-clinica.jpg`  
Tamaño recomendado: **1920×1080px mínimo, WebP optimizado**

### Sección Nosotros

En `src/pages/Home/sections/About.tsx`, busca el div con `bg-gradient-to-br from-clinic-800` y reemplaza con una imagen:

```tsx
// Reemplazar el bloque de gradiente por:
<img
  src="/images/clinica-fachada.jpg"
  alt="Fachada Clínica San Martín"
  className="absolute inset-0 w-full h-full object-cover"
/>
```

---

## Cómo subir documentos al servidor

Para que los documentos (tarifas, folletos, formularios) sean descargables desde la web:

1. Subir los PDFs a `public/documents/`
2. Crear un enlace en la sección correspondiente:

```tsx
<a href="/documents/tarifas-2025.pdf" target="_blank" rel="noopener noreferrer">
  Descargar tarifas
</a>
```

---

## Cómo agregar una nueva especialidad

En `src/constants/index.ts`, en el array `SPECIALTIES`, agregar al final:

```ts
{
  id: 'dermatologia',           // ID único, sin espacios ni tildes
  icon: 'Sparkles',             // Nombre del ícono en Lucide: lucide.dev/icons
  title: 'Dermatología',
  description: 'Diagnóstico y tratamiento de enfermedades de la piel, cabello y uñas.',
},
```

Para encontrar íconos disponibles: https://lucide.dev/icons

---

## Cómo agregar un nuevo servicio

En `src/constants/index.ts`, en el array `SERVICES`, agregar:

```ts
{
  id: 'rehabilitacion',
  icon: 'Dumbbell',            // Ícono Lucide
  title: 'Rehabilitación',
  description: 'Descripción del servicio...',
  features: ['Característica 1', 'Característica 2', 'Característica 3'],
},
```

---

## Cómo actualizar las URLs de resultados médicos

En `src/constants/index.ts`:

```ts
export const RESULT_PORTALS: ResultPortal[] = [
  {
    id: 'laboratorio',
    url: 'http://NUEVA-URL-LABORATORIO/resultados',   // ← actualizar
    ...
  },
  {
    id: 'imagenes',
    url: 'https://NUEVA-URL-IMAGENES/login',          // ← actualizar
    ...
  },
]
```

---

## Cómo cambiar el mapa de Google Maps

En `src/pages/Home/sections/Contact.tsx`, buscar el `<iframe>` y cambiar el `src`:

```
Opción recomendada — usar Google Maps Embed API:
https://www.google.com/maps/embed/v1/place?key=TU_API_KEY&q=NOMBRE+CLINICA+BARRANQUILLA

Opción simple (sin API key):
https://maps.google.com/maps?q=Clinica+San+Martin+Barranquilla&output=embed
```

---

## Ciclo de deploy en GoDaddy

```bash
# 1. Hacer cambios en el código
# 2. Generar build
npm run build

# 3. Subir contenido de /dist/ a public_html/ del hosting
#    (usando FileZilla, cPanel File Manager, o CI/CD)
# 4. Verificar que .htaccess esté en la raíz
```

**Archivos que SIEMPRE deben estar en public_html:**
- `index.html`
- `.htaccess`
- `assets/` (carpeta completa)
- `logo.png`
- `robots.txt`
- `sitemap.xml`

---

## Actualizar sitemap.xml

Cada vez que se agreguen páginas o secciones importantes, actualizar `public/sitemap.xml`:

1. Cambiar la fecha `<lastmod>` a la fecha actual
2. Agregar nuevas `<url>` si hay nuevas rutas

---

## Backup recomendado

Antes de cada deploy, hacer backup de:
- `public/logo.png` (logo original)
- `public/images/` (imágenes de la clínica)
- `.env` (variables de entorno)
- `src/constants/index.ts` (todos los datos)

---

## Convenciones de nomenclatura

| Tipo | Convención | Ejemplo |
|---|---|---|
| Componentes React | PascalCase | `HeroSection.tsx` |
| Hooks | camelCase + `use` | `useCounter.ts` |
| Constantes | UPPER_SNAKE_CASE | `CONTACT_INFO` |
| Variables CSS | kebab-case | `--color-primary` |
| IDs de sección | kebab-case | `id="especialidades"` |
| Imágenes | kebab-case | `hero-clinica.jpg` |
| Documentos | kebab-case + año | `tarifas-2025.pdf` |

---

## Contacto técnico

Para soporte técnico del sitio, contactar al desarrollador con:
- Descripción del cambio requerido
- Sección afectada
- Textos exactos o archivos nuevos
