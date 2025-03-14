import { User } from "@/shared/types/user";

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isInitializing: boolean;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
  }
