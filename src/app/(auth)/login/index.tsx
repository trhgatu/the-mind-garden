import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LoginPage() {
    return (
        <Card className="w-full border-0 bg-background max-w-md">
            <CardHeader>
                <CardTitle>
                    <h2 className="text-2xl font-bold text-center">Welcome!</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="mb-4">
                        <label className="block font-medium mb-2">Email</label>
                        <Input type="email" placeholder="Enter your email" />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-2">Mật khẩu</label>
                        <Input type="password" placeholder="Enter your password" />
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" />
                            <label htmlFor="remember" className="text-sm">Nhớ tài khoản</label>
                        </div>
                        <Link href="/forgot-password" className="text-red-500 text-sm">
                            Quên mật khẩu?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-red-600 text-white hover:bg-red-700"
                    >
                        Đăng nhập
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
                    <span> Không có tài khoản?{" "}</span>
                    <Link href="/sign-up" className="text-white ml-4 font-medium">Đăng ký</Link>
                </p>
            </CardContent>
        </Card>
    );
}
