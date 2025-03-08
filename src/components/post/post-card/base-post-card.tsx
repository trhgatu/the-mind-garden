import Image from "next/image";
import { Post } from "@/shared/types";
import Link from "next/link";

interface BasePostCardProps {
    post: Post;
    className?: string;
    linkClassName?: string;
    imageClassName?: string;
    titleClassName?: string;
    excerptClassName?: string;
}

export function BasePostCard({
    post,
    className = "",
    imageClassName = "",
    titleClassName = "",
    excerptClassName = "",
    linkClassName = "",
}: BasePostCardProps) {
    if (!post) return null;
    const thumbnail = post.thumbnail || "https://dummyimage.com/600x400/d9d9d9/fff&text=%E1%BA%A2nh+kh%C3%B4ng+t%E1%BB%93n+t%E1%BA%A1i";

    return (
        <div className={`${className}`}>
            <Link href={`/post/${post.slug}`} className={`${linkClassName}`} >
                <div className={`relative ${imageClassName}`}>
                    <Image
                        src={thumbnail}
                        alt={post.title}
                        fill
                        className="rounded-md object-cover"
                        loading="lazy"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className={titleClassName}>{post.title}</h3>
                    <p className={excerptClassName}>{post.excerpt}</p>
                </div>
            </Link>
        </div>
    );
}
