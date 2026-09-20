import { Link } from '@tanstack/react-router'
import { ArrowRight, Calendar } from 'lucide-react'
import type { BlogPost } from '@/features/blogs/blog.types.ts'

interface BlogCardProps {
  post: BlogPost
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block">
      <article className="bg-[#141414] border border-[#C9A84C]/12 group-hover:border-[#C9A84C]/35 transition-colors duration-200 h-full flex flex-col">
        {/* Image */}
        <div className="aspect-video overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 flex flex-col flex-1">
          {/* Date */}
          <div className="flex items-center gap-2 text-[#9A9182] text-xs mb-3">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
            <span>{post.date}</span>
          </div>

          {/* Title */}
          <h2 className="font-serif text-base md:text-xl font-light text-white/90 group-hover:text-[#C9A84C] transition-colors duration-200 line-clamp-2 mb-2 md:mb-3">
            {post.title}
          </h2>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xs text-[#9A9182] leading-relaxed line-clamp-2 mb-4 flex-1">
              {post.excerpt}
            </p>
          )}

          {/* Read more */}
          <div className="flex items-center gap-2 text-[#C9A84C] text-xs mt-auto pt-4 border-t border-[#C9A84C]/10">
            <span>Read More</span>
            <ArrowRight
              className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200"
              strokeWidth={1.5}
            />
          </div>
        </div>
      </article>
    </Link>
  )
}

export default BlogCard
