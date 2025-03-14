"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/shared/contexts";
import { Loader2 } from "lucide-react"; // Icon loading

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Thêm state loading
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login({ email, password });
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full border-0 bg-background max-w-md">
            <CardHeader>
                <CardTitle>
                    <h2 className="text-2xl font-bold text-center">Welcome!</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block font-medium mb-2">Email</label>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading} // Vô hiệu hóa khi đang tải
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-2">Mật khẩu</label>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" disabled={isLoading} />
                            <label htmlFor="remember" className="text-sm">Nhớ tài khoản</label>
                        </div>
                        <Link href="/forgot-password" className="text-red-500 text-sm">
                            Quên mật khẩu?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-red-600 text-white hover:bg-red-700 flex items-center justify-center gap-2"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" /> Đang đăng nhập...
                            </>
                        ) : (
                            "Đăng nhập"
                        )}
                    </Button>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 dark:bg-black bg-white">Hoặc tiếp tục với</span>
                    </div>
                </div>

                <p className="mt-6 text-center flex items-center justify-center text-gray-700 text-sm">
                    <span>Không có tài khoản?{" "}</span>
                    <Link href="/register" className="text-red-500 ml-4 font-medium">Đăng ký</Link>
                </p>
            </CardContent>
        </Card>
    );
}
