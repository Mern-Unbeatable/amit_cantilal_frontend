import { Link, createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar } from 'lucide-react'
import type { BlogPost } from '@/features/blogs/blog.types.ts'
import { mainTransitionProps } from '@/lib/utils.ts'

const MOCK_POST: BlogPost = {
  slug: "private-chauffeur-portugal",
  title: "Private Chauffeur in Portugal | VIP On Wheels",
  date: "15 de março de 2026",
  coverImage: "https://oxfsueyteipbhutgofeg.supabase.co/storage/v1/object/public/blog-images/1773591971159-3f2jsxl5hha.jpg",
  content: `<h2>Private Chauffeur in Portugal...</h2><p>Your HTML content here.</p>`,
};

export const Route = createFileRoute('/_public/blog/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <motion.div {...mainTransitionProps}>
      {/* Cover image — overlapped by content like competitor */}
      <div className="w-full h-[40vh] md:h-[55vh] relative">
        <img
          src={MOCK_POST.coverImage}
          alt={MOCK_POST.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/30 to-transparent" />
      </div>

      {/* Content card — pulls up over image */}
      <div className="bg-[#0B0B0B] relative z-10">
        <div className="container mx-auto px-4 md:px-12 max-w-3xl -mt-16 md:-mt-24 pb-16 md:pb-24">
          <div className="bg-[#0B0B0B] pt-6 md:pt-10">
            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs text-[#9A9182] hover:text-[#C9A84C] transition-colors duration-150 mb-8 md:mb-10"
            >
              <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
              Back to Blog
            </Link>

            {/* Title */}
            <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl font-light text-white leading-snug mb-4 md:mb-6">
              {MOCK_POST.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-2 text-[#9A9182] text-xs mb-8 md:mb-12 pb-8 md:pb-12 border-b border-[#C9A84C]/12">
              <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>{MOCK_POST.date}</span>
            </div>

            {/* Body */}
            <article
              className="
                prose prose-invert max-w-none
                prose-headings:font-serif prose-headings:font-light prose-headings:text-gradient-gold
                prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
                prose-p:text-[#9A9182] prose-p:leading-relaxed prose-p:text-sm md:prose-p:text-base
                prose-a:text-[#C9A84C] prose-a:no-underline hover:prose-a:underline prose-a:transition-colors
                prose-strong:text-white/90 prose-strong:font-medium
                prose-img:rounded-none prose-img:border prose-img:border-[#C9A84C]/12
                prose-li:text-[#9A9182] prose-li:text-sm
              "
              dangerouslySetInnerHTML={{ __html: MOCK_POST.content }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
