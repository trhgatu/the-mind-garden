"use client";

import Link from "next/link";
import { useFetch } from "@/shared/hooks/useFetch";
import { Post } from "@/shared/types/post";
import Image from "next/image";

const FeaturedPosts = () => {
  const { data, isLoading, isError } = useFetch<{ data: Post[] }>({
    url: "/posts?featured=true",
  });
  const posts = data?.data
  if (isLoading) return <p>Đang tải...</p>;
  if (isError) return <p>Có lỗi xảy ra khi tải bài viết!</p>;

  return (
    <section className="py-10">
      <h2 className="text-2xl font-semibold mb-5">Bài viết nổi bật</h2>
      <div className="grid md:grid-cols-2 gap-5">
        {posts?.map((post) => (
          <div key={post.id} className="border rounded-lg p-4 hover:shadow-lg transition">
            {post.media.length > 0 && (
              <Image
                src={post?.media[0].url}
                alt={post?.title || "Hình ảnh bài viết"}
                width={600}
                height={300}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
            )}
            <h3 className="text-lg font-semibold">{post?.title}</h3>
            <p className="text-gray-600">{post?.excerpt || "Không có mô tả."}</p>
            <Link href={`/post/${post.slug}`} className="text-blue-500 mt-2 inline-block">
              Đọc tiếp →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPosts;
