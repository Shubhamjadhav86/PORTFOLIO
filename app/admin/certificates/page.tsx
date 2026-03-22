'use client';

import { useState, useEffect } from 'react';
import { fetchCertificates, deleteProject, uploadImage } from '@/lib/admin-api'; // Reusing delete for certificates or creating specific one
import { safeStorage } from '@/lib/safe-storage';
import { Plus, Trash2, Edit2, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';

const API_URL = process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/api` : '';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

interface Certificate {
    _id?: string;
    title: string;
    issuer: string;
    date: string;
    image: string;
}

export default function CertificatesPage() {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newCert, setNewCert] = useState<Certificate>({
        title: '',
        issuer: '',
        date: '',
        image: ''
    });

    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [certToDelete, setCertToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        loadCertificates();
    }, []);

    const loadCertificates = async () => {
        try {
            const { fetchCertificates } = await import('@/lib/admin-api');
            const data = await fetchCertificates();
            setCertificates(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (cert: Certificate) => {
        setNewCert({ ...cert });
        setEditingId(cert._id || null);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteClick = (id: string) => {
        setCertToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!certToDelete) return;
        
        setIsDeleting(true);
        try {
            const token = safeStorage.getItem('adminToken');
            const { deleteCertificate } = await import('@/lib/admin-api');
            await deleteCertificate(certToDelete, token);
            setIsDeleteModalOpen(false);
            setCertToDelete(null);
            loadCertificates();
        } catch (err) {
            console.error(err);
            alert('Failed to delete certificate. Check connection or token.');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = safeStorage.getItem('adminToken');
            const { createCertificate, updateCertificate } = await import('@/lib/admin-api');
            
            if (editingId) {
                await updateCertificate(editingId, newCert, token);
            } else {
                await createCertificate(newCert, token);
            }
            setShowForm(false);
            setEditingId(null);
            setNewCert({ title: '', issuer: '', date: '', image: '' });
            loadCertificates();
        } catch (err) {
            console.error(err);
            alert('Failed to save certificate.');
        }
    };



    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const response = await uploadImage(file);
            // Extract the URL whether the response is the object {imageUrl: '...'} or just the string
            const imageUrl = response.imageUrl || response;
            setNewCert({ ...newCert, image: imageUrl });
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Upload failed. Check console.");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold">Manage Certificates</h1>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 font-bold transition-all"
                >
                    <Plus size={20} />
                    Add Certificate
                </button>
            </div>

            {showForm && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-10 bg-[#151515] p-8 rounded-2xl border border-white/10"
                >
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm mb-2">Title</label>
                                <input 
                                    className="w-full bg-black border border-white/20 p-3 rounded-lg"
                                    value={newCert.title}
                                    onChange={(e) => setNewCert({...newCert, title: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-2">Issuer</label>
                                <input 
                                    className="w-full bg-black border border-white/20 p-3 rounded-lg"
                                    value={newCert.issuer}
                                    onChange={(e) => setNewCert({...newCert, issuer: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-2">Date</label>
                                <input 
                                    className="w-full bg-black border border-white/20 p-3 rounded-lg"
                                    value={newCert.date}
                                    onChange={(e) => setNewCert({...newCert, date: e.target.value})}
                                    placeholder="March 2024"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm mb-2 text-gray-400">Credential (PDF or Image)</label>
                                <input 
                                    type="file" 
                                    onChange={handleImageUpload} 
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" 
                                    accept=".pdf,image/*"
                                />
                                {newCert.image && (
                                    <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/5 flex items-center gap-3">
                                        {typeof newCert.image === 'string' && newCert.image.endsWith('.pdf') ? (
                                            <>
                                                <div className="p-3 bg-red-500/10 rounded-lg">
                                                    <FileText className="text-red-400" size={24} />
                                                </div>
                                                <span className="text-sm font-mono text-gray-400 truncate">Document Uploaded</span>
                                            </>
                                        ) : (
                                            <img src={typeof newCert.image === 'string' && newCert.image.startsWith('http') ? newCert.image : `${BASE_URL}${newCert.image}`} alt="Preview" className="h-40 w-full rounded-lg object-contain bg-black/50" />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-4 mt-6">
                            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 rounded-lg hover:bg-white/5 transition-all">Cancel</button>
                            <button type="submit" className="px-10 py-2 rounded-lg bg-purple-600 font-bold hover:bg-purple-700 transition-all">
                                {editingId ? 'Update Certificate' : 'Save Certificate'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                    <div key={cert._id} className="bg-[#151515] rounded-2xl border border-white/5 overflow-hidden p-4">
                        <div className="w-full h-48 rounded-xl bg-black/50 mb-4 flex items-center justify-center border border-white/5 overflow-hidden">
                            {typeof cert.image === 'string' && cert.image.endsWith('.pdf') ? (
                                <FileText className="text-red-400" size={48} />
                            ) : (
                                <img src={typeof cert.image === 'string' && cert.image.startsWith('http') ? cert.image : `${BASE_URL}${cert.image}`} alt={cert.title} className="w-full h-full object-contain" />
                            )}
                        </div>
                        <h3 className="text-xl font-bold mb-1">{cert.title}</h3>
                        <p className="text-gray-400 text-sm mb-4">{cert.issuer} • {cert.date}</p>
                         <div className="flex items-center gap-3">
                            <button onClick={() => handleEdit(cert)} className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 flex justify-center items-center gap-2 transition-all"><Edit2 size={16} /> Edit</button>
                            <button onClick={() => cert._id && handleDeleteClick(cert._id)} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>

            <DeleteConfirmModal 
                isOpen={isDeleteModalOpen}
                loading={isDeleting}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Certificate"
                message={`Are you sure you want to delete this certificate? This action cannot be undone.`}
            />
        </div>
    );
}
