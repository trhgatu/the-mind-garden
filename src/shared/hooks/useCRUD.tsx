import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/utils";
import { toast } from "sonner";

interface BaseCRUDProps<TResponse> {
    entity: string;
    onSuccess?: (data: TResponse) => void;
    onError?: (error: Error) => void;
}

interface CreateProps<TRequest, TResponse> extends BaseCRUDProps<TResponse> {
    method: "POST";
    body: TRequest;
}

interface UpdateProps<TRequest extends { id: string | number }, TResponse> extends BaseCRUDProps<TResponse> {
    method: "PUT";
    body: TRequest;
}

interface DeleteProps<TRequest extends { id: string | number }, TResponse> extends BaseCRUDProps<TResponse> {
    method: "DELETE";
    body: TRequest;
    isHardDelete?: boolean
}

type UseCRUDProps<TRequest extends Partial<{ id: string | number }>, TResponse> =
    | CreateProps<TRequest, TResponse>
    | UpdateProps<TRequest & { id: string | number }, TResponse>
    | DeleteProps<TRequest & { id: string | number }, TResponse>;

export function useCRUD<TRequest extends Partial<{ id: string | number }>, TResponse>({
    entity, method, body, onSuccess, onError, isHardDelete
}: UseCRUDProps<TRequest, TResponse> & { isHardDelete?: boolean }) {

    const queryClient = useQueryClient();

    return useMutation<TResponse, Error>({
        mutationFn: async () => {
            let response;

            switch (method) {
                case "POST":
                    response = await api.post(`/${entity}`, body);
                    break;
                case "PUT":
                    response = await api.put(`/${entity}/${(body as { id: string | number }).id}`, body);
                    break;
                case "DELETE":
                    const endpoint = isHardDelete
                        ? `/${entity}/hard-delete/${(body as { id: string | number }).id}`
                        : `/${entity}/soft-delete/${(body as { id: string | number }).id}`;
                    response = await api.delete(endpoint);
                    break;
                default:
                    throw new Error("Invalid method");
            }

            return response?.data;
        },
        onSuccess: (data) => {
            toast.success(`${method} ${entity} thành công!`);
            queryClient.invalidateQueries({ queryKey: [entity] });
            if (onSuccess) onSuccess(data);
        },
        onError: (error) => {
            toast.error(error.message || `Lỗi khi ${method} ${entity}!`);
            if (onError) onError(error);
        },

    });
}
