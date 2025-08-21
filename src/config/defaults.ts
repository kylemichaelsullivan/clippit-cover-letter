export const DEFAULTS = {
	GENERATING_TEXT: 'Generating…',

	TEMPLATE_FALLBACKS: {
		companyAddress: '',
		companyName: '',
		email: '',
		fullName: '',
		hiringManager: '',
		linkedin: '',
		location: '',
		logo: '',
		logoInclude: true,
		phone: '',
		portfolio: '',
		signature: '',
		signatureInclude: true,
		jobTitle: '',
	},

	INITIAL_STATES: {
		CANDIDATE_DETAILS: {
			fullName: '',
			email: '',
			phone: '',
			location: '',
			linkedin: '',
			portfolio: '',
			logo: '',
			logoInclude: true,
			signature: '',
			signatureInclude: true,
		},
		SKILLS: {
			groups: [{ id: '', name: '', skills: [] }],
			minSkillsToUse: 5,
			maxSkillsToUse: 10,
		},
		JOB_DETAILS: {
			companyName: '',
			jobTitle: '',
			jobDescription: '',
			hiringManager: '',
			companyAddress: '',
		},
		TEMPLATES: {
			coverLetter: '',
		},

		RESUME: {
			summary: '',
			experience: '',
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
			generatedSkills: '',
			generatedCoverLetter: '',
			generatedResume: '',
			isGenerating: false,
		},
		PHASE: 'candidate',
		DOCUMENT_INSTRUCTIONS: {
			skillsInstructions: '',
			coverLetterInstructions: '',
			resumeInstructions: '',
		},
	},

	FORM_DEFAULTS: {
		INCLUDE_SKILLS: true,
		INCLUDE_COVER_LETTER: true,
		INCLUDE_RESUME: true,
		INCLUDE_SKILL_GROUP_NAMES: true,
		SKILLS_RANGE: {
			MIN: 0,
			MAX: 20,
		},
		TEXTAREA_ROWS: 10,
		RESUME_FONT_SIZE: 11,
	},
} as const;
