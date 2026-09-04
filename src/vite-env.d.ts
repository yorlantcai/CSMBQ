/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_URL_LABORATORIO?: string
  readonly VITE_URL_IMAGENES_DX?: string
  readonly VITE_URL_SOLICITUD_HC?: string
  readonly VITE_GOOGLE_MAPS_EMBED_URL?: string
  readonly VITE_GA_MEASUREMENT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
