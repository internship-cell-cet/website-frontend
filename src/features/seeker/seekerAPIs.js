import { API } from '../../api/index';

export const recentJobsAPI = () => API.get('/jobs/recent-jobs');

export const appliedJobsAPI = () => API.get('/auth/jobs/jobs-applied');

export const fetchProvidersAPI = () => API.get('/providers/fetch-providers');

export const searchJobsAPI = (data) => API.post('/seekers/search', data);
