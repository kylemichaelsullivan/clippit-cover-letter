export const CONSTANTS = {
	APP_NAME: 'Clippit',

	ARIA_LABELS: {
		RESUME_CONTENT: 'Resume content',
		COVER_LETTER_TEMPLATE: 'Cover letter template with mustache placeholders',
		PHASE_TABS: 'Tabs',

		THEME_TOGGLE: {
			LIGHT: 'Switch to light mode',
			DARK: 'Switch to dark mode',
			LIGHT_TEXT: 'Switch to Light Mode',
			DARK_TEXT: 'Switch to Dark Mode',
		},
		NAVIGATION: {
			FORWARD: 'Go to next phase',
			BACK: 'Go to previous phase',
		},
		COPYRIGHT: 'Copyright information',
	},

	CLASS_NAMES: {
		FORM_CONTAINER:
			'flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md w-full sm:gap-6 sm:p-6',
		SUBMIT_BUTTON: 'px-4 py-2',
		FORM_SECTION:
			'flex flex-col gap-2 bg-light-gray border border-black rounded-lg p-4 shadow-sm sm:p-6',

		SECTION_LABEL: 'cursor-pointer text-base font-medium text-black sm:text-lg',
	},

	FORM_FIELD_DEFAULTS: {
		AUTOCOMPLETE: {
			PASSWORD: 'current-password',
			OTHER: 'off',
		},
		FORM_TYPE: 'other',
	},

	PHASES: [
		{
			id: 'candidate',
			name: 'Candidate',
			description: 'Enter your information',
		},
		{
			id: 'skills',
			name: 'Skills',
			description: 'Configure your skills and matching preferences',
		},
		{
			id: 'resume',
			name: 'Resume',
			description: 'Enter your resume details',
		},
		{
			id: 'letter',
			name: 'Letter',
			description: 'Enter your cover letter template',
		},
		{ id: 'job', name: 'Job', description: 'Enter job information' },
		{
			id: 'preview',
			name: 'Preview',
			description: 'Preview generated documents',
		},
		{
			id: 'results',
			name: 'Results',
			description: 'Final generated documents',
		},
	],

	MESSAGES: {
		NO_RESULTS: 'No documents were selected for generation.',
		NO_RESULTS_INSTRUCTIONS: 'To generate documents, you need to:',
		GENERATE_DOCUMENTS: 'Generate Documents',
		COVER_LETTER_PREVIEW: 'Your cover letter preview will appear here…',
		NO_RESUME_TEMPLATE:
			'Cover letter generation requested but no template provided',
		MISSING_SKILLS:
			'Skills are missing. Please go back to Skills and configure your skills.',
		MISSING_RESUME_TEMPLATE:
			'Resume template is missing. Please go back to Resume and add your resume template.',
		MISSING_COVER_LETTER_TEMPLATE:
			'Cover letter template not provided yet. Please go back to the Letter tab to add your cover letter template.',
		EMPTY_SKILLS:
			'No skill groups found. Click the button below to get started.',
		SKILLS_NOT_GENERATED:
			'Skills not generated yet. Please go back to the Skills tab to add Skills or click the button to generate skills.',
		COVER_LETTER_NOT_PROVIDED:
			'Cover letter template not provided yet. Please go back to the Letter tab to add your cover letter template.',
		RESUME_NOT_PROVIDED:
			'Resume template not provided yet. Please go back to the Resume tab to add your resume template.',
		LOADING_DOCUMENTS: 'Creating your personalized documents…',
		NO_SKILLS_IN_GROUP: 'No Skills',
		ERROR_GENERATING:
			'An error occurred while generating your documents. Please try again.',
	},

	LINKEDIN: {
		FULL_PREFIX: 'https://linkedin.com/in/',
		SHORT_PREFIX: '/in/',
	},
} as const;
