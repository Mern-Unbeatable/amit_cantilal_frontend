import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { PageHero } from '@/components/shared/page-hero.tsx'
import BlogCard from '@/features/blogs/blog-card.tsx'
import { mainTransitionProps } from '@/lib/utils.ts'
import { usePosts } from '@/features/blogs/blog.hooks.ts'

export const Route = createFileRoute('/_public/blog/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isLoading } = usePosts()

  return (
    <motion.div {...mainTransitionProps}>
      <PageHero
        image="/blog-banner.png"
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
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-64 bg-[#141414] animate-pulse" />
              ))
              : data?.posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))
            }
          </div>
        </div>
      </section>
    </motion.div>
  )
}