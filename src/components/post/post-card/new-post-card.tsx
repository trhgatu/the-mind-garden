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

  // Subtle random rotation between -2 and 2 degrees for a natural look
  const randomRotation = Math.floor(Math.random() * 5) - 2;

  const thumbnail = post.thumbnail || "https://dummyimage.com/600x400/d9d9d9/fff&text=%E1%BA%A2nh+kh%C3%B4ng+t%E1%BB%93n+t%E1%BA%A1i";

  return (
    <div
      className={`group transform transition-all duration-300 overflow-hidden rounded-sm hover:scale-105 hover:shadow-xl relative ${className}`}
      style={{
        transform: `rotate(${randomRotation}deg)`,
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      }}
    >
      {/* Background texture for the sticky note */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/assets/images/sticky_note_texture.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.9
        }}
      />

      <Link href={`/post/${post.slug}`} className="flex flex-col h-full relative z-10">
        {/* Subtle tape at the top of the sticky note */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-5 rounded-b-sm z-10"
          style={{
            backgroundImage: "url('/assets/images/tape_texture.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.7
          }}
        ></div>

        {/* Shadow effect along the edges to create depth */}
        {/* <div className="absolute inset-0 pointer-events-none shadow-inner"
          style={{
            boxShadow: 'inset 0 0 15px rgba(0,0,0,0.1), inset 0 0 5px rgba(0,0,0,0.2)'
          }}
        ></div> */}

        {/* Content area with padding */}
        <div className="p-6 flex flex-col justify-center flex-grow relative">
          {/* Ruled lines overlay */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 24px, rgba(139,106,74,0.15) 24px, rgba(139,106,74,0.15) 25px)',
            backgroundPosition: '0 1.3rem',
            pointerEvents: 'none'
          }}></div>

          {/* Thumbnail as a small polaroid-style image pinned to the note */}
          <div className="relative w-24 h-24 mb-4 mx-auto overflow-hidden border-4 border-white shadow-md transform rotate-2">
            <Image
              src={thumbnail}
              alt={post.title}
              fill
              className="object-cover"
              loading="lazy"
            />
            {/* Polaroid texture overlay */}
            <div className="absolute inset-0" style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.25), transparent 50%, rgba(0,0,0,0.1))",
              pointerEvents: "none"
            }}></div>
          </div>

          <h3 className={`${lora.className} ${variant === "compact" ? "text-base" : "text-lg"} font-bold text-amber-900 mb-3 line-clamp-2 group-hover:text-amber-800 transition-colors duration-300 text-center`}
            style={{ textShadow: '0 1px 0 rgba(255,255,255,0.5)' }}>
            {post.title}
          </h3>

          {variant !== "compact" && (
            <p className="text-amber-800 text-sm line-clamp-2 italic text-center">
              {post.excerpt}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}