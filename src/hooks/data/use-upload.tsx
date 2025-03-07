import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/shared/utils";

export function useUpload() {
    const [loading, setLoading] = useState(false);

    const uploadThumbnail = async (file: File) => {
        if (!file) return null;

        setLoading(true);
        const fileName = `thumbnails/${Date.now()}-${file.name}`;

        const { error } = await supabase.storage
            .from("uploads")
            .upload(fileName, file);

        setLoading(false);

        if (error) {
            toast.error(`Lỗi khi tải ảnh lên! ${error.message}`);
            return null;
        }
        return supabase.storage.from("uploads").getPublicUrl(fileName).data.publicUrl;
    };

    return { uploadThumbnail, loading };
}
