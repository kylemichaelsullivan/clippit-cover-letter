import type { Job } from '@/types';

export const mockJobDetails: Job = {
	companyName: 'Tech Corp',
	jobTitle: 'Software Engineer',
	hiringManager: 'Jane Smith',
	companyAddress: '123 Tech Street, San Francisco, CA',
	jobDescription:
		'Build amazing software applications using modern technologies.',
};

export const mockEmptyJobDetails: Job = {
	companyName: '',
	jobTitle: '',
	hiringManager: '',
	companyAddress: '',
	jobDescription: '',
};

export const mockPartialJobDetails: Job = {
	companyName: 'Startup Inc',
	jobTitle: 'Frontend Developer',
	hiringManager: '',
	companyAddress: 'Remote',
	jobDescription: 'Work on cutting-edge web applications.',
};
