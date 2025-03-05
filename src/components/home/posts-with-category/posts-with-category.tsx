'use client'

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Post {
    id: string;
    title: string;
    content: string;
    category: string;
}

const categories = ["Công Nghệ", "Kinh Tế", "Văn Hóa", "Giải Trí"];

const postsData: Post[] = [
    { id: "1", title: "Bài viết về AI", content: "Nội dung bài viết về công nghệ AI.", category: "Công Nghệ" },
    { id: "2", title: "Bài viết về Kinh Tế", content: "Nội dung bài viết về tình hình kinh tế.", category: "Kinh Tế" },
    { id: "3", title: "Văn hóa và lịch sử", content: "Nội dung bài viết về văn hóa Việt Nam.", category: "Văn Hóa" },
    { id: "4", title: "Giải trí cuối tuần", content: "Nội dung bài viết về giải trí.", category: "Giải Trí" },
];

export function PostsWithCategories() {
    const [selectedCategory, setSelectedCategory] = useState<string>("Công Nghệ");

    const filteredPosts = postsData.filter((post) => post.category === selectedCategory);

    return (
        <div className="space-y-8">
            <Tabs defaultValue={selectedCategory} className="w-full">
                <TabsList className="grid grid-cols-4 gap-4">
                    {categories.map((category) => (
                        <TabsTrigger
                            key={category}
                            value={category}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Tabs Content for each category */}
                {categories.map((category) => (
                    <TabsContent key={category} value={category}>
                        <Card>
                            <CardHeader>
                                <CardTitle>{category}</CardTitle>
                                <CardDescription>Danh sách bài viết trong danh mục {category}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {filteredPosts.length > 0 ? (
                                    filteredPosts.map((post) => (
                                        <div key={post.id} className="space-y-2">
                                            <h3 className="font-bold">{post.title}</h3>
                                            <p>{post.content}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500">Không có bài viết trong danh mục này</p>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
