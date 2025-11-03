// import bundleAnalyzer from '@next/bundle-analyzer'
// import path from 'node:path'
// import { fileURLToPath } from 'node:url'

// const withBundleAnalyzer = bundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
// })

// const dirname = path.dirname(fileURLToPath(import.meta.url))

// /** @type {import('next').NextConfig} */
// const baseConfig = {
//   experimental: {
//     reactCompiler: true,
//   },
//   typescript: {
//     // !! WARN !!
//     // Dangerously allow production builds to successfully complete even if
//     // your project has type errors.
//     // !! WARN !!
//     // ignoreBuildErrors: true,
//   },
//   images: {
//     formats: ['image/avif', 'image/webp'] as const,
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'res.cloudinary.com',
//         pathname: '/**', // Allows all paths under res.cloudinary.com
//       },
//       {
//         protocol: 'https',
//         hostname: 'pranta.vps.webdock.cloud',
//         pathname: '/portfolio/uploads/**/*',
//       },
//       {
//         protocol: 'http',
//         hostname: 'localhost',
//         port: '1337',
//         pathname: '/uploads/**/*',
//       },
//       {
//         protocol: 'https',
//         hostname: 'placehold.co',
//       },
//     ],
//   },
//   // Enable gzip compression
//   compress: true,
//   // Optimize chunks
//   // webpack: (config: any, { isServer }: { isServer: boolean }) => {
//   //   if (!isServer) {
//   //     config.optimization.splitChunks = {
//   //       chunks: 'all',
//   //       cacheGroups: {
//   //         vendor: {
//   //           test: /[\\/]node_modules[\\/]/,
//   //           name: 'vendors',
//   //           chunks: 'all',
//   //         },
//   //       },
//   //     }
//   //   }
//   //   return config
//   // },
//   // webpack: (config) => {
//   //   if (process.env.ANALYZE === 'true' || process.env.SKIP_GOOGLE_FONTS === 'true') {
//   //     config.resolve = config.resolve ?? {}
//   //     config.resolve.alias = config.resolve.alias ?? {}
//   //     config.resolve.alias['next/font/google'] = path.resolve(
//   //       dirname,
//   //       'src/lib/mock-fonts.ts'
//   //     )
//   //   }

//   //   return config
//   // },
//   turbopack: {

//   }
// } satisfies import('next').NextConfig

// export default withBundleAnalyzer(baseConfig)

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    // ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // Allows all paths under res.cloudinary.com
      },
      {
        protocol: 'https',
        hostname: 'pranta.vps.webdock.cloud',
        pathname: '/portfolio/uploads/**/*',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**/*',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  // Enable gzip compression
  compress: true,
  // Optimize chunks
  // webpack: (config: any, { isServer }: { isServer: boolean }) => {
  //   if (!isServer) {
  //     config.optimization.splitChunks = {
  //       chunks: 'all',
  //       cacheGroups: {
  //         vendor: {
  //           test: /[\\/]node_modules[\\/]/,
  //           name: 'vendors',
  //           chunks: 'all',
  //         },
  //       },
  //     }
  //   }
  //   return config
  // },
}

export default nextConfig
