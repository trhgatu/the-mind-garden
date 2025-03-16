'use client';

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useFetch } from "@/shared/hooks";
import { Post, Category } from "@/shared/types";
import { SkeletonCard } from "@/components/post/post-card/post-skeleton-card";
import { NewPostCard } from "@/components/post/post-card/new-post-card";
import { lora } from "@/shared/fonts/fonts";

export function PostsWithCategories() {
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const { data: categoriesData, isLoading: categoriesLoading } = useFetch<{ categories: Category[] }>({
        entity: "categories",
    });

    const { data: postsData, isLoading: postsLoading } = useFetch<{ data: Post[] }>({
        entity: "posts",
        path: selectedCategory ? `?type=article&limit=5&categoryId=${selectedCategory}` : "",
        options: {
            queryKey: ["posts", selectedCategory],
            enabled: !!selectedCategory,
        },
    });

    const isLoading = postsLoading || categoriesLoading;
    const categories = categoriesData?.categories;
    const fetchedPosts: Post[] = postsData?.data ?? [];

    useEffect(() => {
        if (categories?.length) {
            setSelectedCategory(categories[0]._id);
        }
    }, [categories]);

    return (
        <div className="md:max-w-7xl mx-auto">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full p-4">
                <div className="flex justify-center">
                    <TabsList className="grid grid-cols-4 gap-4 bg-amber-50/80 border-2 border-amber-200 shadow-md">
                        {categories?.map((category) => (
                            <TabsTrigger
                                key={category._id}
                                value={category._id}
                                className={`${lora.className} text-amber-900 data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800 data-[state=active]:shadow-md transition-all duration-300`}
                            >
                                {category.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {categories?.map((category) => (
                    <TabsContent className="mt-8" key={category._id} value={category._id}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {isLoading ? (
                                Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
                            ) : (
                                fetchedPosts?.length > 0 ? (
                                    fetchedPosts?.map((post) => (
                                        <div key={post._id} className="relative transform transition-all duration-300">
                                            <NewPostCard post={post} />
                                        </div>
                                    ))
                                ) : (
                                    <p className={`${lora.className} text-center text-amber-800 col-span-full py-8 bg-amber-50/50 rounded-lg border-2 border-amber-100 shadow-inner italic`}>
                                        Không có bài viết trong danh mục này
                                    </p>
                                )
                            )}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}