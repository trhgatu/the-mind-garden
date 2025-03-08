import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api } from "@/shared/utils";

interface UseFetchProps<TResponse> {
  entity: string;
  path?: string;
  options?: UseQueryOptions<TResponse, Error>;
}

export function useFetch<TResponse>({ entity, path = "", options }: UseFetchProps<TResponse>) {
  return useQuery<TResponse, Error>({
    queryKey: [entity, path, ...(options?.queryKey ?? [])].filter(Boolean),
    queryFn: async () => {
      const response = await api.get<TResponse>(`/${entity}/${path}`);
      return response.data;
    },
    ...options,
  });
}
