# Clínica San Martín Barranquilla — Plataforma Web

Plataforma web médica premium para Clínica San Martín Barranquilla Ltda.  
Stack: **React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion**

---

## Inicio rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env

# 3. Colocar el logo (ver sección Logo)

# 4. Servidor de desarrollo
npm run dev
# → http://localhost:5173

# 5. Build de producción
npm run build

# 6. Preview del build
npm run preview
```

---

## Logo — INSTRUCCIÓN CRÍTICA

> **El logo original es sagrado. NO modificar, redibujar ni alterar.**

1. Copia el archivo original del logo a: `public/logo.png`
2. El logo aparecerá automáticamente en el Navbar, Footer y demás lugares.
3. Para soporte retina (pantallas 4K), coloca también: `public/logo@2x.png`

El logo se referencia como `/logo.png` en todo el proyecto.  
Si cambias el nombre del archivo, actualiza la referencia en:
- `src/components/layout/Navbar.tsx` (línea ~52)
- `src/components/layout/Footer.tsx` (línea ~44)
- `src/pages/Home/sections/About.tsx` (línea ~65)

---

## Estructura del proyecto

```
CsmbqWeb/
├── public/
│   ├── logo.png                  ← LOGO ORIGINAL (colocar aquí)
│   ├── robots.txt
│   ├── sitemap.xml
│   └── .htaccess                 ← Apache config para GoDaddy
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx        ← Wrapper principal
│   │   │   ├── Navbar.tsx        ← Barra de navegación
│   │   │   └── Footer.tsx        ← Pie de página
│   │   └── ui/
│   │       ├── ScrollProgress.tsx
│   │       └── Section.tsx
│   │
│   ├── constants/
│   │   └── index.ts              ← ★ TODOS LOS TEXTOS Y DATOS
│   │
│   ├── hooks/
│   │   ├── useCounter.ts
│   │   ├── useNavScroll.ts
│   │   ├── useScrollProgress.ts
│   │   └── useMediaQuery.ts
│   │
│   ├── pages/
│   │   └── Home/
│   │       ├── index.tsx         ← Ensambla todas las secciones
│   │       └── sections/
│   │           ├── Hero.tsx
│   │           ├── About.tsx
│   │           ├── Specialties.tsx
│   │           ├── Services.tsx
│   │           ├── MedicalResults.tsx
│   │           ├── Statistics.tsx
│   │           └── Contact.tsx
│   │
│   ├── routes/index.tsx
│   ├── store/appStore.ts
│   ├── types/index.ts
│   ├── utils/animations.ts
│   ├── index.css
│   ├── main.tsx
│   └── App.tsx
│
├── index.html                    ← SEO meta tags, Schema.org
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── .env.example
```

---

## Cómo cambiar textos y datos

**Todas las datos editables están en un solo lugar:**

### `src/constants/index.ts`

| Variable | Qué controla |
|---|---|
| `NAV_LINKS` | Links del menú de navegación |
| `SPECIALTIES` | Tarjetas de especialidades médicas |
| `SERVICES` | Tarjetas de servicios médicos |
| `STATS` | Números del contador animado (años, pacientes…) |
| `RESULT_PORTALS` | URLs y textos de los portales de resultados |
| `CONTACT_INFO` | Dirección, teléfonos, email, horarios |
| `SOCIAL_LINKS` | Redes sociales |

### Cambiar teléfono o dirección

Edita `src/constants/index.ts`:

```ts
export const CONTACT_INFO: ContactInfo = {
  address:  'Tu nueva dirección aquí',
  phones:   ['+57 5 XXX XXXX', '+57 5 XXX XXXX'],
  email:    'nuevo@email.com',
  schedule: 'Lunes a Viernes 7am - 7pm',
}
```

### Cambiar las URLs de resultados médicos

```ts
export const RESULT_PORTALS: ResultPortal[] = [
  {
    id: 'laboratorio',
    url: 'http://TU-NUEVA-URL/resultados',   // ← cambiar aquí
    ...
  },
  {
    id: 'imagenes',
    url: 'https://TU-NUEVA-URL/imagenes',    // ← cambiar aquí
    ...
  },
]
```

### Agregar/quitar una especialidad

En `SPECIALTIES`, cada entrada tiene esta forma:

```ts
{
  id: 'id-unico',
  icon: 'NombreIcono',       // Ver lista de iconos Lucide: lucide.dev/icons
  title: 'Nombre Especialidad',
  description: 'Descripción breve.',
}
```

### Cambiar los números del contador

```ts
export const STATS: StatItem[] = [
  { value: 25,    suffix: '+', label: 'Años de Experiencia', description: '...' },
  { value: 50000, suffix: '+', label: 'Pacientes Atendidos', description: '...' },
  ...
]
```

---

## Cambiar el mapa

En `src/pages/Home/sections/Contact.tsx`, busca el `<iframe>` con el mapa y reemplaza el `src`:

```tsx
// Opción 1 — Buscar por nombre
src="https://maps.google.com/maps?q=Clinica+San+Martin+Barranquilla&output=embed"

// Opción 2 — Coordenadas exactas (recomendado)
src="https://maps.google.com/maps?q=10.9878,-74.7889&output=embed"

// Opción 3 — Google Maps Embed API con Place ID
src="https://www.google.com/maps/embed/v1/place?key=TU_API_KEY&q=place_id:TU_PLACE_ID"
```

---

## Despliegue en GoDaddy

### Opción A — Hosting compartido (recomendado para inicio)

```bash
# 1. Generar build
npm run build

# 2. El build queda en /dist
# 3. Subir TODOS los archivos de /dist al directorio raíz del hosting (public_html/)
#    Puedes usar FileZilla, el administrador de archivos de GoDaddy o CI/CD
# 4. El archivo .htaccess ya está incluido en /public (se copia al /dist automáticamente)
```

> ⚠️ Asegúrate de que el archivo `.htaccess` quede en la raíz de `public_html/`.  
> Es indispensable para que las rutas de React Router funcionen correctamente.

### Opción B — VPS / Servidor dedicado (Node.js)

```bash
# En el servidor
npm install
npm run build
npx vite preview --host 0.0.0.0 --port 80

# O con PM2
npm install -g pm2
pm2 start "npx vite preview --host 0.0.0.0 --port 80" --name csmbq-web
```

### Opción C — CI/CD automático (GitHub + GoDaddy FTP)

Agrega `.github/workflows/deploy.yml` con acción FTP al servidor de GoDaddy.

---

## SEO

El SEO está configurado en `index.html`:

- **Title y Description** — Modificar directamente en `index.html` líneas 8-10
- **OpenGraph** — Para la imagen OG, coloca `public/og-image.jpg` (1200×630px)
- **Schema.org** — Bloque JSON-LD en `index.html` líneas 30-60
- **Sitemap** — `public/sitemap.xml` — Actualizar fechas y URLs
- **robots.txt** — `public/robots.txt`

---

## Variables de entorno

Copia `.env.example` → `.env` y ajusta:

```env
VITE_SITE_URL=https://www.tusitio.com
VITE_URL_LABORATORIO=http://tu-servidor/resultados
VITE_URL_IMAGENES_DX=https://tu-servidor-imagenes/login
VITE_PHONE_PRIMARY=+57 5 000 0000
VITE_EMAIL_CONTACT=info@tuclinica.com
```

> Variables con prefijo `VITE_` son accesibles en el frontend vía `import.meta.env.VITE_*`

---

## Paleta de colores

| Token Tailwind | Hex | Uso |
|---|---|---|
| `clinic-500` | `#1B5EA6` | Color primario corporativo |
| `clinic-700` | `#0D3B6E` | Hover / texto oscuro |
| `clinic-50`  | `#EBF3FF` | Fondos suaves / chips |
| `dark`       | `#0A1628` | Texto principal / fondo footer |
| `surface`    | `#F0F4F9` | Fondo secciones alternas |

---

## Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción en `/dist` |
| `npm run preview` | Preview del build de producción |
| `npm run lint` | Análisis estático con ESLint |

---

## Requisitos del sistema

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0

---

## Licencia

Uso exclusivo de Clínica San Martín Barranquilla Ltda.  
Todos los derechos reservados © 2025.
