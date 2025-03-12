import Image from "next/image";
import { Post } from "@/shared/types";
import Link from "next/link";

interface PostCardWithCategoriesProps {
    post: Post;
}

export function PostCardWithCategories({ post }: PostCardWithCategoriesProps) {
    if (!post) return null;
    const thumbnail = post.thumbnail || "https://dummyimage.com/600x400/d9d9d9/fff&text=%E1%BA%A2nh+kh%C3%B4ng+t%E1%BB%93n+t%E1%BA%A1i";

    return (
        <div className="bg-[#f9f3e8] p-4 rounded-md shadow-md flex flex-col items-center text-center">
            <Link href={`/post/${post.slug}`} className="w-full">
                <div className="relative w-full h-32 mb-4">
                    <Image
                        src={thumbnail}
                        alt={post.title}
                        width={256}
                        height={128}
                        className="rounded-lg object-cover w-full h-full"
                        loading="lazy"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="line-clamp-1 text-[#614e3a] font-bold text-lg">{post.title}</h3>
                    <p className="line-clamp-2 text-sm text-[#614e3a]">{post.excerpt}</p>
                </div>
            </Link>
        </div>
    );
}