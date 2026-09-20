// src/features/blogs/blog.types.ts

export interface BlogPost {
  slug: string
  title: string
  date: string // formatted, mapped from published_at
  coverImage: string
  excerpt?: string
  content: string
  author?: string
}

export interface AdminPost {
  id: number
  title: string
  slug: string
  excerpt?: string | null
  content: string
  cover_image?: string | null
  author?: string | null
  published_at?: string | null
  created_at: string
  updated_at: string
}

export type PostStatus = 'draft' | 'published'

export interface AdminCreatePostPayload {
  title: string
  excerpt?: string
  content: string
  cover_image?: File | null
  author?: string
  published_at?: string | null // null = save as draft
}

export interface AdminUpdatePostPayload extends Partial<AdminCreatePostPayload> {}

export interface PaginatedPosts {
  data: Array<AdminPost>
  pagination: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}
