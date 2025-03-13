'use client';

import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { User, AuthContext } from "@/shared/types";
import { useMutationFetch, useFetch } from "@/shared/hooks";
import { toast } from "sonner";

const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);

    const { data, refetch: refetchUser } = useFetch<User>({
        entity: "auth",
        path: "me",
        token,
        options: {
            enabled: !!token,
            queryKey: ['auth', 'me'],
        },
    });
    const user: User | null = data ?? null;

    const loginMutation = useMutationFetch<{ email: string; password: string }, { token: string }>({
        url: "/auth/login",
        method: "POST",
        options: {
            onSuccess: async (data) => {
                localStorage.setItem("token", data.token);
                toast.success("Đăng nhập thành công!");
                await refetchUser();
                router.push("/home");
            },
            onError: (error) => {
                toast.error(error.message || "Lỗi khi đăng nhập!");
            },
        },
    });

    // Mutation for logout
    const logoutMutation = useMutationFetch<void, void>({
        url: "/auth/logout",
        method: "POST",
        options: {
            onMutate: () => {
                localStorage.removeItem("token");
                toast.success("Đã đăng xuất!");
            },
            onSettled: () => {
                router.push("/login");
            },
        },
    });

    const login = async (credentials: { email: string; password: string }) => {
        await loginMutation.mutateAsync(credentials);
        await refetchUser();
    };

    const logout = async () => {
        logoutMutation.mutate();
        await refetchUser();
    };

    return (
        <AuthContext.Provider value={{ user: user, login, logout }}>
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
