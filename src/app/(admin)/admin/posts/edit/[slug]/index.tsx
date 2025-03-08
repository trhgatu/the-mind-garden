"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { PostForm } from "@/components/admin/forms/post-form";
import { useMutationFetch, useFetch } from "@/shared/hooks";
import { toast } from "sonner";
import { Post } from "@/shared/types/post";
import { GetPostResponse } from "@/shared/types/post";

export function EditPostPage() {
    const router = useRouter();
    const { slug } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const { data, isLoading, error } = useFetch<GetPostResponse>({
        url: `/posts/${slug}`,
    });


    useEffect(() => {
        if (data?.data?.post) {
            setPost(data.data.post);
        }
    }, [data]);



    const mutation = useMutationFetch({
        url: `/posts/${slug}`,
        method: "PUT",
        options: {
            onSuccess: () => {
                toast.success("Cập nhật bài viết thành công!");
                router.push("/admin/posts");
            },
            onError: (error: Error) => {
                toast.error(error.message || "Lỗi khi cập nhật bài viết!");
            },
        },
    });

    if (isLoading) return <p>Đang tải bài viết...</p>;
    if (error) return <p className="text-red-500">Lỗi: {error.message}</p>;
    if (!post) return <p>Bài viết không tồn tại.</p>;

    return <PostForm initialData={{ ...post, categoryId: post.categoryId._id }} onSubmit={(data) => mutation.mutate(data)} />;
}

export default EditPostPage;
