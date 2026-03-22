import { getCookie } from '@/lib/cookies';
import { safeStorage } from '@/lib/safe-storage';

const API_URL = typeof window !== 'undefined' 
    ? `http://${window.location.hostname}:5000/api` 
    : 'http://localhost:5000/api';

const getValidToken = (passedToken: string | null) => {
    let t = passedToken;
    if (!t || t === 'null' || t === 'undefined') {
        t = safeStorage.getItem('adminToken');
    }
    if (!t || t === 'null' || t === 'undefined') {
        t = getCookie('adminToken');
    }
    return t;
};
export const login = async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
};

export const verifyToken = async (token: string | null) => {
    if (!token) return { valid: false };
    try {
        const response = await fetch(`${API_URL}/admin/verify`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) return { valid: false };
        return response.json();
    } catch (error) {
        return { valid: false };
    }
};


export const fetchProjects = async () => {
    const response = await fetch(`${API_URL}/projects?t=${Date.now()}`, { cache: 'no-store' });
    return response.json();
};

export const fetchCertificates = async () => {
    const response = await fetch(`${API_URL}/certificates?t=${Date.now()}`, { cache: 'no-store' });
    return response.json();
};

export const createProject = async (data: any, token: string | null) => {
    const authToken = getValidToken(token);
    const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create project');
    return response.json();
};

export const updateProject = async (id: string, data: any, token: string | null) => {
    const authToken = getValidToken(token);
    const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update project');
    return response.json();
};

export const deleteProject = async (id: string, token: string | null) => {
    const authToken = getValidToken(token);
    const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (!response.ok) throw new Error('Failed to delete project');
    return response.json();
};

export const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
    });
    return response.json();
};

export const createCertificate = async (data: any, token: string | null) => {
    const authToken = getValidToken(token);
    const response = await fetch(`${API_URL}/certificates`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create certificate');
    return response.json();
};


export const updateCertificate = async (id: string, data: any, token: string | null) => {
    const authToken = getValidToken(token);
    const response = await fetch(`${API_URL}/certificates/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update certificate');
    return response.json();
};

export const deleteCertificate = async (id: string, token: string | null) => {
    const authToken = getValidToken(token);
    const response = await fetch(`${API_URL}/certificates/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (!response.ok) throw new Error('Failed to delete certificate');
    return response.json();
};

export const sendMessage = async (data: any) => {
    const response = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to send message');
    return response.json();
};

export const fetchMessages = async (token: string | null) => {
    const authToken = getValidToken(token);
    const response = await fetch(`${API_URL}/messages?t=${Date.now()}`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
        cache: 'no-store'
    });
    if (!response.ok) throw new Error('Failed to fetch messages');
    return response.json();
};

export const deleteMessage = async (id: string, token: string | null) => {
    const authToken = getValidToken(token);
    const response = await fetch(`${API_URL}/messages/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (!response.ok) throw new Error('Failed to delete message');
    return response.json();
};

