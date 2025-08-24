export const DEFAULTS = {
	GENERATING_TEXT: 'Generating…',

	FORM_DEFAULTS: {
		INCLUDE_COVER_LETTER: true,
		INCLUDE_RESUME: true,
		INCLUDE_SKILL_GROUP_NAMES: true,
		INCLUDE_SKILLS: true,
		RESUME_FONT_SIZE: 11,
		SKILLS_RANGE: {
			MAX: 20,
			MIN: 0,
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
			bullets: [],
			company: '',
			end: '',
			start: '',
			title: '',
		},
		GENERATION: {
			generatedCoverLetter: '',
			generatedResume: '',
			generatedSkills: '',
			isGenerating: false,
		},
		JOB_DETAILS: {
			companyAddress: '',
			companyName: '',
			hiringManager: '',
			jobDescription: '',
			jobTitle: '',
		},
		PHASE: 'welcome',
		RESUME: {
			experience: '',
			summary: '',
		},
		SKILLS: {
			groups: [{ id: '', include: true, name: '', skills: [] }],
			maxSkillsToUse: 10,
			minSkillsToUse: 5,
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
