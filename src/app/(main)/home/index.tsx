import Hero from "@/components/home/hero/hero";
import FeaturedPosts from "@/components/home/featured-posts/featured-posts";
import Categories from "@/components/home/categories/categories";
import QuoteOfTheDay from "@/components/home/quote-of-the-day/quote-of-the-day";

export function HomePage() {
    return (
        <>
            <Hero />
            <QuoteOfTheDay />
            <FeaturedPosts />
            <Categories />
        </>
    );
}
