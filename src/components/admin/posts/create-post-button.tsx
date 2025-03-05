"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function CreatePostButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.push("/admin/posts/create")} className="flex items-center gap-2">
      <Plus size={16} />
      Thêm bài viết
    </Button>
  );
}
