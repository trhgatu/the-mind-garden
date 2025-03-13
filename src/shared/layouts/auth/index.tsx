
import { LayoutProps } from '@/shared/models/common';


export function AuthLayout({ children }: LayoutProps) {
    return (
        <div className='relative container mx-auto h-screen flex'>
            {children}
        </div>
    );
}