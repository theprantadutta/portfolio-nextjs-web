import Link from 'next/link'
import {
  getAllPolarProducts,
  formatPolarPrice,
  getDefaultPolarPrice,
} from '@/lib/payment/polar-client'
import { FiShoppingCart, FiHeart, FiDownload, FiStar } from 'react-icons/fi'

export const metadata = {
  title: 'Checkout - Pranta Payment Gateway',
  description: 'Secure payment gateway for digital products and donations',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function CheckoutPage() {
  // Fetch products directly from Polar
  const products = await getAllPolarProducts()

  // Filter donation products (you can customize the logic to identify donations)
  const donationProducts = products.filter(
    (p: any) =>
      p.name?.toLowerCase().includes('donate') ||
      p.name?.toLowerCase().includes('support')
  )

  // Other products are digital products
  const digitalProducts = products.filter(
    (p: any) =>
      !p.name?.toLowerCase().includes('donate') &&
      !p.name?.toLowerCase().includes('support')
  )

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950'>
      {/* Header */}
      <header className='border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80'>
        <div className='container mx-auto px-4 py-6'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Pranta Payment Gateway
          </h1>
          <p className='mt-2 text-gray-600 dark:text-gray-400'>
            Secure checkout for digital products and support
          </p>
        </div>
      </header>

      <main className='container mx-auto px-4 py-12'>
        {/* Donation Section */}
        {donationProducts.length > 0 && (
          <section className='mb-16'>
            <div className='mb-8 flex items-center gap-3'>
              <FiHeart className='text-3xl text-rose-500' />
              <div>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                  Support the Developer
                </h2>
                <p className='text-gray-600 dark:text-gray-400'>
                  Your support helps me build amazing projects
                </p>
              </div>
            </div>

            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {donationProducts.map((product: any) => {
                const defaultPrice = getDefaultPolarPrice(product)
                const priceAmount = formatPolarPrice(defaultPrice?.priceAmount)

                return (
                  <Link
                    key={product.id}
                    href={`/checkout/${product.id}`}
                    className='group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-rose-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-rose-700'
                  >
                    <div className='absolute right-4 top-4 text-4xl opacity-20'>
                      ❤️
                    </div>

                    <div className='relative'>
                      <h3 className='mb-2 text-lg font-semibold text-gray-900 dark:text-white'>
                        {product.name}
                      </h3>
                      <p className='mb-4 text-sm text-gray-600 dark:text-gray-400'>
                        {product.description || 'Support the developer'}
                      </p>
                      <div className='mb-4 text-3xl font-bold text-rose-500'>
                        ${priceAmount}
                      </div>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm font-medium text-rose-600 group-hover:text-rose-700 dark:text-rose-400'>
                          Donate Now →
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* Digital Products Section */}
        {digitalProducts.length > 0 && (
          <section>
            <div className='mb-8 flex items-center gap-3'>
              <FiShoppingCart className='text-3xl text-blue-500' />
              <div>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                  Digital Products
                </h2>
                <p className='text-gray-600 dark:text-gray-400'>
                  Premium digital content and resources
                </p>
              </div>
            </div>

            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {digitalProducts.map((product: any) => {
                const defaultPrice = getDefaultPolarPrice(product)
                const priceAmount = formatPolarPrice(defaultPrice?.priceAmount)
                const medias = product.medias || []
                const coverImage = medias.find(
                  (m: any) => m.type === 'image'
                )?.publicUrl

                return (
                  <Link
                    key={product.id}
                    href={`/checkout/${product.id}`}
                    className='group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:border-blue-300 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700'
                  >
                    {/* Product Image/Icon */}
                    {coverImage ? (
                      <div className='aspect-video w-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600'>
                        <img
                          src={coverImage}
                          alt={product.name || 'Product'}
                          className='h-full w-full object-cover transition-transform group-hover:scale-105'
                        />
                      </div>
                    ) : (
                      <div className='flex aspect-video w-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600'>
                        <FiDownload className='text-6xl text-white/50' />
                      </div>
                    )}

                    <div className='p-6'>
                      <h3 className='mb-2 text-xl font-bold text-gray-900 dark:text-white'>
                        {product.name}
                      </h3>

                      <p className='mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400'>
                        {product.description || 'Premium digital product'}
                      </p>

                      <div className='flex items-center justify-between'>
                        <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                          ${priceAmount}
                        </div>
                        <span className='text-sm font-medium text-blue-600 group-hover:text-blue-700 dark:text-blue-400'>
                          Buy Now →
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* Empty State */}
        {products.length === 0 && (
          <div className='py-20 text-center'>
            <FiShoppingCart className='mx-auto mb-4 text-6xl text-gray-400' />
            <h2 className='mb-2 text-2xl font-bold text-gray-900 dark:text-white'>
              No Products Available
            </h2>
            <p className='text-gray-600 dark:text-gray-400'>
              Check back soon for new products and donation options
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className='mt-20 border-t border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80'>
        <div className='container mx-auto px-4 py-8 text-center text-sm text-gray-600 dark:text-gray-400'>
          <p>© 2025 Pranta Dev. All rights reserved.</p>
          <p className='mt-2'>Secure payment processing powered by Polar.sh</p>
        </div>
      </footer>
    </div>
  )
}
