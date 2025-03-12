import Image from "next/image";
import { Post } from "@/shared/types";
import Link from "next/link";
import { CalendarIcon } from "lucide-react";
import { formatDistance } from "date-fns";
import { vi } from "date-fns/locale";

interface EnhancedPostCardProps {
    post: Post;
    className?: string;
    variant?: "default" | "compact" | "featured";
}

export function EnhancedPostCard({
    post,
    className = "",
    variant = "default",
}: EnhancedPostCardProps) {
    if (!post) return null;

    const thumbnail = post.thumbnail || "https://dummyimage.com/600x400/d9d9d9/fff&text=%E1%BA%A2nh+kh%C3%B4ng+t%E1%BB%93n+t%E1%BA%A1i";
    const date = post.createdAt ? formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true, locale: vi }) : "";
    const category = post.categoryId?.name || "Chưa phân loại";

    return (
        <div
            className={`group bg-accent rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}
        >
            <Link href={`/post/${post.slug}`} className="flex flex-row h-full">
                {/* Left column - Image */}
                <div className="relative w-1/3 min-h-full overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src={thumbnail}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                    </div>
                    {/* Category badge */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-primary text-white text-xs font-medium">
                        <span>{category}</span>
                    </div>
                </div>

                {/* Right column - Content */}
                <div className="w-2/3 p-4 flex flex-col justify-center">
                    <h3 className={`${variant === "compact" ? "text-base" : "text-lg"} font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300`}>
                        {post.title}
                    </h3>

                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                        <div className="flex items-center">
                            <CalendarIcon size={14} className="mr-1" />
                            <span>{date}</span>
                        </div>
                    </div>

                    {variant !== "compact" && (
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                            {post.excerpt}
                        </p>
                    )}
                </div>
            </Link>
        </div>
    );
}