"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { useUpload } from "@/hooks/data";
import { useCategories } from "@/hooks/data";
import ImageUpload from "@/components/admin/upload/image-upload";
import { CreatePostRequest } from "@/shared/types/post";
import "easymde/dist/easymde.min.css";
import MarkdownPreview from "@/components/admin/markdown-preview";
const SimpleMdeEditor = dynamic(() => import("react-simplemde-editor"), { ssr: false });
import ReactDOMServer from "react-dom/server";
interface PostFormProps {
    initialData?: CreatePostRequest;
    onSubmit: (data: CreatePostRequest) => void;
}

export function PostForm({ initialData, onSubmit }: PostFormProps) {
    const router = useRouter();
    const { uploadThumbnail } = useUpload();
    const { categories } = useCategories();

    const { register, handleSubmit, setValue, watch } = useForm<CreatePostRequest>({
        defaultValues: initialData || {
            title: "",
            content: "",
            status: "published",
            tags: [],
            location: "",
            categoryId: "",
            feeling: "",
            isAI: false,
            thumbnail: "",
        },
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleUpload = async (): Promise<string | null> => {
        if (!selectedFile) return null;
        return await uploadThumbnail(selectedFile);
    };

    const submitForm = async (data: CreatePostRequest) => {
        const uploadedThumbnail = selectedFile ? await handleUpload() : initialData?.thumbnail;
        if (!uploadedThumbnail) {
            toast.error("Vui lòng tải ảnh bìa!");
            return;
        }

        onSubmit({
            ...data,
            thumbnail: uploadedThumbnail,
        });
    };

    return (
        <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
            <Input {...register("title", { required: true })} placeholder="Tiêu đề bài viết" />

            <Label>Nội dung</Label>
            <SimpleMdeEditor
                value={watch("content")}
                onChange={(value) => setValue("content", value, { shouldValidate: true })}
                options={{
                    previewRender: () => {
                        return ReactDOMServer.renderToString(
                            <MarkdownPreview content={watch("content") || ""} />
                        );
                    },
                    autofocus: true,
                    spellChecker: false
                }}
            />
            <Label>Mô tả ngắn</Label>
            <Input {...register("excerpt", { required: true })} placeholder="Mô tả ngắn" />

            <Label>Trạng thái</Label>
            <select {...register("status")} className="w-full p-2 border border-gray-300 rounded-md">
                <option value="published">Công khai</option>
                <option value="draft">Nháp</option>
            </select>

            <Label>Danh mục</Label>
            <select {...register("categoryId")} className="w-full p-2 border border-gray-300 rounded-md">
                <option value="" disabled>Chọn danh mục</option>
                {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
            </select>

            <Label>Ảnh bìa</Label>
            <ImageUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile} existingImage={initialData?.thumbnail} />

            <div className="flex gap-4">
                <Button type="submit">Lưu bài viết</Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>Hủy</Button>
            </div>
        </form>
    );
}
