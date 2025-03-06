'use client'

import { useState, useEffect } from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { playfairDisPlay } from "@/shared/fonts/fonts";
import { useFetch } from "@/shared/hooks";

import { Post, Category } from "@/shared/types";

import { PostCard } from "@/components/post/post-card/post-card";

export function PostsWithCategories() {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const { data: categoriesData } = useFetch<{ categories: Category[] }>({ url: '/categories' });


    const { data: postsData } = useFetch<{ data: Post[] }>({
        url: selectedCategory ? `/posts?limit=5&categoryId=${selectedCategory}` : "",
        options: {
            queryKey: ['posts', selectedCategory],
            enabled: !!selectedCategory
        }
    });


    const categories = categoriesData?.categories;
    const posts = postsData?.data;

    useEffect(() => {
        if (categories && categories.length > 0) {
            setSelectedCategory(categories[0]._id);
        }
    }, [categories]);

    useEffect(() => {
        console.log('Categories:', categories);
    }, [categories]);

    return (
        <div className="py-12">
            <div className="max-w-full mx-auto">
                <div className="md:max-w-7xl mx-auto">
                    <p
                        className={`relative text-3xl px-4 ${playfairDisPlay.className} font-bold text-primary text-left mb-6 after:block after:w-20 after:h-[3px] after:bg-primary after:mt-2`}
                    >
                        Theo danh mục.
                    </p>
                    <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full p-4">
                        <TabsList className="grid grid-cols-4 gap-4">
                            {categories && categories.map((category: Category) => (
                                <TabsTrigger key={category._id} value={category._id}>
                                    {category.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {categories && categories.map((category: Category) => (
                            <TabsContent key={category._id} value={category._id}>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {posts && posts.length > 0 ? (
                                        posts.map((post: Post) => <PostCard key={post.id} post={post} />)
                                    ) : (
                                        <p className="text-center text-gray-500 col-span-full">Không có bài viết trong danh mục này</p>
                                    )}
                                </div>
                            </TabsContent>

                        ))}
                    </Tabs>
                </div>
            </div>
        </div>
    );
}