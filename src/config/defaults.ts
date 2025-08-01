export const DEFAULTS = {
	TEMPLATE_FALLBACKS: {
		fullName: '',
		email: '',
		phone: '',
		location: '',
		linkedin: '',
		portfolio: '',
		companyName: '',
		jobTitle: '',
		hiringManager: '',
		companyAddress: '',
	},

	INITIAL_STATES: {
		CANDIDATE_DETAILS: {
			fullName: '',
			email: '',
			phone: '',
			location: '',
			linkedin: '',
			portfolio: '',
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
			resume: '',
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
		SKILLS_RANGE: {
			MIN: 0,
			MAX: 20,
		},
		TEXTAREA_ROWS: 10,
	},
} as const;
