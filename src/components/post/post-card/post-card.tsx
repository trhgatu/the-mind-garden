import Image from "next/image";
import { Post } from "@/shared/types";
import { formatDate } from "@/shared/utils";
import Link from "next/link";

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    const thumbnail = post.thumbnail;
    if (!post) {
        return null;
    }

    return (
        <div className="flex gap-4 p-4 bg-accent rounded-lg shadow-md transition-shadow">
            <Link href={`/post/${post.slug}`} className="flex gap-4">
                <div className="w-32 h-24 relative flex-shrink-0">
                    <Image
                        src={thumbnail || "/default-thumbnail.jpg"}
                        alt={post.title}
                        width={600}
                        height={300}
                        objectFit="cover"
                        className="rounded-md"
                        loading="lazy"
                    />
                </div>
                <div className="flex flex-col justify-between flex-1">
                    <div>
                        <h3 className="text-lg line-clamp-1 font-bold">{post.title}</h3>
                        <p className="text-sm line-clamp-2">{post.excerpt}</p>
                    </div>
                    <div className="text-sm">
                        {formatDate(post.createdAt)}
                    </div>
                </div>
            </Link>
        </div>
    );
}
