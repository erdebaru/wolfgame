/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SOCKET_IO_ENDPOINT: string;
  // Add other variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}