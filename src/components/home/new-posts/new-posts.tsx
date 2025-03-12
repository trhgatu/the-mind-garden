'use client';

import { useFetch } from "@/shared/hooks";
import { Post } from "@/shared/types";
import { lora, playfairDisPlay } from "@/shared/fonts/fonts";
import Link from "next/link";
import { NewPostCard } from "@/components/post/post-card/new-post-card";
import Image from "next/image";
import { Sparkle } from "lucide-react";

interface NewsPostsProps {
    className?: string;
    title?: string;
    limit?: number;
}

export function NewsPosts({
    className = "",
    title = "Mới.",
    limit = 5
}: NewsPostsProps) {
    const { data: postsData, isLoading } = useFetch<{ data: Post[] }>({
        entity: "posts",
        path: `?limit=${limit}&sort=createdAt:desc`,
    });

    const posts = postsData?.data || [];
    const featuredPost = posts.length > 0 ? posts[0] : null;
    const regularPosts = posts.length > 1 ? posts.slice(1, 7) : [];

    return (
        <div className="relative bg-[url(/assets/images/Noise__Texture_2.svg)]">
            <div className="absolute bottom-0 left-0 w-full -z-1">
                <Image
                    src="/assets/images/texture-background.png"
                    alt="Texture Background"
                    width={1920}
                    height={1080}
                    className="w-full object-cover opacity-35"
                    priority
                />
            </div>
            <div className={`w-full py-12 px-4 relative ${className}`}>
                <div className="absolute bottom-0 right-0 z-0">
                    <Image
                        src="/assets/images/castle.png"
                        alt="Castle"
                        width={700}
                        height={1280}
                        className="object-cover opacity-75"
                    />
                </div>


                <div className="flex flex-col gap-10 md:gap-14 relative z-10">
                    <div className="flex flex-col items-center gap-6">
                        <p className={`${playfairDisPlay.className} font-bold text-black dark:text-white md:text-6xl text-4xl text-center tracking-wide`}>
                            {title}
                        </p>
                        <div className="relative flex items-center justify-center w-full max-w-lg">
                            <div className="flex-grow border-t border-3 border-black dark:border-white"></div>
                            <span className="mx-4 text-5xl animate-pulse">
                                <Sparkle />
                            </span>
                            <div className="flex-grow border-t border-3 border-black dark:border-white "></div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                            <div className="lg:col-span-3 bg-white rounded-lg h-96 animate-pulse"></div>
                            <div className="lg:col-span-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Array.from({ length: 6 }).map((_, index) => (
                                        <div key={index} className="bg-white rounded-lg h-40 animate-pulse"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
                            <div className="lg:col-span-3 relative">
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src="/assets/images/reflection.png"
                                        alt="Letter background"
                                        width={1280}
                                        height={800}
                                        className="object-cover h-full w-full"
                                    />
                                </div>
                                <div className="relative w-full h-full">
                                    {featuredPost ? (
                                        <div className="relative z-10 h-full flex flex-col justify-center p-6">
                                            <Link href={`/post/${featuredPost.slug}`} className="block px-8 md:px-16">
                                                <div className="flex">
                                                    <div className="pr-4">
                                                        <h3 className={`${lora.className} dark:text-black text-2xl font-bold mb-2 hover:text-[#a83240] transition-colors duration-300 text-center`}>
                                                            {featuredPost.title}
                                                        </h3>
                                                        <p className="mb-3 line-clamp-4 mx-auto dark:text-black max-w-lg">
                                                            {featuredPost.excerpt}
                                                        </p>
                                                    </div>
                                                    {featuredPost.thumbnail && (
                                                        <div className="relative h-44 flex justify-center overflow-hidden border-2 border-gray-200">
                                                            <Image
                                                                src={featuredPost.thumbnail}
                                                                alt={featuredPost.title}
                                                                width={300}
                                                                height={300}
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="relative z-10 h-full p-6 flex items-center justify-center">
                                            <p className="text-gray-500">Không có bài viết nổi bật</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="lg:col-span-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {regularPosts.length > 0 ? (
                                        regularPosts.map((post) => (
                                            <NewPostCard
                                                key={post._id}
                                                post={post}
                                                variant="default"
                                            />
                                        ))
                                    ) : (
                                        <div className="col-span-full py-12 bg-white/80 rounded-lg">
                                            <p className="text-gray-500">Không có bài viết mới</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-center mt-10">
                        <Link href="/posts" className="px-6 py-2 border border-gray-300 rounded-full transition-colors duration-300 flex items-center">
                            <span>Xem tất cả</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}