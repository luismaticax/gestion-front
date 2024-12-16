import axios from './axios';

export const getProjectById = (id: string) =>
    axios.get(`/projects/${id}`);

export const getAllProjectsByTeamId = (id: string) =>
    axios.get(`/projects/all/${id}`);

export const deleteProjectById = (id: string) =>
    axios.delete(`/projects/${id}`);

export const createProject = (projectData: object) =>
    axios.post('/projects/create', projectData);

export const updateProjectCompletion = (projectId: string) =>
    axios.put(`/projects/${projectId}/completion`);

export const getAllProjects = () =>
    axios.get('http://localhost:4000/projects/')

export const getDashboardData = (projectId: string) => {
    return axios.get(`/projects/dashboard/${projectId}/`)
}