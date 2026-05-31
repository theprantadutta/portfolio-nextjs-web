import type { ReactNode } from 'react'

import { FaCodeBranch, FaGithub } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'

import { SectionHeading } from '@/components/section-heading'
import { SectionMarker } from '@/components/section-marker'
import { SectionSubheading } from '@/components/section-subheading'
import { openSourceContributions } from '@/lib/open-source'

interface IOpenSourceProps {
  children?: ReactNode
}

export const OpenSource: React.FC<IOpenSourceProps> = () => {
  if (openSourceContributions.length === 0) return null

  return (
    <section id='open-source' className='section-spacing-sm scroll-mt-28'>
      <SectionMarker section='Open Source' threshold={0.1} />

      {/* Section Header */}
      <div className='mb-16 text-center'>
        <SectionHeading>Open Source</SectionHeading>
        <SectionSubheading>
          Production fixes I&apos;ve merged into the tools other developers rely
          on
        </SectionSubheading>
      </div>

      <div className='content-container'>
        <div className='mx-auto grid max-w-4xl gap-6'>
          {openSourceContributions.map((contribution) => (
            <div
              key={contribution.repo}
              className='special-border glass-card border-white/10 bg-white/5 p-6 backdrop-blur-lg sm:p-8 dark:bg-gray-900/20'
            >
              {/* Card header */}
              <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
                <div>
                  <div className='flex items-center gap-3'>
                    <FaGithub className='h-6 w-6 shrink-0 text-gray-700 dark:text-gray-300' />
                    <h3 className='text-xl font-bold'>{contribution.name}</h3>
                  </div>
                  <a
                    href={contribution.repoUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary-600 dark:text-primary-400 mt-1 inline-flex items-center gap-1 text-sm hover:underline'
                  >
                    {contribution.repo}
                    <FiExternalLink className='h-3.5 w-3.5' />
                  </a>
                </div>

                {/* Badges */}
                <div className='flex flex-wrap gap-2'>
                  {contribution.stat && (
                    <span className='from-primary-500/15 to-secondary-500/15 text-primary-700 dark:text-primary-300 special-border bg-linear-to-r px-3 py-1 text-xs font-medium'>
                      {contribution.stat}
                    </span>
                  )}
                  {contribution.shippedIn && (
                    <span className='special-border bg-green-500/15 px-3 py-1 text-xs font-medium text-green-700 dark:text-green-400'>
                      Shipped in {contribution.shippedIn}
                    </span>
                  )}
                </div>
              </div>

              <p className='mb-6 text-gray-600 dark:text-gray-400'>
                {contribution.description}
              </p>

              {/* Merged pull requests */}
              <ul className='space-y-4'>
                {contribution.pullRequests.map((pr) => (
                  <li key={pr.number}>
                    <a
                      href={pr.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='special-border group flex gap-3 border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 dark:bg-gray-900/30'
                    >
                      <FaCodeBranch className='text-primary-500 mt-1 h-4 w-4 shrink-0' />
                      <div>
                        <div className='flex flex-wrap items-center gap-2'>
                          <span className='font-medium'>{pr.title}</span>
                          <span className='text-xs text-gray-500'>
                            #{pr.number}
                          </span>
                          <FiExternalLink className='h-3.5 w-3.5 text-gray-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                        </div>
                        <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                          {pr.description}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
