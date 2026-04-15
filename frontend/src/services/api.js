import axios from 'axios';

// Use environment variable or fallback to localhost
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Repo APIs ───────────────────────────────────────────
export const submitRepo = (url, category, subcategory) => api.post('/repo', { url, category, subcategory });
export const fetchRepos = (params = {}) => api.get('/repos', { params });
export const fetchRepoById = (id) => api.get(`/repo/${id}`);
export const deleteRepo = (id) => api.delete(`/repo/${id}`);

// ─── Comment APIs ─────────────────────────────────────────
export const fetchComments = (repoId, sort = 'newest') =>
  api.get(`/repo/${repoId}/comments`, { params: { sort } });
export const addComment = (repoId, data) => api.post(`/repo/${repoId}/comment`, data);
export const likeComment = (commentId) => api.put(`/comment/${commentId}/like`);
export const deleteComment = (commentId) => api.delete(`/comment/${commentId}`);

export default api;
