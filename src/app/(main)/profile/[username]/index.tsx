"use client";

import { useAuth } from "@/shared/contexts";
import { useFetch } from "@/shared/hooks/useFetch";
import { notFound } from "next/navigation";
import ProfileHeader from "@/components/profile/profile-header/profile-header";
import ProfileContent from "@/components/profile/profile-content/profile-content";
import { User } from "@/shared/types/user";
import { Post } from "@/shared/types/post";

export function ProfilePage({ params }: { params: { username: string } }) {
    const { user: currentUser } = useAuth();

    const isCurrentUserProfile = currentUser?.username === params.username;

    const { data: userData, isLoading: userLoading, error: userError } = useFetch<{ user: User }>({
        entity: "users",
        path: `profile/${params?.username}`,
        skip: isCurrentUserProfile
    });

    const finalUserData = isCurrentUserProfile ? { user: currentUser } : userData;
    const shouldFetchPosts = !!userData?.user?._id;

    const { data: postsData, isLoading: postsLoading } = useFetch<{ data: Post[], meta: { total: number; page: number; limit: number } }>(
        { entity: "posts", path: shouldFetchPosts ? `?authorId=${userData.user._id}` : "" }
    );

    const posts = postsData?.data || [];

    if (userLoading) return (
        <div className="flex justify-center items-center h-screen bg-[#f9f3e8]">
            <p className="text-center text-[#614e3a] italic font-serif">Đang tải thông tin...</p>
        </div>
    );

    if (!finalUserData || userError) return notFound();

    return (
        <div className="max-w-5xl mx-auto mt-10 py-16 relative">
            <div className="relative bg-[#f9f3e8] border-8 border-double border-[#d3bea1] rounded-lg shadow-xl z-0">
                <ProfileHeader user={finalUserData.user} />
                <ProfileContent
                    user={finalUserData.user}
                    posts={posts}
                    isLoading={postsLoading}
                />
            </div>
        </div>
    );
}

export default ProfilePage;