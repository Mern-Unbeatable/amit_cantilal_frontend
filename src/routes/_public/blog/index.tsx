import { createFileRoute } from '@tanstack/react-router'
import type { BlogPost } from '@/features/blogs/blog.types.ts'
import { PageHero } from '@/components/shared/page-hero.tsx'
import BlogCard from '@/features/blogs/blog-card.tsx'
import { mainTransitionProps } from '@/lib/utils.ts'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/_public/blog/')({
  component: RouteComponent,
})

// Replace with real API data later
const MOCK_POSTS: Array<BlogPost> = [
  {
    slug: 'private-chauffeur-portugal',
    title: 'Private Chauffeur in Portugal | VIP On Wheels',
    date: '15 de março de 2026',
    coverImage:
      'https://oxfsueyteipbhutgofeg.supabase.co/storage/v1/object/public/blog-images/1773591971159-3f2jsxl5hha.jpg',
    excerpt:
      'What it is, advantages, and when it makes sense to choose a private chauffeur service in Portugal.',
    content: '',
  },
]

function RouteComponent() {
  return (
    <motion.div {...mainTransitionProps}>
      <PageHero
        title="Blog"
        subtitle="News, tips and stories from our journeys"
      />

      <section className="py-10 md:py-24 bg-[#0B0B0B]">
        <div className="container mx-auto px-4 md:px-12">
          {/* Header */}
          <div className="mb-8 md:mb-14">
            <div className="tag-gold mb-4">Latest</div>
            <h2 className="font-serif text-2xl md:text-4xl font-light text-gradient-gold">
              From the <em className="italic">Journal</em>
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {MOCK_POSTS.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
