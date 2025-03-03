export interface Post {
    id: string;
    authorId?: string | null;
    isAI: boolean;
    title: string;
    slug:string;
    excerpt?: string;
    content: string;
    media: {
      url: string;
      type: "image" | "video";
    }[];
    tags: string[];
    reactions: {
      userId: string;
      reactionType: "like" | "love" | "haha" | "sad" | "angry";
    }[];
    comments: string[];
    shares: string[];
    status: "public" | "friends" | "private";
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

  /** Kiểu dữ liệu cho request tạo bài viết */
  export interface CreatePostRequest {
    title?: string;
    content: string;
    media?: { url: string; type: "image" | "video" }[];
    tags?: string[];
    status?: "public" | "friends" | "private";
    location?: string;
    feeling?: string;
    isAI?: boolean;
  }

  /** Kiểu dữ liệu cho response khi tạo bài viết */
  export interface CreatePostResponse {
    success: boolean;
    message: string;
    post: Post;
  }
