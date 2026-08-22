import { Link, createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar } from 'lucide-react'
import { mainTransitionProps } from '@/lib/utils.ts'
import { usePublicPost } from '@/features/blogs/blog.hooks.ts'

export const Route = createFileRoute('/_public/blog/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  const { slug } = Route.useParams()
  const { data: post, isLoading } = usePublicPost(slug)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-black">
        <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
      </div>
    )
  }

  if (!post) return null

  return (
    <motion.div {...mainTransitionProps}>
      <div className="w-full h-[40vh] md:h-[55vh] relative">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/30 to-transparent" />
      </div>

      <div className="bg-[#0B0B0B] relative z-10">
        <div className="container mx-auto px-4 md:px-12 max-w-3xl -mt-16 md:-mt-24 pb-16 md:pb-24">
          <div className="bg-[#0B0B0B] pt-6 md:pt-10">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs text-[#9A9182] hover:text-[#C9A84C] transition-colors duration-150 mb-8 md:mb-10"
            >
              <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
              Back to Blog
            </Link>

            <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl font-light text-white leading-snug mb-4 md:mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-2 text-[#9A9182] text-xs mb-8 md:mb-12 pb-8 md:pb-12 border-b border-[#C9A84C]/12">
              <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>{post.date}</span>
              {post.author && (
                <>
                  <span className="text-[#C9A84C]/30">·</span>
                  <span>{post.author}</span>
                </>
              )}
            </div>

            <article
              className="
                prose prose-invert max-w-none
                prose-headings:font-serif prose-headings:font-light prose-headings:text-[#C9A84C]
                prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
                prose-p:text-[#9A9182] prose-p:leading-relaxed prose-p:text-sm md:prose-p:text-base
                prose-a:text-[#C9A84C] prose-a:no-underline hover:prose-a:underline prose-a:transition-colors
                prose-strong:text-white/90 prose-strong:font-medium
                prose-img:rounded-none prose-img:border prose-img:border-[#C9A84C]/12
                prose-li:text-[#9A9182] prose-li:text-sm
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
