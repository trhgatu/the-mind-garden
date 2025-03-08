"use client";

import { useFetch } from "@/shared/hooks";
import { Post } from "@/shared/types/post";
import { playfairDisPlay } from "@/shared/fonts/fonts";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FeaturedPostCard } from "@/components/post/post-card";

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
                  <FeaturedPostCard key={post._id} post={post}/>
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
