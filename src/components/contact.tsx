import type { ReactNode } from 'react'

import { SectionHeading } from '@/components/section-heading'
import { SectionMarker } from '@/components/section-marker'
import { ContactForm } from '@/components/contact-form'

interface IContactProps {
  children?: ReactNode
}

export const Contact: React.FC<IContactProps> = () => {
  return (
    <section id='contact' className='section-spacing-sm relative scroll-mt-28'>
      <SectionMarker section='Contact' threshold={0.3} />

      <div className='pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden lg:block'>
        <div className='from-primary-400/10 to-secondary-400/10 absolute top-1/4 left-1/4 h-72 w-[18rem] rounded-full bg-linear-to-br opacity-70 blur-2xl' />
        <div className='from-secondary-400/10 to-accent-400/10 absolute right-1/4 bottom-1/4 h-64 w-[16rem] rounded-full bg-linear-to-br opacity-60 blur-xl' />
      </div>

      <div className='content-container mx-auto max-w-2xl text-center'>
        <SectionHeading>Contact Me</SectionHeading>
        <p className='mx-auto mt-4 max-w-xl text-lg text-gray-600 dark:text-gray-400'>
          Looking for a developer? Let&apos;s build something great together.
        </p>

        <div className='mt-8 space-y-6 text-gray-700 dark:text-gray-200'>
          <p>
            Reach me directly at{' '}
            <a
              className='text-gradient hover:text-gradient-accent font-semibold transition-colors duration-300'
              href='mailto:prantadutta1997@gmail.com'
            >
              prantadutta1997@gmail.com
            </a>{' '}
            or use the form below.
          </p>

          <div className='mx-auto inline-flex items-center gap-2 rounded-2xl border border-green-200 bg-white/50 px-4 py-2 text-sm font-medium text-green-700 dark:border-green-800 dark:bg-gray-900/40 dark:text-green-400'>
            <span className='h-2 w-2 animate-pulse rounded-full bg-green-500' />
            Available for hire
          </div>
        </div>

        <div className='mt-10'>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
