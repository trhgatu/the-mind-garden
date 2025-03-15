import { Post } from "@/shared/types/post";

export interface User {
    _id: string;
    name: string;
    username: string;
    nickname?:string;
    email: string;
    avatar?: string;
    coverPhoto?: string;
    bio?: string;
    location?: string;
    website?: string;
    createdAt: Date;
    posts: Post
  }