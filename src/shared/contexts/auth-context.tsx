"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/shared/types";
import { useMutationFetch, useFetch } from "@/shared/hooks";
import { getErrorMessage } from "@/shared/utils/error";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContextType } from "@/shared/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [authChecked, setAuthChecked] = useState(false);

    const [token, setToken] = useState<string | null>(() => {
        return typeof window !== "undefined" ? localStorage.getItem("token") : null;
    });
    const [cachedUser, setCachedUser] = useState<User | null>(null);

    const { data, isLoading, isError, status } = useFetch<{ success: boolean; user: User | null }>(
        {
            entity: "auth",
            path: "me",
            token,
            options: {
                enabled: !!token,
                queryKey: ["auth", "me", token],
                staleTime: 0,
                retry: 1,
            },
        }
    );

    useEffect(() => {
        if (!token) {
            setAuthChecked(true);
        }
    }, [token]);

    useEffect(() => {
        if (token && (status === 'success' || status === 'error')) {
            setAuthChecked(true);
        }
    }, [status, token]);

    useEffect(() => {
        if (isError && token) {
            localStorage.removeItem("token");
            setToken(null);
            setCachedUser(null);
            queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
        }
    }, [isError, token, queryClient]);

    useEffect(() => {
        if (data?.user) {
            setCachedUser(data.user);
        } else if (data && !data.user) {
            // Xử lý khi API trả về thành công nhưng không có user
            setCachedUser(null);
            if (token) {
                localStorage.removeItem("token");
                setToken(null);
            }
        }
    }, [data, token]);

    const loginMutation = useMutationFetch<
        { email: string; password: string },
        { success: boolean; message: string; token?: string }
    >({
        url: "/auth/login",
        method: "POST",
        options: {
            onSuccess: async (data) => {
                if (!data.success || !data.token) {
                    throw new Error(data.message);
                }

                localStorage.setItem("token", data.token);
                setToken(data.token);
                toast.success(data.message || "Đăng nhập thành công!");
                queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
                router.push("/home");
            },
            onError: (error) => {
                toast.error(getErrorMessage(error));
            },
        },
    });

    const logoutMutation = useMutationFetch<void, { success: boolean; message: string }>(
        {
            url: "/auth/logout",
            method: "POST",
            options: {
                onMutate: async () => {
                    localStorage.removeItem("token");
                    setToken(null);
                    setCachedUser(null);
                    queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
                },
                onSuccess: (data) => {
                    toast.success(data.message || "Đăng xuất thành công!");
                    router.refresh();
                },
                onError: (error) => {
                    toast.error(getErrorMessage(error) || "Lỗi khi đăng xuất!");
                },
            },
        }
    );

    const login = async (credentials: { email: string; password: string }) => {
        await loginMutation.mutateAsync(credentials);
    };

    const logout = async () => {
        await logoutMutation.mutateAsync();
    };

    const isInitializing = !authChecked;

    const contextValue: AuthContextType = {
        user: cachedUser,
        isLoading,
        isInitializing,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};