"use client";

import { useRouter } from "next/navigation";
import { Trash, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Post } from "@/shared/types/post";

interface ActionButtonsProps {
    post: Post;
}

export function ActionButtons({ post }: ActionButtonsProps) {
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/admin/posts/edit/${post.slug}`);
    };

    /* const handleDelete = async () => {
        if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
            try {
                const response = await fetch(`/api/posts/${post._id}`, {
                    method: "DELETE",
                });

                if (!response.ok) {
                    throw new Error("Xóa bài viết thất bại!");
                }

                alert("Xóa bài viết thành công!");
                window.location.reload();
            } catch (error) {
                alert(error.message);
            }
        }
    }; */

    return (
        <div className="flex gap-2">
            <Button
                variant="outline"
                size="sm"
                onClick={handleEdit}
                className="flex items-center gap-1"
            >
                <Edit size={16} />
                Sửa
            </Button>

            <Button
                variant="destructive"
                size="sm"
                /* onClick={handleDelete} */
                className="flex items-center gap-1"
            >
                <Trash size={16} />
                Xóa
            </Button>
        </div>
    );
}
