import { vi } from 'vitest';

export const mockAppStore = {
	includeCoverLetter: true,
	includeResume: true,
	coverLetterFontSize: [12, 'pt'] as const,
	resumeFontSize: [11, 'pt'] as const,
	setCoverLetterFontSize: vi.fn(),
	setResumeFontSize: vi.fn(),
};

export const mockTemplatesStore = {
	generatedCoverLetter: 'Generated cover letter content',
	generatedResume: 'Generated resume content',
	setGeneratedCoverLetter: vi.fn(),
	setGeneratedResume: vi.fn(),
};

export const mockCandidateStore = {
	candidateDetails: {
		fullName: 'John Doe',
		email: 'john@example.com',
		phone: '555-1234',
		linkedin: 'johndoe',
		portfolio: 'https://portfolio.com',
		location: 'New York, NY',
		logo: '',
		logoInclude: true,
		signature: '',
		portfolioQRCode: true,
		signatureUseImage: false,
	},
	setCandidateDetails: vi.fn(),
	updateCandidateField: vi.fn(),
};

export const mockSkillsStore = {
	skills: {
		groups: [
			{
				id: '1',
				name: 'Programming Languages',
				skills: ['JavaScript', 'TypeScript'],
				include: true,
			},
			{
				id: '2',
				name: 'Frameworks',
				skills: ['React', 'Next.js'],
				include: false,
			},
		],
	},
	setSkills: vi.fn(),
	addSkillGroup: vi.fn(),
	removeSkillGroup: vi.fn(),
	updateSkillGroup: vi.fn(),
};

export const mockResumeStore = {
	resumeDetails: {
		summary:
			'Experienced software engineer with expertise in modern web technologies.',
		experience: [
			{
				id: 'exp-1',
				include: true,
				title: 'Software Engineer',
				company: 'Tech Corp',
				start: '2020',
				end: 'Present',
				bullets: ['Developed React applications', 'Led team of 3 developers'],
			},
		],
		education: [
			{
				id: 'edu-1',
				include: true,
				degree: 'Bachelor of Science',
				graduationYear: '2018',
				institution: 'University',
				location: 'City, State',
			},
		],
	},
	setResumeDetails: vi.fn(),
	updateResumeField: vi.fn(),
	addExperience: vi.fn(),
	removeExperience: vi.fn(),
	updateExperience: vi.fn(),
	addEducation: vi.fn(),
	removeEducation: vi.fn(),
	updateEducation: vi.fn(),
	clearResume: vi.fn(),
};
