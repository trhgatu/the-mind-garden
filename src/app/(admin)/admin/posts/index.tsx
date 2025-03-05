"use client";

import { useState, useEffect } from "react";
import { useFetch } from "@/shared/hooks/useFetch";
import { DataTable } from "@/components/admin/posts/data-table";
import { columns } from "@/components/admin/posts/columns";
import { Post } from "@/shared/types/post";
import { Breadcrumbs } from "@/components/admin/bread-crumb";
import { CreatePostButton } from "@/components/admin/posts/create-post-button";

export function PostsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { data, isLoading, isError } = useFetch<{ data: Post[]; meta: { pagination: { totalPages: number } } }>({
        url: `/posts?page=${currentPage}&limit=7`,
    });

    const posts: Post[] = data?.data ?? [];
    const pagination = data?.meta?.pagination;

    useEffect(() => {
        if (pagination) {
            setTotalPages(pagination.totalPages);
        }
    }, [pagination]);

    if (isLoading) return <p className="text-center text-gray-600">Đang tải...</p>;
    if (isError) return <p className="text-center text-red-500">Có lỗi xảy ra khi tải bài viết!</p>;

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
    };

    return (
        <main>
            <header className="flex h-16 shrink-0 justify-between items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <Breadcrumbs items={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Quản lý bài viết" }]} />
                <CreatePostButton/>
            </header>
            <DataTable columns={columns} data={posts} totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </main>
    );
}
