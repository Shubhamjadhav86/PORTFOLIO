'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FolderKanban, Award, LogOut, MessageSquare, Globe, ExternalLink } from 'lucide-react';
import { safeStorage } from '@/lib/safe-storage';
import { deleteCookie } from '@/lib/cookies';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { name: 'Certificates', href: '/admin/certificates', icon: Award },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
];



export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        safeStorage.removeItem('adminToken');
        deleteCookie('adminToken');
        window.location.href = '/admin/login';
    };


    return (
        <aside className="w-64 bg-[#111] border-r border-white/10 h-screen fixed left-0 top-0 flex flex-col p-6">
            <div className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Admin Panel
            </div>


            <div className="mb-8">
                <Link 
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 transition-all border border-white/5 hover:border-white/10 group"
                >
                    <Globe size={18} className="group-hover:text-blue-400" />
                    <span className="font-medium text-sm">View Website</span>
                    <ExternalLink size={14} className="ml-auto opacity-20" />
                </Link>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link 
                            key={item.name} 
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                                isActive ? "bg-blue-600/10 text-blue-400 border border-blue-500/20" : "text-gray-400 hover:bg-white/5"
                            )}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all mt-auto"
            >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
            </button>
        </aside>
    );
}
