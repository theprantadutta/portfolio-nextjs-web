'use client'

import { useCallback } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import { sendEmail } from '@/actions/sendEmail'
import { SubmitBtn } from '@/components/submit-btn'

export const ContactForm = () => {
  const handleSubmit = useCallback(async (formData: FormData) => {
    const { error } = await sendEmail(formData)

    if (error) {
      toast.error(error)
      return
    }

    toast.success('Email sent successfully!')
  }, [])

  return (
    <>
      <Toaster position='top-right' />
      <form className='space-y-6' action={handleSubmit}>
        <div className='grid gap-6 md:grid-cols-2'>
          <div className='space-y-2 text-left'>
            <label
              htmlFor='senderName'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'
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

          <div className='space-y-2 text-left'>
            <label
              htmlFor='senderEmail'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'
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

        <div className='space-y-2 text-left'>
          <label
            htmlFor='message'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300'
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

        <div className='pt-4 text-left'>
          <SubmitBtn />
        </div>
      </form>
    </>
  )
}
