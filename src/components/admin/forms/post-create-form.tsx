"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
const SimpleMdeEditor = dynamic(
	() => import("react-simplemde-editor"),
	{ ssr: false }
);
import "easymde/dist/easymde.min.css";
import { useMutationFetch, useFetch } from "@/shared/hooks";
import { toast } from "sonner";
import { supabase } from "@/shared/utils";
import Image from "next/image";

export function PostCreateForm() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState("published");
    const [categoryId, setCategoryId] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);


    const { data: categoriesData = { categories: [] } } = useFetch<{ categories: { _id: string; name: string }[] }>({
        url: "/categories",
    });
    const categories = categoriesData.categories;

    const mutation = useMutationFetch({
        url: "/posts/create",
        method: "POST",
        options: {
            onSuccess: () => {
                toast.success("Tạo bài viết mới thành công!");
                router.push("/admin/posts");
            },
            onError: (error: Error) => {
                toast.error(error.message || "Lưu bài viết thất bại!");
            },
        },
    });
    const uploadThumbnail = async () => {
        if (!selectedFile) return null;

        setLoading(true);
        const fileName = `thumbnails/${Date.now()}-${selectedFile.name}`;

        const { error } = await supabase.storage
            .from("uploads")
            .upload(fileName, selectedFile);

        setLoading(false);

        if (error) {
            toast.error(`Lỗi khi tải ảnh lên! ${error.message}`);
            return null;
        }
        return supabase.storage.from("uploads").getPublicUrl(fileName).data.publicUrl;
    };
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setSelectedFile(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedFile) {
            toast.error("Vui lòng tải lên ảnh bìa!");
            return;
        }

        setLoading(true);

        try {
            const uploadedThumbnail = await uploadThumbnail();
            if (!uploadedThumbnail) throw new Error("Tải ảnh lên thất bại!");

            mutation.mutate({
                title,
                content,
                status,
                categoryId,
                thumbnail: uploadedThumbnail,
            });
        } catch {
            toast.error("Tạo bài viết thất bại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Tiêu đề bài viết"
            />

            <div>
                <label className="text-sm font-medium">Nội dung</label>
                <SimpleMdeEditor value={content} onChange={setContent} />
            </div>

            <div>
                <label className="text-sm font-medium">Trạng thái</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                >
                    <option value="published">Công khai</option>
                    <option value="draft">Nháp</option>
                </select>
            </div>
            <div>
                <Label htmlFor="thumbnail">Ảnh bìa</Label>
                <Input type="file" id="thumbnail" accept="image/*" onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded-md" />
                {selectedFile && (
                    <div className="mt-2">
                        <Image
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                        width={600}
                        height={300}
                        className="w-40 h-40 object-cover rounded-md" />
                    </div>
                )}
            </div>

            <div>
                <label className="text-sm font-medium">Danh mục</label>
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                >
                    <option value="" disabled>Chọn danh mục</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                    {loading ? "Đang lưu..." : "Tạo bài viết"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Hủy
                </Button>
            </div>
        </form>
    );
}
