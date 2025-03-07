import { Category } from "@/shared/types/category";

export interface Post {
    id: string;
    authorId?: string | null;
    categoryId: Category;
    isAI: boolean;
    title: string;
    slug:string;
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
