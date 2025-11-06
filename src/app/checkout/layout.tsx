import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout - Pranta Payment Gateway',
  description: 'Secure payment gateway for digital products and donations',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
