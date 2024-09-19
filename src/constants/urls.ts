export const IS_PROD = process.env.NODE_ENV === 'production'

// export const STRAPI_URL = IS_PROD
//   ? process.env.NEXT_PUBLIC_STRAPI_DEV_API_URL
//   : process.env.NEXT_PUBLIC_STRAPI_PROD_API_URL

export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_PROD_API_URL

export const STRAPI_API_URL = STRAPI_URL + '/api'
