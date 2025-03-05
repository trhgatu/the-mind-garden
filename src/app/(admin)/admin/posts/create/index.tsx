'use client'

import { PostCreateForm } from "@/components/admin/forms/post-create-form";

export function CreatePostPage() {
    const handleSuccess = () => {
        console.log("Bài viết đã được tạo thành công!");
    };

    return (
        <main>
            <PostCreateForm onSuccess={handleSuccess} />
        </main>
    );
}
