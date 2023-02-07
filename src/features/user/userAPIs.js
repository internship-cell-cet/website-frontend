import { API } from '../../api/index';

export const signinAPI = (data) => API.post('/user/signin', data);

export const signupAPI = (data) => API.post('/user/signup', data);

export const providerRegisterAPI = (data) => API.post('/auth/providers/register', data);

export const seekerRegisterAPI = (data) => API.post('/seekers/register', data);

export const imageUploadAPI = (data) => API.post('/user/upload-image', data);

export const resumeUploadAPI = (data) => API.post('/seekers/upload-resume', data);

export const checkIsAuthenticatedAPI = () => API.get('/auth/users/isAuthenticated');

export const applyJobAPI = (data) => API.post('/auth/jobs/apply-job', data);
