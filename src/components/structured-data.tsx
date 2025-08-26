export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Pranta Dutta',
    jobTitle: 'Full Stack Developer',
    description:
      'Skilled full-stack developer with 3+ years of experience in Flutter, React Native, and modern web technologies.',
    url: 'https://pranta.dev',
    image: 'https://pranta.dev/profile.png',
    sameAs: [
      'https://github.com/prantadutta',
      'https://linkedin.com/in/prantadutta',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bangladesh',
    },
    email: 'prantadutta1997@gmail.com',
    knowsAbout: [
      'Flutter',
      'React Native',
      'JavaScript',
      'TypeScript',
      'React.js',
      'Next.js',
      'Node.js',
      'Mobile Development',
      'Web Development',
      'Full Stack Development',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Full Stack Developer',
      occupationLocation: {
        '@type': 'Country',
        name: 'Bangladesh',
      },
      skills: [
        'Flutter Development',
        'React Native Development',
        'Web Development',
        'Mobile App Development',
        'JavaScript Programming',
        'TypeScript Programming',
      ],
    },
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
