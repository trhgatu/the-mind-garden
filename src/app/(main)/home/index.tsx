import Hero from "@/components/home/hero/hero";
import QuoteOfTheDay from "@/components/home/quote-of-the-day/quote-of-the-day";
import { NewsPosts } from "@/components/home/new-posts/new-posts";
import PostsWithCategoriesAndFeatured from "@/components/home/posts-w-categories-featured/posts-w-categories-featured";

export function HomePage() {
    return (
        <>
            <Hero />
            <QuoteOfTheDay />
            <NewsPosts/>
            <PostsWithCategoriesAndFeatured/>
        </>
    );
}
