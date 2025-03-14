import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
        return error.response?.data?.message || "Lỗi không xác định từ server!";
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Đã xảy ra lỗi!";
};
