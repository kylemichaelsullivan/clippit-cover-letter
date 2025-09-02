import type { FontSize } from '@/types';

export const DEFAULTS = {
	GENERATING_TEXT: 'Generating…',

	FORM_DEFAULTS: {
		INCLUDE_COVER_LETTER: true,
		INCLUDE_RESUME: true,
		INCLUDE_SKILL_GROUP_NAMES: true,
		INCLUDE_SKILLS: true,
		RESUME_FONT_SIZE: [11, 'pt'] as FontSize,
		COVER_LETTER_FONT_SIZE: [11, 'pt'] as FontSize,
		SKILLS_RANGE: {
			MIN: 0,
			MAX: 20,
		},
		TEXTAREA_ROWS: 10,
	},

	INITIAL_STATES: {
		CANDIDATE_DETAILS: {
			email: '',
			fullName: '',
			linkedin: '',
			location: '',
			logo: '',
			logoInclude: true,
			phone: '',
			portfolio: '',
			signature: '',
			portfolioQRCode: true,
			signatureUseImage: false,
		},
		DOCUMENT_INSTRUCTIONS: {
			coverLetterInstructions: '',
			resumeInstructions: '',
			skillsInstructions: '',
		},
		EDUCATION: {
			degree: '',
			graduationYear: '',
			institution: '',
			location: '',
		},
		EXPERIENCE: {
			title: '',
			company: '',
			start: '',
			end: '',
			bullets: [],
		},
		GENERATION: {
			generatedCoverLetter: '',
			generatedResume: '',
			generatedSkills: '',
			isGenerating: false,
		},
		JOB_DETAILS: {
			companyName: '',
			jobTitle: '',
			hiringManager: '',
			companyAddress: '',
			jobDescription: '',
		},
		PHASE: 'welcome',
		RESUME: {
			experience: '',
			summary: '',
		},
		SKILLS: {
			groups: [{ id: '', include: true, name: '', skills: [] }],
			minSkillsToUse: 5,
			maxSkillsToUse: 10,
		},
		TEMPLATES: {
			coverLetter: '',
		},
	},

	TEMPLATE_FALLBACKS: {
		companyAddress: '',
		companyName: '',
		email: '',
		fullName: '',
		hiringManager: '',
		jobTitle: '',
		linkedin: '',
		location: '',
		logo: '',
		logoInclude: true,
		phone: '',
		portfolio: '',
		signature: '',
		portfolioQRCode: true,
		signatureUseImage: false,
	},
} as const;
