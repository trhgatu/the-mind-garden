import Hero from "@/components/home/hero";
import FeaturedPosts from "@/components/home/featured-posts";
import Categories from "@/components/home/categories";

export function HomePage() {
    return (
        <main className="container mx-auto px-4">
            <Hero />
            <FeaturedPosts />
            <Categories />
        </main>
    );
}
