'use client'

import React, { ReactNode } from 'react'
import { useSectionInView } from '@/lib/hooks'
import {
  useAnimationOnScroll,
  useStaggeredAnimation,
} from '@/lib/animation-hooks'
import { sendEmail } from '@/actions/sendEmail'
import toast from 'react-hot-toast'
import { SectionHeading } from '@/components/section-heading'
import { SubmitBtn } from '@/components/submit-btn'

interface IContactProps {
  children?: ReactNode
}

export const Contact: React.FC<IContactProps> = () => {
  const { ref } = useSectionInView('Contact', 0.3)

  const sectionAnimation = useAnimationOnScroll<HTMLDivElement>({
    delay: 200,
    animationClass: 'animate-fade-in-up',
  })

  const { containerRef, getItemClassName } =
    useStaggeredAnimation<HTMLDivElement>({
      itemCount: 3, // heading, description, form
      delay: 400,
      staggerDelay: 150,
      animationClass: 'animate-fade-in-up',
    })

  return (
    <section id='contact' ref={ref} className='section-spacing scroll-mt-28'>
      {/* Background Elements */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-3xl' />
        <div className='absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-purple-400/10 to-pink-400/10 blur-3xl' />
      </div>

      <div className='content-container mx-auto max-w-2xl'>
        <div ref={containerRef} className='text-center'>
          {/* Section Header */}
          <div className={`mb-8 ${getItemClassName(0)}`}>
            <SectionHeading>Contact Me</SectionHeading>
            <p className='mt-4 text-lg text-gray-600 dark:text-gray-400'>
              Let&apos;s discuss your project and bring your ideas to life
            </p>
          </div>

          {/* Contact Info */}
          <div className={`mb-10 ${getItemClassName(1)}`}>
            <p className='mb-6 text-gray-700 dark:text-white/80'>
              Please contact me directly at{' '}
              <a
                className='text-gradient hover:text-gradient-accent font-semibold transition-all duration-300'
                href='mailto:prantadutta1997@gmail.com'
              >
                prantadutta1997@gmail.com
              </a>{' '}
              or through this form.
            </p>

            {/* Availability Badge */}
            <div className='glass-card special-border inline-flex items-center gap-2 border border-green-200 px-4 py-2 dark:border-green-800'>
              <div className='h-2 w-2 animate-pulse rounded-full bg-green-500' />
              <span className='text-sm font-medium text-green-700 dark:text-green-400'>
                Available to hire
              </span>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`${getItemClassName(2)}`}>
            <form
              className='space-y-6'
              action={async (formData) => {
                const { error } = await sendEmail(formData)

                if (error) {
                  toast.error(error)
                  return
                }

                toast.success('Email sent successfully!')
              }}
            >
              <div className='grid gap-6 md:grid-cols-2'>
                <div className='space-y-2'>
                  <label
                    htmlFor='senderName'
                    className='block text-left text-sm font-medium text-gray-700 dark:text-gray-300'
                  >
                    Your Name
                  </label>
                  <input
                    id='senderName'
                    name='senderName'
                    type='text'
                    required
                    maxLength={100}
                    placeholder='John Doe'
                    className='glass-card special-border h-14 w-full border border-gray-200 px-4 text-gray-900 placeholder-gray-500 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400'
                  />
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='senderEmail'
                    className='block text-left text-sm font-medium text-gray-700 dark:text-gray-300'
                  >
                    Your Email
                  </label>
                  <input
                    id='senderEmail'
                    name='senderEmail'
                    type='email'
                    required
                    maxLength={500}
                    placeholder='john@example.com'
                    className='glass-card special-border h-14 w-full border border-gray-200 px-4 text-gray-900 placeholder-gray-500 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label
                  htmlFor='message'
                  className='block text-left text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Your Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  placeholder='Hi Pranta, I would like to discuss...'
                  required
                  maxLength={5000}
                  rows={6}
                  className='glass-card special-border w-full resize-none border border-gray-200 p-4 text-gray-900 placeholder-gray-500 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400'
                />
              </div>

              <div className='pt-4'>
                <SubmitBtn />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
