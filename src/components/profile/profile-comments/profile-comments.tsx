import React from "react";

const ProfileComments = () => {
    const sampleComments = [
        {
            id: 1,
            postTitle: "Chuyến đi Đà Lạt đáng nhớ",
            content: "Bài viết hay quá! Mình cũng thích Đà Lạt lắm!",
            createdAt: "2025-03-13",
        },
        {
            id: 2,
            postTitle: "Những cuốn sách nên đọc trong năm 2025",
            content: "Mình đã đọc 'Nhà giả kim', rất tuyệt vời!",
            createdAt: "2025-03-10",
        },
    ];

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Bình luận</h2>
            {sampleComments.map((comment) => (
                <div key={comment.id} className="p-4 border rounded-lg shadow-sm bg-white">
                    <p className="text-gray-700">{comment.content}</p>
                    <p className="text-sm text-gray-500">Bình luận trên: <span className="font-semibold">{comment.postTitle}</span></p>
                    <p className="text-xs text-gray-400">Ngày: {comment.createdAt}</p>
                </div>
            ))}
        </div>
    );
};

export default ProfileComments;
