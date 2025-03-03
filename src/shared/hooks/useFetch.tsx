import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api } from "@/shared/utils/api";

/** Định nghĩa generic type cho response */
interface UseFetchProps<TResponse> {
  url: string;
  options?: UseQueryOptions<TResponse, Error>;
}

/** Custom hook dùng để Fetch API (GET) */
export function useFetch<TResponse>({ url, options }: UseFetchProps<TResponse>) {
  return useQuery<TResponse, Error>({
    queryKey: [url], // Cache theo URL
    queryFn: async () => {
      const response = await api.get<TResponse>(url);
      return response.data;
    },
    ...options, // Tuỳ chọn thêm (retry, refetchOnWindowFocus...)
  });
}
