"use client";

import Link from "next/link";
import { useFetch } from "@/shared/hooks/useFetch";
import { Post } from "@/shared/types/post";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const FeaturedPosts = () => {
  const { data, isLoading, isError } = useFetch<{ data: Post[] }>({
    url: "/posts?featured=true",
  });

  const posts = data?.data;

  if (isLoading) return <p className="text-center text-gray-600">Đang tải...</p>;
  if (isError) return <p className="text-center text-red-500">Có lỗi xảy ra khi tải bài viết!</p>;

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-primary text-center mb-6">
          Bài viết nổi bật 🌟
        </h2>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full mx-auto">
          <CarouselContent className="flex gap-5">
            {posts?.map((post) => (
              <CarouselItem key={post.id} className="md:basis-1/4">
                <Link
                  href={`/post/${post.slug}`}
                >
                  <div className="overflow-hidden transition-all duration-300">
                    <div className="p-4">
                      {post.media.length > 0 && (
                        <Image
                          src={post?.media[0].url}
                          alt={post?.title || "Hình ảnh bài viết"}
                          width={600}
                          height={300}
                          className="w-full h-52 object-cover rounded-md mb-3"
                        />
                      )}

                      <h3 className="text-lg font-semibold text-textPrimary truncate">
                        {post?.title}
                      </h3>

                      <p className="text-textSecondary text-sm line-clamp-3">
                        {post?.excerpt || "Không có mô tả."}
                      </p>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedPosts;
