import { LayoutProps } from '@/shared/models/common';
import Image from 'next/image';
import { ModeToggle } from '@/shared/components/toggle-theme';

export function AuthLayout({ children }: LayoutProps) {
    return (
        <div className="relative container mx-auto h-screen flex items-center justify-center">
            <div className="w-full h-full grid grid-cols-2">
                <div className="relative w-full h-full">
                    <Image
                        alt="Auth Background"
                        src="/assets/images/gate_5.svg"
                        fill
                        priority
                        className="object-cover"
                    />
                </div>
                <div className="flex items-center justify-center p-10">
                    {children}
                </div>

                {/* Mode Toggle */}
                <div className="absolute bottom-14 left-5">
                    <ModeToggle />
                </div>
            </div>
        </div>
    );
}
