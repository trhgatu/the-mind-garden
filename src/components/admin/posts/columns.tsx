"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Post } from "@/shared/types/post";
import { ActionButtons } from "@/components/admin/posts/action-buttons";

export const columns: ColumnDef<Post>[] = [
    {
        accessorKey: "title",
        header: "Tiêu đề",
        cell: ({ row }) => {
            const title = row.getValue("title") as string;
            return (
                <div className="truncate max-w-[250px]" title={title}>
                    {title.length > 100 ? title.slice(0, 100) + "..." : title}
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
        accessorKey: "categoryId",
        header: "Danh mục",
        cell: ({ row }) => {
            const category = row.original.categoryId;

            return <span>{category?.name || "Không có danh mục"}</span>
        },
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <span
                    className={`px-2 py-1 rounded-md text-sm font-medium ${
                        status === "published"
                            ? "bg-green-200 text-green-800"
                            : "bg-gray-200 text-gray-800"
                    }`}
                >
                    {status === "published" ? "Công khai" : "Nháp"}
                </span>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "Ngày đăng",
        cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
        id: "actions",
        header: "Hành động",
        cell: ({ row }) => <ActionButtons post={row.original} />,
    },
];
