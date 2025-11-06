import {
  getAllPolarProducts,
  getPolarProductById,
} from '@/lib/payment/polar-client'

export default async function DebugPage() {
  const products = await getAllPolarProducts()

  return (
    <div className='min-h-screen bg-white p-8 dark:bg-gray-900'>
      <div className='mx-auto max-w-4xl'>
        <h1 className='mb-8 text-3xl font-bold text-gray-900 dark:text-white'>
          Polar Products Debug
        </h1>

        <div className='mb-8 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20'>
          <h2 className='mb-2 text-lg font-semibold text-blue-900 dark:text-blue-100'>
            Configuration
          </h2>
          <pre className='text-sm text-blue-800 dark:text-blue-200'>
            {JSON.stringify(
              {
                server: process.env.NEXT_PUBLIC_POLAR_SERVER,
                hasAccessToken: !!process.env.POLAR_ACCESS_TOKEN,
                tokenPrefix:
                  process.env.POLAR_ACCESS_TOKEN?.substring(0, 15) + '...',
              },
              null,
              2
            )}
          </pre>
        </div>

        <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-white'>
          Products Found: {products.length}
        </h2>

        <div className='space-y-4'>
          {products.map((product) => (
            <div
              key={product.id}
              className='rounded-lg border border-gray-200 p-4 dark:border-gray-700'
            >
              <h3 className='mb-2 text-lg font-semibold text-gray-900 dark:text-white'>
                {product.name}
              </h3>
              <div className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                <strong>ID:</strong> {product.id}
              </div>
              <div className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                <strong>Description:</strong> {product.description || 'N/A'}
              </div>
              <div className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                <strong>Is Archived:</strong>{' '}
                {product.isArchived ? 'Yes' : 'No'}
              </div>
              <a
                href={`/checkout/${product.id}`}
                className='inline-block rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600'
              >
                Test Checkout Page
              </a>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-800 dark:bg-yellow-900/20'>
            <h3 className='mb-2 text-lg font-semibold text-yellow-900 dark:text-yellow-100'>
              No Products Found
            </h3>
            <p className='text-yellow-800 dark:text-yellow-200'>
              No products were returned from the Polar API. This could mean:
            </p>
            <ul className='ml-6 mt-2 list-disc text-sm text-yellow-800 dark:text-yellow-200'>
              <li>
                You haven&apos;t created any products in your Polar sandbox yet
              </li>
              <li>
                Your access token doesn&apos;t have permission to read products
              </li>
              <li>The access token is for a different organization</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
