import type { ReactNode } from 'react'

import { SectionHeading } from '@/components/section-heading'
import { SectionMarker } from '@/components/section-marker'

interface IAboutProps {
  children?: ReactNode
}

// const paragraphs = [
//   {
//     id: 'journey',
//     copy: (
//       <>
//         I graduated with a{' '}
//         <span className='text-gradient font-semibold'>Computer Science</span>{' '}
//         degree and grew into a{' '}
//         <span className='text-gradient-accent font-medium'>
//           self-taught programmer
//         </span>
//         . My happy place is{' '}
//         <span className='font-medium underline decoration-blue-500'>
//           full-stack web and mobile development
//         </span>
//         , with a special love for{' '}
//         <span className='mono rounded-sm bg-linear-to-r from-blue-100 to-purple-100 px-2 py-1 text-sm font-semibold dark:from-blue-900/30 dark:to-purple-900/30'>
//           React Native &amp; Flutter
//         </span>
//         .
//       </>
//     ),
//   },
//   {
//     id: 'passion',
//     copy: (
//       <>
//         Programming is more than a job — it&apos;s a{' '}
//         <span className='text-gradient font-semibold'>passion</span>. I enjoy
//         exploring{' '}
//         <span className='text-gradient-accent font-medium'>
//           new technologies
//         </span>{' '}
//         and finding elegant solutions to complex problems. Debugging is my
//         puzzle, and shipping polished experiences is my{' '}
//         <span className='font-medium underline decoration-purple-500'>
//           reward
//         </span>
//         .
//       </>
//     ),
//   },
//   {
//     id: 'systems',
//     copy: (
//       <>
//         I have hands-on experience with{' '}
//         <span className='text-gradient font-semibold'>System Design</span> and
//         cloud infrastructure. I’ve built a resilient{' '}
//         <span className='mono rounded-sm bg-linear-to-r from-green-100 to-blue-100 px-2 py-1 text-sm font-medium dark:from-green-900/30 dark:to-blue-900/30'>
//           Ubuntu server
//         </span>{' '}
//         stack featuring{' '}
//         <span className='font-medium underline decoration-green-500'>
//           GitLab, Docker, CI/CD, Prometheus, and Grafana
//         </span>{' '}
//         with full monitoring and backup strategies.
//       </>
//     ),
//   },
//   {
//     id: 'apps',
//     copy: (
//       <>
//         I’ve shipped multiple{' '}
//         <span className='text-gradient-accent font-semibold'>
//           Google Play Store apps
//         </span>
//         , built with{' '}
//         <span className='font-medium'>Flutter and React Native</span>. Each one
//         highlights my attention to detail, balanced UI/UX, and drive for
//         performance-focused engineering.
//       </>
//     ),
//   },
// ]

const paragraphs = [
  {
    id: 'journey',
    copy: (
      <>
        I&apos;m a{' '}
        <span className='text-gradient font-semibold'>full-stack engineer</span>{' '}
        with 4 years of experience building{' '}
        <span className='text-gradient-accent font-medium'>
          mobile apps, backend APIs, and infrastructure
        </span>
        . My core stack is{' '}
        <span className='mono rounded-sm bg-linear-to-r from-blue-100 to-purple-100 px-2 py-1 text-sm font-semibold dark:from-blue-900/30 dark:to-purple-900/30'>
          Flutter, React Native, Go &amp; .NET
        </span>
        .
      </>
    ),
  },
  {
    id: 'impact',
    copy: (
      <>
        I&apos;ve built systems that{' '}
        <span className='text-gradient font-semibold'>
          actually move numbers
        </span>{' '}
        — an NFC-based distribution app that{' '}
        <span className='font-medium underline decoration-green-500'>
          reduced fraud by 99.99%
        </span>
        , an HRMS that{' '}
        <span className='font-medium underline decoration-blue-500'>
          cut processing time by 40%
        </span>
        , and a QC system that{' '}
        <span className='font-medium underline decoration-purple-500'>
          eliminated 80% of reporting delays
        </span>
        .
      </>
    ),
  },
  {
    id: 'ai',
    copy: (
      <>
        Currently deep into{' '}
        <span className='text-gradient-accent font-semibold'>
          AI/LLM integrations
        </span>
        . I&apos;ve built production assistants using{' '}
        <span className='mono rounded-sm bg-linear-to-r from-purple-100 to-pink-100 px-2 py-1 text-sm font-medium dark:from-purple-900/30 dark:to-pink-900/30'>
          MCP servers, Gemini, OpenAI &amp; Claude
        </span>{' '}
        that answer queries dynamically from live database APIs.
      </>
    ),
  },
  {
    id: 'systems',
    copy: (
      <>
        I handle my own{' '}
        <span className='text-gradient font-semibold'>DevOps</span>. Currently
        running production workloads on{' '}
        <span className='mono rounded-sm bg-linear-to-r from-green-100 to-blue-100 px-2 py-1 text-sm font-medium dark:from-green-900/30 dark:to-blue-900/30'>
          Hetzner VPS
        </span>{' '}
        with{' '}
        <span className='font-medium underline decoration-green-500'>
          Docker, Traefik, GitLab CI/CD, and automated backups
        </span>
        .
      </>
    ),
  },
  {
    id: 'apps',
    copy: (
      <>
        I&apos;ve shipped{' '}
        <span className='text-gradient-accent font-semibold'>
          20+ production apps
        </span>{' '}
        — including several on the{' '}
        <span className='font-medium'>Google Play Store</span>. When I&apos;m
        not building enterprise systems, I&apos;m making{' '}
        <span className='font-medium underline decoration-purple-500'>
          games, open-source libraries, and side projects
        </span>
        .
      </>
    ),
  },
]

const coreTechnologies = [
  {
    title: 'Mobile',
    items: ['React Native', 'Flutter', 'Android / iOS'],
  },
  {
    title: 'Backend',
    items: ['ASP.NET Core', 'Node.js', 'System Design'],
  },
  {
    title: 'Cloud & DevOps',
    items: ['Docker', 'Kubernetes', 'Google Cloud'],
  },
]

const achievements = [
  {
    icon: '📱',
    title: 'Published Apps',
    subtitle: 'Google Play Store',
    accent: 'from-green-400 to-emerald-500',
  },
  {
    icon: '🏗️',
    title: 'Infrastructure Design',
    subtitle: 'Enterprise Solutions',
    accent: 'from-blue-400 to-purple-500',
  },
  {
    icon: '⚡',
    title: 'Performance Tuning',
    subtitle: 'Mobile & Web',
    accent: 'from-orange-400 to-red-500',
  },
  {
    icon: '🖥️',
    title: 'Self-Hosted Infrastructure',
    subtitle: 'Ubuntu Server Stack',
    accent: 'from-cyan-400 to-blue-500',
  },
  {
    icon: '🚀',
    title: '20+ Projects Completed',
    subtitle: 'Web, Mobile & Cloud',
    accent: 'from-violet-400 to-fuchsia-500',
  },
]

export const About: React.FC<IAboutProps> = () => {
  return (
    <section id='about' className='section-spacing-sm relative scroll-mt-28'>
      <SectionMarker section='About' threshold={0.5} />

      {/* Background accents */}
      <div className='pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden lg:block'>
        <div className='absolute top-1/4 right-0 h-72 w-[18rem] rounded-full bg-linear-to-br from-purple-400/10 to-pink-400/10 opacity-70 blur-2xl' />
        <div className='absolute bottom-[18%] left-0 h-80 w-[20rem] rounded-full bg-linear-to-br from-blue-400/10 to-cyan-400/10 opacity-60 blur-xl' />
      </div>

      <div className='content-container'>
        <div className='mb-16 text-center'>
          <SectionHeading>About Me</SectionHeading>
        </div>

        <div className='grid items-start gap-12 lg:grid-cols-2 lg:gap-16'>
          <div className='space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300'>
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph.id}
                className='animate-fade-in-up [animation-delay:120ms]'
              >
                {paragraph.copy}
              </p>
            ))}
          </div>

          <div className='space-y-8'>
            <div className='glass-card special-border border border-white/10 p-6 shadow-lg backdrop-blur-xl dark:border-gray-700/40'>
              <h3 className='text-gradient mb-4 text-xl font-semibold'>
                Core Technologies
              </h3>
              <div className='grid grid-cols-2 gap-4 text-sm text-gray-700 sm:grid-cols-3 dark:text-gray-300'>
                {coreTechnologies.map((section) => (
                  <div key={section.title} className='space-y-2'>
                    <h4 className='font-medium text-gray-800 dark:text-gray-200'>
                      {section.title}
                    </h4>
                    <ul className='space-y-1'>
                      {section.items.map((item) => (
                        <li key={item} className='flex items-center gap-2'>
                          <span className='h-2 w-2 rounded-full bg-linear-to-br from-blue-500 to-purple-500' />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className='glass-card special-border border border-white/10 p-6 shadow-lg backdrop-blur-xl dark:border-gray-700/40'>
              <h3 className='text-gradient-accent mb-4 text-xl font-semibold'>
                Achievements
              </h3>
              <div className='space-y-4 text-gray-700 dark:text-gray-300'>
                {achievements.map((item) => (
                  <div key={item.title} className='flex items-center gap-3'>
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br ${item.accent}`}
                    >
                      <span className='text-lg'>{item.icon}</span>
                    </div>
                    <div>
                      <p className='font-medium text-gray-900 dark:text-gray-100'>
                        {item.title}
                      </p>
                      <p className='text-sm text-gray-600 dark:text-gray-400'>
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
