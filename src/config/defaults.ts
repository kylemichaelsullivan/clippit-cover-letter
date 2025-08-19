export const DEFAULTS = {
	GENERATING_TEXT: 'Generating…',

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
