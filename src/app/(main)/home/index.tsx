import Hero from "@/components/home/hero/hero";
import QuoteOfTheDay from "@/components/home/quote-of-the-day/quote-of-the-day";
import { NewsPosts } from "@/components/home/new-posts/new-posts";
import PostsWithCategoriesAndLetters from "@/components/home/posts-w-categories-letters/posts-w-categories-letters";

export function HomePage() {
    return (
        <>
            <Hero />
            <QuoteOfTheDay />
            <NewsPosts/>
            <PostsWithCategoriesAndLetters/>
        </>
    );
}
