"use client";

import Sidebar from '@/components/admin/Sidebar';
import { StarsCanvas } from '@/components/star-background';
import { safeStorage } from '@/lib/safe-storage';
import { getCookie } from '@/lib/cookies';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        const token = getCookie('adminToken') || safeStorage.getItem('adminToken');
        const isValid = token && token !== 'null' && token !== 'undefined';
        
        setIsAuthenticated(!!isValid);


        if (!isValid && pathname !== '/admin/login') {
            router.replace('/admin/login');
        } else if (isValid && pathname === '/admin/login') {
            router.replace('/admin/dashboard');
        }
    }, [pathname, router]);

    if (!mounted) {
        return <div className="min-h-screen bg-black" />;
    }

    const showSidebar = isAuthenticated && pathname !== '/admin/login';

    return (
        <div className="min-h-screen bg-[#050505] text-white relative font-sans">
            {showSidebar && <Sidebar />}
            
            <main className={cn(
                "p-8 transition-all duration-300",
                showSidebar ? "ml-64" : "ml-0"
            )}>
                <div className={cn(
                    "max-w-7xl mx-auto rounded-3xl border border-white/5 bg-[#0a0a0a] shadow-2xl relative z-10",
                    pathname === '/admin/login' ? "bg-transparent border-none p-0" : "p-10"
                )}>
                    {children}
                </div>
            </main>
        </div>
    );
}
