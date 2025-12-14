'use client'

import { SectionHeading } from '@/components/section-heading'
import { useAnimationOnScroll } from '@/lib/animation-hooks'
import { useSectionInView } from '@/lib/hooks'
import { IStrapiApiResponse, SkillDataAttributes } from '@/types/types'
import React, { useState } from 'react'
import { BiLogoPostgresql } from 'react-icons/bi'
import { DiGoogleCloudPlatform, DiMsqlServer } from 'react-icons/di'
import {
  FaCloud,
  FaCode,
  FaDatabase,
  FaDocker,
  FaGitAlt,
  FaHeart,
  FaNodeJs,
  FaReact,
  FaRocket,
  FaRust,
  FaStar,
  FaTools,
} from 'react-icons/fa'
import { FaGolang } from 'react-icons/fa6'
import { IoLogoFirebase } from 'react-icons/io5'
import { LuBoxes } from 'react-icons/lu'
import {
  SiDart,
  SiDotnet,
  SiFlutter,
  SiKotlin,
  SiKubernetes,
  SiNextdotjs,
  SiRedis,
  SiTypescript,
} from 'react-icons/si'
import { TbBrandReactNative } from 'react-icons/tb'

interface ISkillProps {
  skills: IStrapiApiResponse<SkillDataAttributes>
}

const getSkillIcon = (skillName: string) => {
  if (skillName.includes('ASP.Net Core')) return SiDotnet
  if (skillName.includes('Cloud Computing')) return FaCloud
  if (skillName.includes('Dart')) return SiDart
  if (skillName.includes('Docker')) return FaDocker
  if (skillName.includes('Flutter')) return SiFlutter
  if (skillName.includes('Git')) return FaGitAlt
  if (skillName.includes('Golang')) return FaGolang
  if (skillName.includes('Kotlin')) return SiKotlin
  if (skillName.includes('Kubernetes')) return SiKubernetes
  if (skillName.includes('Microservices')) return LuBoxes
  if (skillName.includes('Next.js')) return SiNextdotjs
  if (skillName.includes('PostgreSQL')) return BiLogoPostgresql
  if (skillName.includes('React')) return FaReact
  if (skillName.includes('React Native')) return TbBrandReactNative
  if (skillName.includes('Rust')) return FaRust
  if (skillName.includes('SQL Server')) return DiMsqlServer
  if (skillName.includes('Typescript')) return SiTypescript
  if (skillName.includes('Google Cloud Platform')) return DiGoogleCloudPlatform
  if (skillName.includes('Firebase')) return IoLogoFirebase
  if (skillName.includes('Redis')) return SiRedis
  return FaCode
}


export const Skills: React.FC<ISkillProps> = ({ skills }) => {
  const { ref } = useSectionInView('Skills', 0.1)
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'hexagon' | 'cards'>('hexagon')

  const sectionAnimation = useAnimationOnScroll<HTMLDivElement>({
    delay: 100,
    animationClass: 'animate-fade-in-up',
  })

  const skillCategories = [
    {
      name: 'Frontend',
      skills: skills.data.filter((s) =>
        [
          'react',
          'react native',
          'flutter',
          'next.js',
          'typescript',
          'javascript',
          'html',
          'css',
          'tailwind',
          'dart',
        ].some((tech) => s.title.toLowerCase().includes(tech))
      ),
      color: 'from-blue-500 to-cyan-500',
      icon: FaReact,
    },
    {
      name: 'Backend',
      skills: skills.data.filter((s) =>
        [
          'node.js',
          'python',
          'java',
          'golang',
          'rust',
          'asp.net core',
          'express',
          'api',
          'microservices',
        ].some((tech) => s.title.toLowerCase().includes(tech))
      ),
      color: 'from-green-500 to-emerald-500',
      icon: FaNodeJs,
    },
    {
      name: 'Database',
      skills: skills.data.filter((s) =>
        [
          'mongodb',
          'postgresql',
          'mysql',
          'sql server',
          'redis',
          'database',
        ].some((tech) => s.title.toLowerCase().includes(tech))
      ),
      color: 'from-orange-500 to-red-500',
      icon: FaDatabase,
    },
    {
      name: 'Cloud & DevOps',
      skills: skills.data.filter((s) =>
        [
          'docker',
          'git',
          'aws',
          'google cloud platform',
          'firebase',
          'tools',
        ].some((tech) => s.title.toLowerCase().includes(tech))
      ),
      color: 'from-purple-500 to-pink-500',
      icon: FaTools,
    },
    {
      name: 'Design',
      skills: skills.data.filter((s) =>
        ['figma'].some((tech) => s.title.toLowerCase().includes(tech))
      ),
      color: 'from-yellow-500 to-amber-500',
      icon: FaTools,
    },
  ].filter((cat) => cat.skills.length > 0)

  return (
    <section
      ref={ref}
      id='skills'
      className='section-spacing-sm relative scroll-mt-28 overflow-hidden'
    >
      {/* Background Elements */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute left-10 top-10 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl' />
        <div
          className='absolute bottom-10 right-10 h-80 w-80 animate-pulse rounded-full bg-gradient-to-r from-pink-500/10 to-orange-500/10 blur-3xl'
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className='content-container'>
        {/* Header */}
        <div
          className={`mb-16 text-center ${sectionAnimation.className}`}
          ref={sectionAnimation.ref}
        >
          <SectionHeading>Skills & Technologies</SectionHeading>
          <p className='mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400'>
            Crafting beautiful experiences with modern technologies
          </p>
        </div>

        {/* View Toggle */}
        <div className='mb-12 flex justify-center'>
          <div className='special-border glass-card flex bg-white/10 p-1 backdrop-blur-lg dark:bg-gray-900/20'>
            <button
              onClick={() => setViewMode('hexagon')}
              className={`special-border mr-1 px-6 py-2 transition-all duration-300 ${
                viewMode === 'hexagon'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'hover:bg-white/10'
              }`}
            >
              Hexagon View
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`special-border ml-1 px-6 py-2 transition-all duration-300 ${
                viewMode === 'cards'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'hover:bg-white/10'
              }`}
            >
              Cards View
            </button>
          </div>
        </div>

        {/* Skills Display */}
        {viewMode === 'hexagon' ? (
          <div className='relative'>
            {/* Hexagonal Grid */}
            <div className='mx-auto flex max-w-4xl flex-wrap justify-center gap-4'>
              {skills.data.slice(0, 19).map((skill, index) => {
                const Icon = getSkillIcon(skill.title)

                return (
                  <div
                    key={skill.id}
                    className={`group relative cursor-pointer transition-all duration-500 hover:z-10 hover:scale-110 ${
                      index % 2 === 0 ? 'mt-8' : ''
                    }`}
                    onClick={() =>
                      setSelectedSkill(
                        selectedSkill === skill.title ? null : skill.title
                      )
                    }
                  >
                    {/* Hexagon Shape */}
                    <div className='relative h-20 w-24'>
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${
                          skill.isFavourite
                            ? 'from-blue-400 to-cyan-400 shadow-blue-400/50'
                            : 'from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800'
                        } clip-hexagon transition-all duration-300 group-hover:shadow-2xl ${
                          selectedSkill === skill.title
                            ? 'scale-125 shadow-2xl'
                            : ''
                        }`}
                      />

                      {/* Content */}
                      <div className='absolute inset-0 flex flex-col items-center justify-center p-2 text-center'>
                        <Icon
                          className={`mb-1 h-6 w-6 ${
                            skill.isFavourite
                              ? 'text-white'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}
                        />
                        <span
                          className={`text-xs font-medium leading-tight ${
                            skill.isFavourite
                              ? 'text-white'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {skill.title}
                        </span>

                        {/* Favorite Badge */}
                        {skill.isFavourite && (
                          <FaHeart className='absolute -right-1 -top-1 h-3 w-3 animate-pulse text-red-500' />
                        )}
                      </div>

                      {/* Skill Level Dots */}
                      <div className='absolute -bottom-6 left-1/2 flex -translate-x-1/2 transform gap-1'>
                        {[1, 2, 3, 4, 5].map((dot) => (
                          <div
                            key={dot}
                            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                              dot <= skill.rating
                                ? skill.isFavourite
                                  ? 'bg-blue-400'
                                  : 'bg-gray-400 dark:bg-gray-600'
                                : 'bg-gray-200 dark:bg-gray-800'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          // Cards View
          <div className='space-y-12'>
            {skillCategories.map((category, catIndex) => (
              <div key={category.name} className='space-y-6'>
                <div className='flex items-center justify-center gap-3'>
                  <category.icon
                    className={`h-6 w-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}
                  />
                  <h3 className='text-2xl font-bold'>{category.name}</h3>
                </div>

                <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                  {category.skills.map((skill, index) => {
                    const Icon = getSkillIcon(skill.title)

                    return (
                      <div
                        key={skill.id}
                        className={`special-border glass-card group relative cursor-pointer p-4 text-center transition-all duration-300 hover:-translate-y-2 hover:scale-105 ${
                          skill.isFavourite
                            ? 'border-blue-400/50 bg-gradient-to-br from-blue-500/20 to-cyan-500/20'
                            : 'border-white/10 bg-white/5 dark:bg-gray-900/20'
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <Icon
                          className={`mx-auto mb-3 h-8 w-8 ${
                            skill.isFavourite
                              ? 'text-blue-400'
                              : 'text-gray-600 dark:text-gray-400'
                          }`}
                        />
                        <h4 className='mb-3 text-sm font-medium'>
                          {skill.title}
                        </h4>

                        {/* Progress Bar */}
                        <div className='mb-2 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700'>
                          <div
                            className={`h-1.5 rounded-full transition-all duration-1000 ${
                              skill.isFavourite
                                ? 'bg-gradient-to-r from-blue-400 to-cyan-400'
                                : `bg-gradient-to-r ${category.color}`
                            }`}
                            style={{ width: `${(skill.rating / 5) * 100}%` }}
                          />
                        </div>

                        <span className='text-xs text-gray-500'>
                          {skill.rating}/5 level
                        </span>

                        {/* Favorite Badge */}
                        {skill.isFavourite && (
                          <div className='absolute -right-2 -top-2 rounded-full bg-red-500 p-1'>
                            <FaHeart className='h-3 w-3 text-white' />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className='mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-6 md:grid-cols-4'>
          {[
            {
              label: 'Total Skills',
              value: skills.data.length,
              icon: FaCode,
              color: 'blue',
            },
            {
              label: 'Favorite',
              value:
                skills.data.find((s) => s.isFavourite)?.title || 'Flutter',
              icon: FaHeart,
              color: 'red',
            },
            {
              label: 'Years Exp',
              value: '5+',
              icon: FaRocket,
              color: 'purple',
            },
            { label: 'Projects', value: '20+', icon: FaStar, color: 'yellow' },
          ].map((stat, index) => (
            <div
              key={index}
              className='special-border glass-card bg-white/5 p-6 text-center backdrop-blur-lg dark:bg-gray-900/20'
            >
              <stat.icon
                className={`mx-auto mb-3 h-8 w-8 text-${stat.color}-500`}
              />
              <div className='mb-1 text-2xl font-bold'>{stat.value}</div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .clip-hexagon {
          clip-path: polygon(
            30% 0%,
            70% 0%,
            100% 50%,
            70% 100%,
            30% 100%,
            0% 50%
          );
        }
      `}</style>
    </section>
  )
}
