import { Post } from "@/shared/types";
import { BasePostCard } from "@/components/post/post-card/base-post-card";

interface GridPostCardProps {
    post: Post;
}

export function GridPostCard({ post }: GridPostCardProps) {
    return (
        <BasePostCard
            post={post}
            className="bg-white border border-gray-200"
            imageClassName="w-full h-56"
            titleClassName="text-xl font-bold"
            excerptClassName="text-base"
        />
    );
}
