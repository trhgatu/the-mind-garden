"use client"

import { useParams } from "next/navigation";
import { useFetch } from "@/shared/hooks/useFetch";
import { Post } from "@/shared/types/post";
import PostContent from "@/components/post/post-content/post-content";

export function PostPage() {
    const { slug } = useParams();
    const { data, isLoading, isError } = useFetch<{ post: Post }>({
        url: `/posts/${slug}`,
    });

    if (isLoading) return <p>Đang tải bài viết...</p>;
    if (isError) return <p>Có lỗi xảy ra khi tải bài viết!</p>;
    if (!data) return <p>Bài viết không tồn tại.</p>;

    const post = data.post;

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl text-center font-bold mb-4">{post.title}</h1>
            <div className="max-w-5xl mx-auto">
            <PostContent content={post.content} />
            </div>
        </div>
    );
}

export default PostPage;
