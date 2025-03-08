"use client";

import { useRouter } from "next/navigation";
import { Trash, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeletPostResponse, Post } from "@/shared/types/post";
import { toast } from "sonner";
import { useCRUD } from "@/shared/hooks/useCRUD";
import { useQueryClient } from "@tanstack/react-query";

interface ActionButtonsProps {
    post: Post;
}

export function ActionButtons({ post }: ActionButtonsProps) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const handleEdit = () => {
        router.push(`/admin/posts/edit/${post.slug}`);
    };

    const softDeleteMutation = useCRUD<{ id: string }, DeletPostResponse>({
        entity: "posts",
        method: "DELETE",
        body: { id: post._id },
        onSuccess: () => {
            toast.success("Xóa bài viết thành công!");
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: () => {
            toast.error("Lỗi khi xóa bài viết!");
        },
    });


    const hardDeleteMutation = useCRUD<{ id: string }, DeletPostResponse>({
        entity: "posts",
        method: "DELETE",
        body: { id: post._id },
        isHardDelete: true,
        onSuccess: () => {
            toast.success("Đã xóa vĩnh viễn bài viết!");
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: () => {
            toast.error("Lỗi khi xóa vĩnh viễn bài viết!");
        },
    });

    return (
        <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleEdit} className="flex items-center gap-1">
                <Edit size={16} />
                Sửa
            </Button>

            <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                    if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
                        softDeleteMutation.mutate();
                    }
                }}
                className="flex items-center gap-1"
                disabled={softDeleteMutation.isPending}
            >
                <Trash size={16} />
                {softDeleteMutation.isPending ? "Đang xóa..." : "Xóa"}
            </Button>

            <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                    if (confirm("Bạn có chắc chắn muốn xóa vĩnh viễn bài viết này? Hành động này không thể hoàn tác!")) {
                        hardDeleteMutation.mutate();
                    }
                }}
                className="flex items-center gap-1 bg-red-700 hover:bg-red-800"
                disabled={hardDeleteMutation.isPending}
            >
                <Trash2 size={16} />
                {hardDeleteMutation.isPending ? "Đang xóa vĩnh viễn..." : "Xóa vĩnh viễn"}
            </Button>
        </div>
    );
}
