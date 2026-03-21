const API_URL = 'http://localhost:5000/api';

export const login = async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
};


export const fetchProjects = async () => {
    const response = await fetch(`${API_URL}/projects`);
    return response.json();
};

export const fetchCertificates = async () => {
    const response = await fetch(`${API_URL}/certificates`);
    return response.json();
};

export const createProject = async (data: any, token: string | null) => {
    const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return response.json();
};

export const updateProject = async (id: string, data: any, token: string | null) => {
    const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return response.json();
};

export const deleteProject = async (id: string, token: string | null) => {
    await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
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
    const response = await fetch(`${API_URL}/certificates`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return response.json();
};


export const updateCertificate = async (id: string, data: any, token: string | null) => {
    const response = await fetch(`${API_URL}/certificates/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return response.json();
};

export const deleteCertificate = async (id: string, token: string | null) => {
    await fetch(`${API_URL}/certificates/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
};

export const sendMessage = async (data: any) => {
    const response = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
};

export const fetchMessages = async (token: string | null) => {
    const response = await fetch(`${API_URL}/messages`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
};

export const deleteMessage = async (id: string, token: string | null) => {
    await fetch(`${API_URL}/messages/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
};

