import { api } from "@/shared/utils/api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";

type FetchMethod = "POST" | "PUT" | "DELETE";

interface UseMutationFetchProps<TRequest, TResponse> {
  url: string;
  method: FetchMethod;
  config?: AxiosRequestConfig;
  options?: UseMutationOptions<TResponse, Error, TRequest>;
}

export function useMutationFetch<TRequest, TResponse>({
  url,
  method,
  config,
  options,
}: UseMutationFetchProps<TRequest, TResponse>) {
  return useMutation<TResponse, Error, TRequest>({
    mutationFn: async (body: TRequest) => {
      const response = await api({
        url,
        method,
        withCredentials: true,
        data: body,
        ...config,
      });
      return response.data as TResponse;
    },
    ...options,
  });
}
