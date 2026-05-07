
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  excerpt?: string;
  content: string; // HTML string from your backend
}

export interface AdminCreatePostFormValues {
  title: string
  slug: string
  date: string
  coverImage: string
  excerpt?: string
  content: string
}

export interface AdminCreatePostPayload {
  title: string
  slug: string
  excerpt?: string
  content: string
  cover_image: string
  published_at: string
  status: 'draft' | 'published'
}

export interface AdminPost {
  id: number
  title: string
  slug: string
  excerpt?: string | null
  content: string
  cover_image?: string | null
  published_at?: string | null
  status?: 'draft' | 'published'
}