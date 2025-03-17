'use client';

import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useFetch } from "@/shared/hooks";
import { Post, Category } from "@/shared/types";
import { SkeletonCard } from "@/components/post/post-card/post-skeleton-card";
import { NewPostCard } from "@/components/post/post-card/new-post-card";
import { lora } from "@/shared/fonts/fonts";

export function PostsWithCategories() {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [isSticky, setIsSticky] = useState(false);
    const categoryTabsRef = useRef<HTMLDivElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);

    const HEADER_HEIGHT = 70;

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

    useEffect(() => {
        const handleScroll = () => {
            if (categoryTabsRef.current && placeholderRef.current) {
                const tabsRect = placeholderRef.current.getBoundingClientRect();

                if (tabsRect.top <= HEADER_HEIGHT) {
                    if (!isSticky) {
                        setIsSticky(true);
                        // Đặt chiều cao cho placeholder để tránh nhảy nội dung
                        placeholderRef.current.style.height = `${categoryTabsRef.current.offsetHeight}px`;
                    }
                } else {
                    if (isSticky) {
                        setIsSticky(false);
                        placeholderRef.current.style.height = '0px';
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isSticky]);

    return (
        <div className="md:max-w-7xl mx-auto">
            <div ref={placeholderRef}></div>

            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                <div
                    ref={categoryTabsRef}
                    className={`${isSticky ? 'fixed top-0 left-0 right-0 z-20 bg-white shadow-sm' : ''}`}
                    style={isSticky ? { top: `${HEADER_HEIGHT}px` } : {}}
                >
                    <div className="flex justify-center max-w-7xl mx-auto">
                        <div className="flex w-full border-b border-[#d3bea1]">
                            {categories?.map((category) => (
                                <button
                                    key={category._id}
                                    onClick={() => setSelectedCategory(category._id)}
                                    className={`${lora.className} md:text-base text-sm md:px-8 px-4 py-2 transition-colors duration-300 ${
                                        selectedCategory === category._id
                                            ? "text-[#614e3a] border-b-2 border-[#8b3e2f]"
                                            : "text-[#7d6e5b] hover:bg-[#f3ebdc]"
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={isSticky ? 'md:pt-20' : ''}>
                    {categories?.map((category) => (
                        <TabsContent key={category._id} value={category._id}>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {isLoading ? (
                                        Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
                                    ) : (
                                        fetchedPosts?.length > 0 ? (
                                            fetchedPosts?.map((post) => (
                                                <div key={post._id} className="relative">
                                                    <NewPostCard post={post} />
                                                </div>
                                            ))
                                        ) : (
                                            <p className={`${lora.className} text-center text-[#8b3e2f] col-span-full py-8 bg-[#f3ebdc] rounded-lg border border-dashed border-[#d3bea1] italic`}>
                                                Không có bài viết trong danh mục này
                                            </p>
                                        )
                                    )}
                                </div>
                            </div>
                        </TabsContent>
                    ))}
                </div>
            </Tabs>
        </div>
    );
}