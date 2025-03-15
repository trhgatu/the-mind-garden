import React from "react";
import ProfileAbout from "@/components/profile/profile-about/profile-about";
import ProfilePosts from "@/components/profile/profile-posts/profile-posts";
import { User } from "@/shared/types/user";
import { Post } from "@/shared/types";
import { lora } from "@/shared/fonts/fonts";
interface ProfileContentProps {
    user: User;
    posts: Post[];
    isLoading: boolean;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ user, posts, isLoading }) => {
    const [activeTab, setActiveTab] = React.useState("about");

    return (
        <div className="mt-6">
            <div className="flex border-b border-[#d3bea1] mb-8">
                <button
                    className={`${lora.className} px-6 py-3 md:text-lg transition-colors duration-300 ${
                        activeTab === "about"
                            ? "text-[#614e3a] border-b-2 border-[#8b3e2f]"
                            : "text-[#7d6e5b] hover:bg-[#f3ebdc]"
                    }`}
                    onClick={() => setActiveTab("about")}
                >
                    Giới thiệu
                </button>
                <button
                    className={`${lora.className} px-6 py-3 md:text-lg transition-colors duration-300 ${
                        activeTab === "posts"
                            ? "text-[#614e3a] border-b-2 border-[#8b3e2f]"
                            : "text-[#7d6e5b] hover:bg-[#f3ebdc]"
                    }`}
                    onClick={() => setActiveTab("posts")}
                >
                    Bài viết
                </button>
                <button
                    className={`${lora.className} px-6 py-3 md:text-lg transition-colors duration-300 ${
                        activeTab === "comments"
                            ? "text-[#614e3a] border-b-2 border-[#8b3e2f]"
                            : "text-[#7d6e5b] hover:bg-[#f3ebdc]"
                    }`}
                    onClick={() => setActiveTab("comments")}
                >
                    Bình luận
                </button>
            </div>

            <div className="p-6">
                {activeTab === "about" && <ProfileAbout user={user} />}
                {activeTab === "posts" && <ProfilePosts user={user} posts={posts} isLoading={isLoading} />}
                {activeTab === "comments" && (
                    <div className="text-center p-8">
                        <p className={`${lora.className} py-6 px-8 bg-[#f3ebdc] text-[#8b3e2f] italic border border-dashed border-[#d3bea1]`}>
                            Phần bình luận đang được cập nhật
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileContent;