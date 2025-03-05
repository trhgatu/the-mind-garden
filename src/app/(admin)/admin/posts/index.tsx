"use client"

import { columns } from '@/components/admin/posts/columns'
import { DataTable } from '@/components/admin/posts/data-table'
import { useFetch } from '@/shared/hooks/useFetch'
import { Post } from '@/shared/types/post'

export function PostsPage() {
    const {data, isLoading, isError} = useFetch<{data: Post[]}>({
        url: "/posts",
    });
    const posts: Post[] = data?.data ?? [];
    if (isLoading) return <p className="text-center text-gray-600">Đang tải...</p>;
  if (isError) return <p className="text-center text-red-500">Có lỗi xảy ra khi tải bài viết!</p>;
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={posts} />
        </div>
    )

}
