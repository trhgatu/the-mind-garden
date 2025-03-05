import Hero from "@/components/home/hero/hero";
import FeaturedPosts from "@/components/home/featured-posts/featured-posts";
import QuoteOfTheDay from "@/components/home/quote-of-the-day/quote-of-the-day";
import { PostsWithCategories } from "@/components/home/posts-with-category/posts-with-category";

export function HomePage() {
    return (
        <>
            <Hero />
            <QuoteOfTheDay />
            <FeaturedPosts />
            <PostsWithCategories/>
        </>
    );
}
