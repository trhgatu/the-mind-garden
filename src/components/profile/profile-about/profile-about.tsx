import React from "react";
import { User } from "@/shared/types/user";

interface ProfileAboutProps {
    user: User;
}

const ProfileAbout: React.FC<ProfileAboutProps> = ({ user }) => {
    return (
        <div>
            <h2 className="text-2xl font-serif text-[#614e3a] mb-6 leading-tight drop-shadow-sm"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Giới thiệu
            </h2>

            <div className="my-6 p-6 bg-[#f3ebdc] border-4 border-double border-[#d3bea1] rounded-lg">
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-3">
                        <span className="font-serif text-[#8b3e2f] font-medium min-w-32">Giới thiệu</span>
                        <span className="text-[#614e3a] font-serif italic">{user.bio || "Chưa có thông tin."}</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <span className="font-serif text-[#8b3e2f] font-medium min-w-32">Địa điểm:</span>
                        <span className="text-[#614e3a] font-serif">{user.location || "Chưa cập nhật."}</span>
                    </div>

                    <div className="mt-10 flex justify-end">
                        <div className="text-[#614e3a] border-2 border-[#d3bea1] border-dashed py-2 px-5 rounded-md rotate-2 text-sm font-serif bg-[#f9f3e8]">
                            Tham gia từ: {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileAbout;