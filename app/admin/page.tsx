'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/lib/cookies';
import { safeStorage } from '@/lib/safe-storage';

export default function AdminPage() {
    const router = useRouter();

    useEffect(() => {
        const token = getCookie('adminToken') || safeStorage.getItem('adminToken');
        const isValid = token && token !== 'null' && token !== 'undefined';

        if (isValid) {
            router.replace('/admin/dashboard');
        } else {
            router.replace('/admin/login');
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
        </div>
    );
}
