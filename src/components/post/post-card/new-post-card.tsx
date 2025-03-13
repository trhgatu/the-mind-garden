'use client';

import Image from "next/image";
import Link from "next/link";
import { Post } from "@/shared/types";
import { lora } from "@/shared/fonts/fonts";

interface NewPostCardProps {
  post: Post;
  className?: string;
  variant?: "default" | "compact" | "featured";
}

export function NewPostCard({
  post,
  className = "",
  variant = "default",
}: NewPostCardProps) {
  if (!post) return null;

  const thumbnail = post.thumbnail || "https://dummyimage.com/600x400/d9d9d9/fff&text=%E1%BA%A2nh+kh%C3%B4ng+t%E1%BB%93n+t%E1%BA%A1i";
  return (
    <div className={`group transform transition-transform hover:scale-[1.02] hover:rotate-1 overflow-hidden shadow-md border-[#e8d9c0] bg-[#f9f3e8] border-4 duration-300 relative ${className} shadow-md hover:shadow-lg`}>
      <Link href={`/post/${post.slug}`} className="flex flex-row h-full">
        <div className="relative w-1/3 min-h-full overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={thumbnail}
              alt={post.title}
              fill
              className="object-cover duration-500 sepia-[0.2]"
              loading="lazy"
            />
          </div>
        </div>
        <div className="w-2/3 p-4 flex flex-col justify-center relative">
          <h3 className={`${lora.className} ${variant === "compact" ? "text-base" : "text-lg"} font-bold text-[#614e3a] mb-2 line-clamp-2 group-hover:text-[#a83240] transition-colors duration-300`}>
            {post.title}
          </h3>
          {variant !== "compact" && (
            <p className="text-[#7d6e5b] text-sm line-clamp-2">
              {post.excerpt}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}