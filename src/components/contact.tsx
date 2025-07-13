'use client'

import React, { ReactNode } from 'react'
import { motion } from 'motion/react'
import { useSectionInView } from '@/lib/hooks'
import { sendEmail } from '@/actions/sendEmail'
import toast from 'react-hot-toast'
import { SectionHeading } from '@/components/section-heading'
import { SubmitBtn } from '@/components/submit-btn'

interface IContactProps {
  children?: ReactNode
}

export const Contact: React.FC<IContactProps> = () => {
  const { ref } = useSectionInView('Contact')

  return (
    <motion.section
      id='contact'
      ref={ref}
      className='mb-20 w-[min(100%,38rem)] scroll-mt-28 text-center sm:mb-28'
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>Contact me</SectionHeading>

      <p className='-mt-4 text-gray-700 dark:text-white/80'>
        Please contact me directly at{' '}
        <a className='underline' href='mailto:prantadutta1997@gmail.com'>
          prantadutta1997@gmail.com
        </a>{' '}
        or through this form.
      </p>

      <form
        className='mt-10 flex flex-col dark:text-black'
        action={async (formData) => {
          const { error } = await sendEmail(formData)

          if (error) {
            toast.error(error)
            return
          }

          toast.success('Email sent successfully!')
        }}
      >
        <input
          className='borderBlack special-border h-14 px-4 text-sm font-semibold transition-all dark:bg-gray-900 dark:bg-opacity-80 dark:text-gray-300 dark:outline-none dark:focus:bg-opacity-100'
          name='senderEmail'
          type='email'
          required
          maxLength={500}
          placeholder='Your email'
        />
        <textarea
          className='borderBlack special-border my-3 h-52 p-4 text-sm font-semibold transition-all dark:bg-gray-900 dark:bg-opacity-80 dark:text-gray-300 dark:outline-none dark:focus:bg-opacity-100'
          name='message'
          placeholder='Your message'
          required
          maxLength={5000}
        />
        <SubmitBtn />
      </form>
    </motion.section>
  )
}
