import { notFound } from 'next/navigation'
import {
  getPolarProductById,
  formatPolarPrice,
  getDefaultPolarPrice,
} from '@/lib/payment/polar-client'
import { CheckoutForm } from '@/components/checkout/CheckoutForm'
import { FiArrowLeft, FiCheck, FiShield } from 'react-icons/fi'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getPolarProductById(id)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.name} - Checkout`,
    description: product.description || 'Checkout',
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function ProductCheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id } = await params
  console.log(`[Checkout Page] Loading product with ID: ${id}`)

  const search = await searchParams

  let product
  try {
    product = await getPolarProductById(id)
  } catch (error) {
    console.error(`[Checkout Page] Failed to fetch product:`, error)
    notFound()
  }

  if (!product) {
    console.log(`[Checkout Page] Product not found for ID: ${id}`)
    notFound()
  }

  console.log(`[Checkout Page] Product loaded:`, product.name)

  const defaultPrice = getDefaultPolarPrice(product)
  const priceAmount = formatPolarPrice(defaultPrice?.priceAmount)

  // Get custom amount for donations
  const customAmount = search.amount as string | undefined
  const medias = product.medias || []
  const coverImage = medias.find((m: any) => m.type === 'image')?.publicUrl

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950'>
      {/* Header */}
      <header className='border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80'>
        <div className='container mx-auto px-4 py-4'>
          <Link
            href='/checkout'
            className='inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          >
            <FiArrowLeft />
            <span>Back to Products</span>
          </Link>
        </div>
      </header>

      <main className='container mx-auto px-4 py-12'>
        <div className='mx-auto grid max-w-6xl gap-12 lg:grid-cols-2'>
          {/* Product Details */}
          <div>
            {/* Product Image */}
            {coverImage && (
              <div className='mb-6 overflow-hidden rounded-2xl'>
                <img
                  src={coverImage}
                  alt={product.name || 'Product'}
                  className='h-auto w-full'
                />
              </div>
            )}

            <h1 className='mb-4 text-4xl font-bold text-gray-900 dark:text-white'>
              {product.name}
            </h1>

            <div className='mb-6'>
              <div className='text-5xl font-bold text-blue-600 dark:text-blue-400'>
                ${customAmount || priceAmount}
              </div>
              {customAmount && (
                <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
                  Custom amount selected
                </p>
              )}
            </div>

            <div className='prose prose-gray mb-8 dark:prose-invert'>
              <p className='text-lg text-gray-700 dark:text-gray-300'>
                {product.description}
              </p>
            </div>

            {/* Trust Badges */}
            <div className='rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/50'>
              <div className='flex items-center gap-3'>
                <FiShield className='text-2xl text-green-500' />
                <div>
                  <h4 className='font-semibold text-gray-900 dark:text-white'>
                    Secure Payment
                  </h4>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Powered by Polar.sh - Your payment information is encrypted
                    and secure
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div>
            <div className='sticky top-8'>
              <div className='rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900'>
                <h2 className='mb-6 text-2xl font-bold text-gray-900 dark:text-white'>
                  Complete Your Purchase
                </h2>

                <CheckoutForm
                  product={product}
                  productId={id}
                  priceAmount={customAmount || priceAmount}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
