"use client";

import { useFetch } from "@/shared/hooks";
import { Post } from "@/shared/types/post";
import { playfairDisPlay } from "@/shared/fonts/fonts";
import { EnhancedPostCard } from "@/components/post/post-card/enhanced-post-card";

const FeaturedPosts = () => {
  const { data, isLoading, isError } = useFetch<{ data: Post[]; meta: { pagination: { totalPages: number } } }>({
    entity: `posts`,
    options: {
      queryKey: ["posts", { status: "published", featured: true, limit: 5, sort: "-createdAt" }],
    },
  });

  const posts = data?.data;

  if (isLoading) return (
    <div className="flex items-center justify-center py-16">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (isError) return (
    <div className="text-center py-16">
      <p className="text-red-500 font-semibold text-lg">Có lỗi xảy ra khi tải bài viết!</p>
      <button className="mt-4 px-5 py-2.5 bg-primary text-white rounded-lg shadow-md hover:bg-primary/90 transition-all">
        Thử lại
      </button>
    </div>
  );

  if (!posts || posts.length === 0) return (
    <div className="text-center py-16">
      <p className="text-gray-500 text-lg">Không có bài viết nổi bật.</p>
    </div>
  );

  return (
    <section className="relative py-8 px-6">
      <div className="max-w-full">
        <div className="md:max-w-7xl mx-auto">
          <div className="flex justify-between items-center pb-4">
            <h2
              className={`relative text-2xl ${playfairDisPlay.className} font-bold text-primary after:block after:w-24 after:h-[3px] after:bg-primary after:mt-2`}
            >
              Nổi bật
            </h2>
            <a href="/posts" className="text-primary hover:underline text-base font-medium">
              Xem tất cả
            </a>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <EnhancedPostCard key={post.slug} post={post} variant="featured" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
