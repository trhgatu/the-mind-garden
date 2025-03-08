"use client";

import { useRouter } from "next/navigation";
import { PostForm } from "@/components/admin/forms/post-form";
import { useMutationFetch } from "@/shared/hooks";
import { toast } from "sonner";

export function CreatePostPage()
{
    const router = useRouter();
    const mutation = useMutationFetch({
        url: "/posts/create",
        method: "POST",
        options: {
            onSuccess: () => {
                toast.success("Tạo bài viết thành công!");
                router.push("/admin/posts");
            },
            onError: (error: Error) => {
                toast.error(error.message || "Lỗi khi tạo bài viết!");
            },
        },
    });

    return <PostForm onSubmit={(data) => mutation.mutate(data)} />;
}
export default CreatePostPage