'use client';

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { playfairDisPlay } from "@/shared/fonts/fonts";
import { useFetch } from "@/shared/hooks";
import { Post, Category } from "@/shared/types";
import { PostCardWithCategories } from "@/components/post/post-card";
import { SkeletonCard } from "@/components/post/post-card/post-skeleton-card";

export function PostsWithCategories() {
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const { data: categoriesData, isLoading: categoriesLoading } = useFetch<{ categories: Category[] }>({
        entity: "categories",
    });

    const { data: postsData, isLoading: postsLoading } = useFetch<{ data: Post[] }>({
        entity: "posts",
        path: selectedCategory ? `?limit=5&categoryId=${selectedCategory}` : "",
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
        <div className="pb-12">
            <div className="max-w-full mx-auto">
                <div className="md:max-w-7xl mx-auto">
                    <p className={`relative text-3xl px-4 ${playfairDisPlay.className} font-bold text-primary text-left mb-6 after:block after:w-20 after:h-[3px] after:bg-primary after:mt-2`}>
                        Theo danh mục.
                    </p>
                    <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full p-4">
                        <div className="flex justify-center">
                            <TabsList className="grid grid-cols-4 gap-4">
                                {categories?.map((category) => (
                                    <TabsTrigger key={category._id} value={category._id}>
                                        {category.name}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        {categories?.map((category) => (
                            <TabsContent className="mt-4" key={category._id} value={category._id}>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {isLoading ? (
                                        Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
                                    ) : (
                                        fetchedPosts?.length > 0 ? (
                                            fetchedPosts?.map((post) => <PostCardWithCategories key={post._id} post={post} />)
                                        ) : (
                                            <p className="text-center text-gray-500 col-span-full">Không có bài viết trong danh mục này</p>
                                        )
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
