import { Category } from "@/shared/types/category";

export interface Post {
  _id: string;
  authorId?: string | null;
  categoryId: Category;
  isAI: boolean;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail?: string;
  tags: string[];
  reactions: {
    userId: string;
    reactionType: "like" | "love" | "haha" | "sad" | "angry";
  }[];
  comments: string[];
  shares: string[];
  status: "published" | "draft";
  location?: string;
  feeling?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  isDel: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface GetPostResponse {
  success: boolean;
  data: {
    post: Post;
  };
}

export interface CreatePostRequest {
  title: string;
  content: string;
  thumbnail?: string;
  excerpt: string;
  categoryId: string,
  tags?: string[];
  status: "published" | "draft";
  location?: string;
  feeling?: string;
  isAI?: boolean;
}

export interface CreatePostResponse {
  success: boolean;
  message: string;
  post: Post;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  thumbnail?: string;
  excerpt?: string;
  categoryId?: string;
  tags?: string[];
  status?: "published" | "draft";
  location?: string;
  feeling?: string;
  isAI?: boolean;
}

export interface UpdatePostResponse {
  success: boolean;
  message: string;
  post: Post;
}

export interface DeletPostResponse {
  success: boolean;
  message: string;
  post:Post
}