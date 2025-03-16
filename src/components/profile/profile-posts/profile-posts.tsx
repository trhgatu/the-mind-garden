import React from "react";
import { Post } from "@/shared/types/post";
import { User } from "@/shared/types/user";
import Image from "next/image";
import Link from "next/link";
import { lora } from "@/shared/fonts/fonts";

interface ProfilePostsProps {
    user: User;
    posts: Post[];
    isLoading: boolean;
}

const ProfilePosts: React.FC<ProfilePostsProps> = ({ user, posts, isLoading }) => {
    if (isLoading) return (
        <div className="flex items-center justify-center h-64">
            <p className="text-center text-[#614e3a] italic font-serif">Đang tải bài viết...</p>
        </div>
    );

    return (
        <div>
            <h2 className="text-2xl font-serif text-[#614e3a] mb-6 leading-tight drop-shadow-sm"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Bài viết của {user.name || user.username}
            </h2>

            {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {posts.map((post) => (
                        <div key={post._id} className="bg-[#f3ebdc] border-4 border-double border-[#d3bea1] rounded-lg overflow-hidden shadow-lg transform hover:rotate-1 transition-transform duration-500">
                            <div className="relative">
                                <div className="p-3 bg-[#e8d9c0]">
                                    <Image
                                        src={post.thumbnail || "/default-post.jpg"}
                                        alt={post.title}
                                        width={800}
                                        height={400}
                                        className="w-full h-48 object-cover rounded"
                                    />
                                </div>
                                <div className="absolute bottom-3 right-6 bg-[#614e3a] text-[#f9f3e8] py-1 px-3 text-xs font-serif rounded shadow-md rotate-2">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className={`${lora.className} text-xl text-[#614e3a] mb-3`}>{post.title}</h3>
                                <p className={`${lora.className}text-[#7d6e5b] italic`}>{post.excerpt}</p>

                                <div className="mt-6 flex justify-end">
                                    <Link href={`/post/${post.slug}`}>
                                        <div className="inline-block bg-[#8b3e2f] hover:bg-[#614e3a] text-[#f9f3e8] px-5 py-2 rounded font-serif shadow-md transition-colors duration-300">
                                            Đọc tiếp
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center p-10 border-4 border-double border-[#d3bea1] rounded-lg bg-[#f3ebdc]">
                    <p className={`${lora.className} text-xl text-[#614e3a] italic`}>Chưa có bài viết nào.</p>

                    <div className="flex items-center justify-center my-6">
                        <div className="h-px bg-[#d3bea1] w-16"></div>
                        <Image
                            src="/assets/images/stamp.png"
                            alt="Divider"
                            width={50}
                            height={20}
                            className="mx-4 w-10 h-auto opacity-60"
                        />
                        <div className="h-px bg-[#d3bea1] w-16"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePosts;