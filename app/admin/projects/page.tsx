'use client';

import { useState, useEffect } from 'react';
import { fetchProjects, deleteProject, createProject, uploadImage } from '@/lib/admin-api';
import { safeStorage } from '@/lib/safe-storage';
import { Plus, Trash2, Edit2, ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const BASE_URL = 'http://localhost:5000';

interface Project {
    _id?: string;
    title: string;
    description: string;
    techStack: string | string[];
    image: string;
    liveLink: string;
    githubLink: string;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newProject, setNewProject] = useState<Project>({
        title: '',
        description: '',
        techStack: '',
        image: '',
        liveLink: '',
        githubLink: ''
    });

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const data = await fetchProjects();
            setProjects(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (project: Project) => {
        setNewProject({
            ...project,
            techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : project.techStack
        });
        setEditingId(project._id || null);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        const token = safeStorage.getItem('adminToken');
        await deleteProject(id, token);
        loadProjects();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = safeStorage.getItem('adminToken');
        const formattedProject = {
            ...newProject,
            techStack: typeof newProject.techStack === 'string' 
                ? newProject.techStack.split(',').map(s => s.trim())
                : newProject.techStack
        };
        
        if (editingId) {
            const { updateProject } = await import('@/lib/admin-api');
            await updateProject(editingId, formattedProject, token);
        } else {
            await createProject(formattedProject, token);
        }

        setNewProject({ title: '', description: '', techStack: '', image: '', liveLink: '', githubLink: '' });
        setEditingId(null);
        setShowForm(false);
        loadProjects();
    };


    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const imageUrl = await uploadImage(file);
        setNewProject({ ...newProject, image: imageUrl });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold">Manage Projects</h1>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold transition-all"
                >
                    <Plus size={20} />
                    Add Project
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
                                    value={newProject.title}
                                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-2">Tech Stack (comma separated)</label>
                                <input 
                                    className="w-full bg-black border border-white/20 p-3 rounded-lg"
                                    value={newProject.techStack}
                                    onChange={(e) => setNewProject({...newProject, techStack: e.target.value})}
                                    placeholder="React, Next.js, TailWind"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-2">Live Link</label>
                                <input 
                                    className="w-full bg-black border border-white/20 p-3 rounded-lg"
                                    value={newProject.liveLink}
                                    onChange={(e) => setNewProject({...newProject, liveLink: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-2">GitHub Link</label>
                                <input 
                                    className="w-full bg-black border border-white/20 p-3 rounded-lg"
                                    value={newProject.githubLink}
                                    onChange={(e) => setNewProject({...newProject, githubLink: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm mb-2">Description</label>
                                <textarea 
                                    className="w-full bg-black border border-white/20 p-3 rounded-lg h-32"
                                    value={newProject.description}
                                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-2">Image</label>
                                <input type="file" onChange={handleImageUpload} className="mb-2" />
                                {newProject.image && <img src={newProject.image.startsWith('http') ? newProject.image : `${BASE_URL}${newProject.image}`} alt="Preview" className="h-32 rounded-lg object-cover" />}
                            </div>
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-4 mt-6">
                            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 rounded-lg hover:bg-white/5 transition-all">Cancel</button>
                            <button type="submit" className="px-10 py-2 rounded-lg bg-blue-600 font-bold hover:bg-blue-700 transition-all">
                                {editingId ? 'Update Project' : 'Save Project'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <div key={project._id} className="bg-[#151515] rounded-2xl border border-white/5 overflow-hidden flex gap-6 p-6">
                        <img src={project.image?.startsWith('http') ? project.image : `${BASE_URL}${project.image}`} alt={project.title} className="w-40 h-40 rounded-xl object-cover" />
                        <div className="flex-1 flex flex-col">
                            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                             <div className="flex flex-wrap gap-2 mb-6">
                                {Array.isArray(project.techStack) && project.techStack.map((tech: string) => (
                                    <span key={tech} className="text-[10px] px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 uppercase tracking-wider">{tech}</span>
                                ))}
                            </div>
                            <div className="flex items-center gap-4 mt-auto">
                                <a href={project.liveLink} target="_blank" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all"><ExternalLink size={18} /></a>
                                <a href={project.githubLink} target="_blank" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all"><Github size={18} /></a>
                                <button onClick={() => handleEdit(project)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all"><Edit2 size={18} /></button>
                                <button onClick={() => project._id && handleDelete(project._id)} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all"><Trash2 size={18} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
