import { API } from '../../api/index';

export const createJobAPI = (data) => API.post('/auth/jobs/create-job', data);

export const providedJobsAPI = () => API.get('/auth/jobs/jobs-provided');

export const fetchApplicantDetailsAPI = (data) => API.post('/jobs/fetch-applicants', data);

export const selectApplicantAPI = (data) => API.post('/auth/jobs/select-applicant', data);

export const hireApplicantAPI = (data) => API.post('/auth/jobs/hire-applicant', data);
