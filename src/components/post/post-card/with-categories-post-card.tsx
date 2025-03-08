import { Post } from "@/shared/types";
import { BasePostCard } from "@/components/post/post-card/base-post-card";

interface PostCardWithCategoriesProps {
    post: Post;
}

export function PostCardWithCategories({ post }: PostCardWithCategoriesProps) {
    return (
        <BasePostCard
            post={post}
            className="bg-foreground/30 p-4 rounded-md shadow-md"
            imageClassName="w-full w-32 h-24"
            linkClassName="flex gap-4"
            titleClassName="line-clamp-1 font-bold"
            excerptClassName="line-clamp-2"
        />
    );
}
