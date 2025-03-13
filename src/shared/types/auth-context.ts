import { User } from "@/shared/types/user";

export interface AuthContext {
    user: User | null;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => void;
}