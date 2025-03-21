"use client";

import { useParams } from "next/navigation";
import { useFetch } from "@/shared/hooks/useFetch";
import { GetPostResponse } from "@/shared/types/post";
import PostContent from "@/components/post/post-content/post-content";
import Image from "next/image";


export function PostPage() {
    const { slug } = useParams();
    const { data, isLoading, isError } = useFetch<GetPostResponse>({
        entity: `posts/${slug}`,
    });


    if (isLoading) return (
        <div className="flex items-center justify-center h-64">
            <p className="text-center text-[#614e3a] italic font-serif">Đang tải bài viết...</p>
        </div>
    );

    if (isError) return (
        <div className="flex items-center justify-center h-64">
            <p className="text-center text-[#8b3e2f] font-serif">Có lỗi xảy ra khi tải bài viết!</p>
        </div>
    );

    if (!data) return (
        <div className="flex items-center justify-center h-64">
            <p className="text-center text-[#614e3a] font-serif">Bài viết không tồn tại.</p>
        </div>
    );

    const post = data?.data?.post;

    return (
        <div className="max-w-5xl mx-auto px-8 my-10 py-16 relative">
            <div className="relative bg-[#f9f3e8] border-8 border-double border-[#d3bea1] rounded-lg shadow-xl p-8 z-0">
                <div className="flex items-center justify-center mb-8">
                    <div className="h-px bg-[#d3bea1] w-1/4"></div>
                    <div className="h-px bg-[#d3bea1] w-1/4"></div>
                </div>

                {/* Tiêu đề bài viết with decorative typography */}
                <h1 className="text-4xl font-serif text-[#614e3a] text-center mb-8 leading-tight drop-shadow-sm"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    {post.title}
                </h1>
                <div className="flex items-center justify-center mb-10">
                    <div className="h-px bg-[#d3bea1] w-1/4"></div>

                    <div className="h-px bg-[#d3bea1] w-1/4"></div>
                </div>
                {post.thumbnail && (
                    <div className="relative my-10 mx-auto w-full max-w-3xl">
                        <div className="p-4 bg-[#e8d9c0] rounded shadow-lg border-4 border-double border-[#d3bea1]">
                            <Image
                                src={post.thumbnail}
                                alt={post.title}
                                width={800}
                                height={450}
                                layout="intrinsic"
                                priority
                                className="w-full h-auto rounded"
                            />



                            {/* Small decorative floral elements at corners of image */}
                            {/* <div className="absolute -top-3 -left-3 w-12 h-12 opacity-80">
                                <Image
                                    src="/assets/images/flower-decor.png"
                                    alt="Flower decoration"
                                    width={50}
                                    height={50}
                                />
                            </div> */}
                        </div>
                    </div>
                )}

                {/* Decorative divider before content */}
                <div className="flex items-center text-left my-10">
                    <div className="h-px bg-[#d3bea1] w-full"></div>
                </div>

                {/* Nội dung bài viết with vintage styling */}
                <div className="prose prose-lg text-[#614e3a] prose-headings:font-serif prose-headings:text-[#614e3a]
                     prose-p:text-[#614e3a] prose-p:font-serif prose-p:leading-relaxed prose-strong:text-[#8b3e2f]
                     prose-blockquote:border-l-4 prose-blockquote:border-[#d3bea1] prose-blockquote:bg-[#f3ebdc]
                     prose-blockquote:p-4 prose-blockquote:rounded prose-blockquote:italic max-w-none">
                    <PostContent content={post.content} />
                </div>

                {/* Decorative divider before signature */}
                <div className="flex items-center justify-center md:mt-28 md:mb-20">
                    <div className="h-px bg-[#d3bea1] w-1/4"></div>
                    <Image
                        src="/assets/images/stamp.png"
                        alt="Divider"
                        width={100}
                        height={30}
                        className="mx-4 w-16 h-auto opacity-80"
                    />
                    <div className="h-px bg-[#d3bea1] w-1/4"></div>
                </div>

                {/* Chữ ký tác giả with elegant styling */}
                <div className="mt-6 text-right">
                    <p className="italic text-[#7d6e5b] text-2xl">
                        ~ {post.authorId?.name}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PostPage;