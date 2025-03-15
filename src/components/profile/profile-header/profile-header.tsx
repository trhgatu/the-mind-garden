"use client";

import Image from "next/image";
import { User } from "@/shared/types";

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-center m-8">
        <div className="h-px bg-[#d3bea1] w-1/4"></div>
        <div className="h-px bg-[#d3bea1] w-1/4"></div>
      </div>

      <div className="flex flex-col items-center">
        {/* Avatar with decorative frame */}
        <div className="p-4 bg-[#e8d9c0] rounded-lg shadow-lg border-4 border-double border-[#d3bea1] rotate-3">
          <Image
            src={user.avatar || "/default-avatar.png"}
            alt={user.username}
            width={120}
            height={120}
            className="rounded-lg"
          />
        </div>

        {/* User info with vintage typography */}
        <div className="text-center mt-8">
          <h1 className={`md:text-3xl text-xl font-serif text-[#614e3a] text-center drop-shadow-sm`}
              style={{ fontFamily: "'Playfair Display', serif" }}>
            {user.name || user.username}
          </h1>

          <p className="text-[#8b3e2f] italic mt-2">@{user.username}</p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center mt-6">
            <div className="h-px bg-[#d3bea1] w-1/4"></div>
            <Image
              src="/assets/images/stamp.png"
              alt="Divider"
              width={60}
              height={30}
              className="mx-4 w-12 h-auto opacity-70"
            />
            <div className="h-px bg-[#d3bea1] w-1/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;