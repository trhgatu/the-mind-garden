"use client"

import { useParams } from "next/navigation";
import { useFetch } from "@/shared/hooks/useFetch";
import { Post } from "@/shared/types/post";

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
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-600">{post.content}</p>
        </div>
    );
}

export default PostPage;
