import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api } from "@/shared/utils/api";

interface UseFetchProps<TResponse> {
  url: string;
  options?: UseQueryOptions<TResponse, Error>;
}

export function useFetch<TResponse>({ url, options }: UseFetchProps<TResponse>) {
  return useQuery<TResponse, Error>({
    queryKey: [url],
    queryFn: async () => {
      const response = await api.get<TResponse>(url);
      return response.data;
    },
    ...options,
  });
}
