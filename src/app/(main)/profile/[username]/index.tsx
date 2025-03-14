'use client'

import { useAuth } from "@/shared/contexts";
import { useParams } from "next/navigation";

export default function ProfilePage() {
    const { user } = useAuth();
    const params = useParams(); // Lấy params từ URL
    const username = params.username as string; // Ép kiểu cho TypeScript

    return (
        <div>
            <h1>Profile of {username}</h1>
            <p>Logged in as: {user?.nickname}</p>
        </div>
    );
}
