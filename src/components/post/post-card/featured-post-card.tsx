import { Post } from "@/shared/types";
import { BasePostCard } from "@/components/post/post-card/base-post-card";

interface FeaturedPostCardProps {
    post: Post;
}

export function FeaturedPostCard({ post }: FeaturedPostCardProps) {
    return (
        <BasePostCard
            post={post}
            className="p-4"
            imageClassName="w-full h-52 object-cover rounded-md mb-3"
            titleClassName="text-lg font-semibold text-textPrimary truncate"
            excerptClassName="text-textSecondary text-sm line-clamp-3"
        />
    );
}
