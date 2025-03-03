import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

/** Các phương thức HTTP cho mutation */
type FetchMethod = "POST" | "PUT" | "DELETE";

/** Định nghĩa generic type cho request và response */
interface UseMutationFetchProps<TRequest, TResponse> {
  url: string;
  method: FetchMethod;
  config?: AxiosRequestConfig;
  options?: UseMutationOptions<TResponse, Error, TRequest>;
}

/** Custom hook dùng để gọi API POST, PUT, DELETE */
export function useMutationFetch<TRequest, TResponse>({
  url,
  method,
  config,
  options,
}: UseMutationFetchProps<TRequest, TResponse>) {
  return useMutation<TResponse, Error, TRequest>({
    mutationFn: async (body: TRequest) => {
      const response = await axios({
        url,
        method,
        data: body,
        ...config,
      });
      return response.data as TResponse;
    },
    ...options,
  });
}
