import { useFetch } from "@/shared/hooks/useFetch";

export const useUser = (token: string | null) => {
  return useFetch<{ id: string; name: string; email: string }>({
    entity: "auth",
    path: "me",
    options: {
      enabled: !!token,
      retry: 1,
      queryKey: ['auth', 'me', token],
    },
  });
};
