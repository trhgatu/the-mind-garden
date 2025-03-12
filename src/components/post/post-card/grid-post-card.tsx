import { Post } from "@/shared/types";
import { BasePostCard } from "@/components/post/post-card/base-post-card";

interface GridPostCardProps {
    post: Post;
}

export function GridPostCard({ post }: GridPostCardProps) {
    return (
        <BasePostCard
            post={post}
            imageClassName="w-full h-56"
            titleClassName="text-xl line-clamp-2 font-bold"
            excerptClassName="text-base line-clamp-2"
        />
    );
}
