declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RESEND_API_KEY: string
      STRAPI_API_KEY: string
      NEXT_PUBLIC_STRAPI_DEV_API_URL: string
      NEXT_PUBLIC_STRAPI_PROD_API_URL: string
    }
  }
}

export {}
