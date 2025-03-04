import Hero from "@/components/home/hero/hero";
import FeaturedPosts from "@/components/home/featured-posts/featured-posts";
import Categories from "@/components/home/categories/categories";

export function HomePage() {
    return (
        <main>
            <Hero />
            <FeaturedPosts />
            <Categories />
        </main>
    );
}
