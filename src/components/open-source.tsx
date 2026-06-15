import type { ReactNode } from 'react'

import { FaCodeBranch, FaGithub } from 'react-icons/fa'
import { FiCheckCircle, FiChevronDown, FiExternalLink } from 'react-icons/fi'

import { SectionHeading } from '@/components/section-heading'
import { SectionMarker } from '@/components/section-marker'
import { SectionSubheading } from '@/components/section-subheading'
import { openSourceContributions } from '@/lib/open-source'

interface IOpenSourceProps {
  children?: ReactNode
}

const chipClass =
  'special-border hover:text-primary-600 dark:hover:text-primary-400 inline-flex items-center gap-1 border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors duration-300 hover:border-white/20 dark:bg-gray-900/40 dark:text-gray-300'

export const OpenSource: React.FC<IOpenSourceProps> = () => {
  if (openSourceContributions.length === 0) return null

  const totalPrs = openSourceContributions.reduce(
    (sum, c) => sum + c.pullRequests.length,
    0
  )
  const projectCount = openSourceContributions.length
  const issuesFixed = openSourceContributions.reduce(
    (sum, c) =>
      sum + c.pullRequests.reduce((s, pr) => s + (pr.resolves?.length ?? 0), 0),
    0
  )

  const stats = [
    {
      icon: FaCodeBranch,
      value: totalPrs,
      label: totalPrs === 1 ? 'Merged PR' : 'Merged PRs',
    },
    {
      icon: FaGithub,
      value: projectCount,
      label: projectCount === 1 ? 'Project' : 'Projects',
    },
    {
      icon: FiCheckCircle,
      value: issuesFixed,
      label: issuesFixed === 1 ? 'Issue Fixed' : 'Issues Fixed',
    },
  ]

  return (
    <section
      id='open-source'
      className='section-spacing-sm w-full scroll-mt-28'
    >
      <SectionMarker section='Open Source' threshold={0.1} />

      {/* Section Header */}
      <div className='mb-12 text-center'>
        <SectionHeading>Open Source</SectionHeading>
        <SectionSubheading>
          Production fixes I&apos;ve merged into the tools other developers rely
          on
        </SectionSubheading>

        {/* Summary stats */}
        <div className='mx-auto mt-8 grid max-w-xl grid-cols-3 gap-3 sm:gap-4'>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className='special-border glass-card bg-white/5 px-2 py-4 text-center backdrop-blur-lg dark:bg-gray-900/20'
            >
              <stat.icon className='text-primary-500 mx-auto mb-2 h-5 w-5' />
              <div className='from-primary-600 to-secondary-600 bg-linear-to-r bg-clip-text text-2xl font-bold text-transparent sm:text-3xl'>
                {stat.value}
              </div>
              <div className='mt-0.5 text-xs text-gray-500 dark:text-gray-400'>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='content-container'>
        <div className='mx-auto flex w-full max-w-3xl flex-col gap-4'>
          {openSourceContributions.map((contribution, index) => (
            <details
              key={contribution.repo}
              open={index === 0}
              className='group special-border glass-card border-white/10 bg-white/5 backdrop-blur-lg dark:bg-gray-900/20'
            >
              {/* Compact summary row (always visible) */}
              <summary className='flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden'>
                <div className='flex min-w-0 items-center gap-3'>
                  <FaGithub className='h-6 w-6 shrink-0 text-gray-700 dark:text-gray-300' />
                  <div className='min-w-0'>
                    <h3 className='truncate font-bold'>{contribution.name}</h3>
                    <span className='text-xs text-gray-500'>
                      {contribution.repo}
                    </span>
                  </div>
                </div>

                <div className='flex shrink-0 items-center gap-2'>
                  <span className='special-border bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-gray-900/40 dark:text-gray-400'>
                    {contribution.pullRequests.length} merged
                  </span>
                  {contribution.stat && (
                    <span className='from-primary-500/15 to-secondary-500/15 text-primary-700 dark:text-primary-300 special-border hidden bg-linear-to-r px-2.5 py-1 text-xs font-medium sm:inline'>
                      {contribution.stat}
                    </span>
                  )}
                  <FiChevronDown className='h-5 w-5 text-gray-400 transition-transform duration-300 group-open:rotate-180' />
                </div>
              </summary>

              {/* Expanded detail */}
              <div className='border-t border-white/10 px-5 pb-5'>
                <p className='mt-4 text-sm text-gray-600 dark:text-gray-400'>
                  {contribution.description}
                </p>

                {/* Project-level links */}
                <div className='mt-4 mb-5 flex flex-wrap items-center gap-2'>
                  {contribution.shippedIn && (
                    <span className='special-border bg-green-500/15 px-2.5 py-1 text-xs font-medium text-green-700 dark:text-green-400'>
                      Shipped in {contribution.shippedIn}
                    </span>
                  )}
                  <a
                    href={contribution.repoUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={chipClass}
                  >
                    Repository
                    <FiExternalLink className='h-3 w-3' />
                  </a>
                  {contribution.links?.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={chipClass}
                    >
                      {link.label}
                      <FiExternalLink className='h-3 w-3' />
                    </a>
                  ))}
                </div>

                {/* Merged pull requests */}
                <ul className='space-y-3'>
                  {contribution.pullRequests.map((pr) => (
                    <li
                      key={pr.number}
                      className='special-border border border-white/10 bg-white/5 p-4 dark:bg-gray-900/30'
                    >
                      <div className='flex gap-3'>
                        <FaCodeBranch className='text-primary-500 mt-1 h-4 w-4 shrink-0' />
                        <div className='min-w-0'>
                          <a
                            href={pr.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex flex-wrap items-center gap-2 hover:underline'
                          >
                            <span className='font-medium'>{pr.title}</span>
                            <span className='text-xs text-gray-500'>
                              #{pr.number}
                            </span>
                            <FiExternalLink className='h-3.5 w-3.5 text-gray-400' />
                          </a>
                          <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                            {pr.description}
                          </p>

                          {pr.resolves && pr.resolves.length > 0 && (
                            <div className='mt-3 flex flex-wrap items-center gap-2'>
                              <span className='inline-flex items-center gap-1 text-xs text-gray-500'>
                                <FiCheckCircle className='h-3.5 w-3.5 text-green-600 dark:text-green-500' />
                                Fixes
                              </span>
                              {pr.resolves.map((issue) => (
                                <a
                                  key={`${issue.repo}#${issue.number}`}
                                  href={issue.url}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                  className={chipClass}
                                >
                                  {issue.repo === contribution.repo
                                    ? `#${issue.number}`
                                    : `${issue.repo}#${issue.number}`}
                                  <FiExternalLink className='h-3 w-3' />
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
