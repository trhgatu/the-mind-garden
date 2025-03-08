"use client";

import Link from "next/link";
import { useFetch } from "@/shared/hooks";
import { Post } from "@/shared/types/post";
import Image from "next/image";
import { playfairDisPlay } from "@/shared/fonts/fonts";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const FeaturedPosts = () => {
  const { data, isLoading, isError } = useFetch<{ data: Post[]; meta: { pagination: { totalPages: number } } }>({
    entity: `posts`,
    options: {
      queryKey: ["posts"],
    },
  });

  const posts = data?.data;

  if (isLoading) return <p className="text-center text-gray-600">Đang tải...</p>;
  if (isError) return <p className="text-center text-red-500">Có lỗi xảy ra khi tải bài viết!</p>;

  return (
    <section className="py-12">
      <div className="mx-auto max-w-full overflow-hidden">
        <div className="md:max-w-7xl mx-auto">
          <p
            className={`relative text-3xl px-4 ${playfairDisPlay.className} font-bold text-primary text-left mb-6 after:block after:w-20 after:h-[3px] after:bg-primary after:mt-2`}
          >
            Nổi bật.
          </p>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full">
            <CarouselContent className="-ml-1">
              {posts?.map((post) => (
                <CarouselItem key={post.slug} className="pl-1 md:basis-1/4">
                  <Link
                    href={`/post/${post.slug}`}
                  >
                    <div className="overflow-hidden transition-all duration-300">
                      <div className="p-4">

                        <Image
                          src={post?.thumbnail || "https://dummyimage.com/600x400/d9d9d9/fff&text=%E1%BA%A2nh+kh%C3%B4ng+t%E1%BB%93n+t%E1%BA%A1i"}
                          alt={post?.title || "Hình ảnh bài viết"}
                          width={600}
                          height={300}
                          className="w-full h-52 object-cover rounded-md mb-3"
                        />


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
      </div>
    </section>
  );
};

export default FeaturedPosts;
