"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Post } from "@/shared/types/post"
import { Trash, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Post>[] = [
    {
        accessorKey: "title",
        header: "Tiêu đề",
        cell: ({ row }) => {
            const content = row.getValue("content") as string;
            return (
                <div className="truncate max-w-[250px]" title={content}>
                    {content.length > 100 ? content.slice(0, 100) + "..." : content}
                </div>
            );
        },
    },
    {
        accessorKey: "content",
        header: "Nội dung",
        cell: ({ row }) => {
            const content = row.getValue("content") as string;
            return (
                <div className="truncate max-w-[250px]" title={content}>
                    {content.length > 100 ? content.slice(0, 100) + "..." : content}
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
    },
    {
        accessorKey: "createdAt",
        header: "Ngày đăng",
        cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
        id: "actions",
        header: "Hành động",
        cell: ({ row }) => {
            const post = row.original;

            return (
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(post)}
                        className="flex items-center gap-1"
                    >
                        <Edit size={16} />
                        Sửa
                    </Button>

                    <Button
                        variant="destructive"
                        size="sm"
                        /* onClick={() => handleDelete(post._id)} */
                        className="flex items-center gap-1"
                    >
                        <Trash size={16} />
                        Xóa
                    </Button>
                </div>
            );
        },
    },
];
const handleEdit = (post: Post) => {
    console.log("Chỉnh sửa bài viết:", post);
    // TODO: Hiển thị modal hoặc chuyển đến trang chỉnh sửa
};
