import { useFetch } from "@/shared/hooks";

export function useCategories() {
    const { data = { categories: [] }, isLoading, error } = useFetch<{ categories: { _id: string; name: string }[] }>({
        url: "/categories",
    });

    return {
        categories: data.categories,
        isLoading,
        error,
    };
}
