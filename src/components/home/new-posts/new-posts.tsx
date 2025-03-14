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
            <div className="absolute hidden md:flex bottom-0 left-0 w-full -z-1">
                <Image
                    src="/assets/images/texture-background.png"
                    alt="Texture Background"
                    width={1920}
                    height={1080}
                    className="w-full object-cover opacity-60"
                    priority
                />
            </div>
            <div className={`w-full py-10 md:py-24 px-10 relative ${className}`}>
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
                        <div className="grid grid-cols-1 lg:grid-cols-6 gap-16">
                            <div className="lg:col-span-3 relative">
                                <div className="relative w-full h-full bg-[url('/assets/background/letter-texture.png')] bg-cover ">
                                    {featuredPost ? (
                                        <div className="relative z-10 bg-[url(/assets/images/grunge-concrete-material-background-texture-wall-concept.jpg)] bg-cover bg-center bg-no-repeat -rotate-6 h-full flex flex-col group transform transition-transform hover:scale-[1.02] hover:rotate-0 overflow-hidden shadow-md border-[#e8d9c0] bg-[#f9f3e8] border-4 duration-300 hover:shadow-lg p-6 md:p-10">
                                            <Link href={`/post/${featuredPost.slug}`} className="block">
                                                <div className="pt-4 text-left">
                                                    <h3 className={`${lora.className} dark:text-black text-2xl font-bold mb-2 hover:text-[#a83240] transition-colors duration-300`}>
                                                        {featuredPost.title}
                                                    </h3>
                                                </div>
                                                <div className="text-left">
                                                    <h3 className={`${lora.className} dark:text-black mb-2 hover:text-[#a83240] transition-colors duration-300`}>
                                                        {featuredPost.content}
                                                    </h3>
                                                    <p className="text-gray-700 italic dark:text-black line-clamp-3">
                                                        {featuredPost.excerpt}
                                                    </p>
                                                    <div className="mt-6 text-left">
                                                        <p className="text-[#5a3e2b] font-semibold italic">Sincerely,</p>
                                                        <p className="text-[#5a3e2b] font-bold">{featuredPost.authorId?.name}</p>
                                                    </div>

                                                </div>
                                            </Link>

                                        </div>
                                    ) : (
                                        <div className="relative z-10 h-full p-6 flex items-center justify-center">
                                            <p className="text-gray-500">Không có bài viết nổi bật</p>
                                        </div>
                                    )}
                                </div>
                                <div className="absolute -right-40 bottom-0 hidden md:block z-10">
                                    <Image
                                        src="/assets/images/flower-decor.png"
                                        alt="Stamp"
                                        width={400}
                                        height={400}
                                        className="w-full h-full rotate-12 object-cover"
                                    />
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
                </div>
            </div>
        </div>
    );
}