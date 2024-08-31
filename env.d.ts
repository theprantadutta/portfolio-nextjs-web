declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RESEND_API_KEY: string
      STRAPI_API_KEY: string
      STRAPI_API_URL: string
    }
  }
}

export {}
