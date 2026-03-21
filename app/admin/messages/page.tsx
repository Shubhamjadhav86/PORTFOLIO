'use client';

import { useState, useEffect } from 'react';
import { fetchMessages, deleteMessage } from '@/lib/admin-api';
import { safeStorage } from '@/lib/safe-storage';
import { Trash2, Mail, User, Calendar, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
}

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            const token = safeStorage.getItem('adminToken');
            const data = await fetchMessages(token);
            setMessages(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;
        const token = safeStorage.getItem('adminToken');
        await deleteMessage(id, token);
        loadMessages();
    };

    if (loading) return <div className="flex justify-center items-center h-64">Loading messages...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-10">Messages</h1>

            <div className="space-y-6">
                {messages.length === 0 ? (
                    <div className="text-center py-20 bg-[#151515] rounded-3xl border border-white/5">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 text-white/20" />
                        <p className="text-white/40">No messages yet.</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <motion.div 
                            key={msg._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#151515] p-8 rounded-3xl border border-white/5 group hover:border-white/10 transition-all"
                        >
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-4 mb-4">
                                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono">
                                            <User size={14} />
                                            {msg.name}
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-mono">
                                            <Mail size={14} />
                                            {msg.email}
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-white/40 text-xs font-mono ml-auto">
                                            <Calendar size={14} />
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">{msg.subject}</h3>
                                    <p className="text-white/60 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                                </div>
                            </div>
                        </motion.div>

                    ))
                )}
            </div>
        </div>
    );
}
