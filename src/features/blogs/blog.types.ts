
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  excerpt?: string;
  content: string; // HTML string from your backend
}