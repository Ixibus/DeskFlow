/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_API_BASIC_USER?: string
  readonly VITE_API_BASIC_PASSWORD?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
