'use client';

import { useEffect, useState } from 'react';
import { fetchProjects, fetchCertificates, fetchMessages } from '@/lib/admin-api';
import { FolderKanban, Award, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { safeStorage } from '@/lib/safe-storage';

export default function DashboardPage() {
    const [stats, setStats] = useState({ projects: 0, certificates: 0, messages: 0 });

    useEffect(() => {
        const getStats = async () => {
            const token = safeStorage.getItem('adminToken');
            if (!token) return;

            try {
                const projects = await fetchProjects();
                const certs = await fetchCertificates();
                const messages = await fetchMessages(token);
                setStats({ 
                    projects: projects.length, 
                    certificates: certs.length, 
                    messages: messages.length 
                });
            } catch (err) {
                console.error('Stats load error:', err);
            }
        };
        getStats();
    }, []);



    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">System Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="p-8 rounded-2xl bg-[#151515] border border-white/5 flex items-center justify-between"
                >
                    <div>
                        <p className="text-gray-400 font-medium mb-1">Projects</p>
                        <h2 className="text-4xl font-bold">{stats.projects}</h2>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-500/10 text-blue-500">
                        <FolderKanban size={32} />
                    </div>
                </motion.div>

                <motion.div 
                    whileHover={{ y: -5 }}
                    className="p-8 rounded-2xl bg-[#151515] border border-white/5 flex items-center justify-between"
                >
                    <div>
                        <p className="text-gray-400 font-medium mb-1">Certificates</p>
                        <h2 className="text-4xl font-bold">{stats.certificates}</h2>
                    </div>
                    <div className="p-4 rounded-xl bg-purple-500/10 text-purple-500">
                        <Award size={32} />
                    </div>
                </motion.div>

                <motion.div 
                    whileHover={{ y: -5 }}
                    className="p-8 rounded-2xl bg-[#151515] border border-white/5 flex items-center justify-between"
                >
                    <div>
                        <p className="text-gray-400 font-medium mb-1">Messages</p>
                        <h2 className="text-4xl font-bold">{stats.messages}</h2>
                    </div>
                    <div className="p-4 rounded-xl bg-green-500/10 text-green-500">
                        <MessageSquare size={32} />
                    </div>
                </motion.div>
            </div>

        </div>
    );
}
