import { DevToArticle } from '@/types/blog-types'
import { SectionHeading } from '@/components/section-heading'
import { SectionMarker } from '@/components/section-marker'
import { BlogCard } from '@/components/blog-card'

interface BlogsProps {
  articles: DevToArticle[]
}

export const Blogs: React.FC<BlogsProps> = ({ articles }) => {
  return (
    <section id='blogs' className='scroll-mt-28'>
      <SectionMarker section='Blogs' threshold={0.3} />
      <SectionHeading>My Blogs</SectionHeading>
      <div className='mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {articles.map((article) => (
          <BlogCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}
