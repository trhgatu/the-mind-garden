import Image from "next/image";
import { Post } from "@/shared/types";
import { formatDate } from "@/shared/utils";
import Link from "next/link";

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    const media = post.media?.[0];

    return (
        <div className="flex gap-4 p-4 transition-shadow">
            <Link href={`/post/${post.slug}`} className="flex gap-4">
                <div className="w-32 h-24 relative flex-shrink-0">
                    {media ? (
                        media.type === "image" ? (
                            <Image
                                src={media.url}
                                alt={post.title}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-md"
                                loading="lazy"
                            />
                        ) : (
                            <video className="w-full h-full object-cover rounded-md" controls>
                                <source src={media.url} type="video/mp4" />
                                Trình duyệt của bạn không hỗ trợ video.
                            </video>
                        )
                    ) : (
                        <Image
                            src="/default-thumbnail.jpg"
                            alt="Default thumbnail"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                        />
                    )}
                </div>
                <div className="flex flex-col justify-between flex-1">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{post.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                        📅 {formatDate(post.createdAt)}
                    </div>
                </div>
            </Link>
        </div>
    );
}
