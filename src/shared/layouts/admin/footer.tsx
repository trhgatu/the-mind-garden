import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full py-6">
            <div className="container mx-auto px-4 text-center">
                {/* Logo & Bản quyền */}
                <p className="text-lg font-semibold">The Mind Garden</p>
                <p className="text-sm mt-1">© {new Date().getFullYear()} All rights reserved.</p>

                {/* Mạng xã hội */}
                <div className="flex justify-center gap-4 mt-3">
                    <Link href="#" className="hover:text-blue-500">
                        <Facebook className="w-5 h-5" />
                    </Link>
                    <Link href="#" className="hover:text-blue-500">
                        <Twitter className="w-5 h-5" />
                    </Link>
                    <Link href="#" className="hover:text-blue-500">
                        <Instagram className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
