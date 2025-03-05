// PostEditForm.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMde from "react-mde";
import PostContent from "@/components/post/post-content/post-content";

interface PostEditFormProps {
    post: { title: string; content: string; status: string; categoryId: string; slug: string };
    onSuccess?: () => void;
}

export function PostEditForm({ post, onSuccess }: PostEditFormProps) {
    const router = useRouter();
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [status, setStatus] = useState(post.status);
    const [categoryId, setCategoryId] = useState(post.categoryId);
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

    const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch("http://localhost:8080/api/v1/categories");
            const data = await res.json();
            setCategories(data.categories);
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`/api/v1/posts/${post.slug}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content, status, categoryId }),
            });

            if (!res.ok) throw new Error("Cập nhật bài viết thất bại!");

            alert("Cập nhật bài viết thành công!");

            if (onSuccess) {
                onSuccess();
            } else {
                router.push("/admin/posts");
            }
        } catch (error) {
            alert(error.message);
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
            />

            <div>
                <label className="text-sm font-medium">Nội dung</label>
                <ReactMde
                    value={content}
                    onChange={setContent}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                    generateMarkdownPreview={(content) =>
                        Promise.resolve(<PostContent content={content} />)
                    }
                />
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
                    {loading ? "Đang lưu..." : "Lưu thay đổi"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Hủy
                </Button>
            </div>
        </form>
    );
}
