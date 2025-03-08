import { useFetch } from "@/shared/hooks";

export function useCategories() {
    const { data, isLoading, isError } = useFetch<{ categories: { _id: string; name: string }[] }>({
        entity: "categories",
        options: {
            queryKey: ["categories"],
        },
    });

    return {
        categories: data?.categories ?? [],
        isLoading,
        isError,
    };
}
