export const PLACEHOLDERS = {
	CANDIDATE: {
		FULL_NAME: 'Chris Smith',
		EMAIL: 'email@example.com',
		PHONE: '(123) 456-7890',
		LOCATION: 'Grand Rapids, MI',
		LINKEDIN: 'your-profile',
		PORTFOLIO: 'https://yourportfolio.com',
	},

	JOB: {
		COMPANY_NAME: 'Dunder Mifflin Paper Company',
		JOB_TITLE: 'Assistant to the Regional Manager',
		HIRING_MANAGER: 'Michael Scott',
		COMPANY_ADDRESS: 'Scranton, PA',
		JOB_DESCRIPTION:
			'Support the Regional Manager in daily operations, handle customer inquiries, manage office supplies and assist with special projects.\n\nMust be detail-oriented, organized and able to work in a fast-paced environment. Experience with paper products and customer service preferred.',
	},

	SKILLS: {
		GROUP_NAME: 'Group Name (e.g., Management)',
		SKILL: 'Skill (e.g., Leadership)',
	},

	TEMPLATES: {
		COVER_LETTER:
			'Paste your cover letter template here...\n\nUse {{Date}}, {{My Name}}, {{My Email}}, {{My Phone}}, {{My Location}}, {{My LinkedIn}}, {{My Portfolio}}, {{My Skills}} (Grouped), {{Ungrouped Skills}}, {{Job Company}}, {{Job Title}}, {{Job Manager}}, {{Job Office}}, {{Job Address}}, {{Job Description}} for dynamic content.\n\nUse <%=Prompt Instructions%> for inline AI prompt instructions.',
		RESUME:
			'Paste your resume template here...\n\nUse {{Date}}, {{My Name}}, {{My Email}}, {{My Phone}}, {{My Location}}, {{My LinkedIn}}, {{My Portfolio}}, {{My Skills}} (Grouped), {{Ungrouped Skills}}, {{Job Company}}, {{Job Title}}, {{Job Manager}}, {{Job Office}}, {{Job Address}}, {{Job Description}} for dynamic content.\n\nUse <%=Prompt Instructions%> for inline AI prompt instructions.',
	},

	GENERAL: {
		MARKDOWN_CONTENT: 'Enter markdown content...',
		DOCUMENT_CONTENT:
			'Click the Generate Button or enter your {title} content here...',
		SKILLS_CONTENT: 'Your skills will appear here...',
	},

	DOCUMENT_INSTRUCTIONS: {
		SKILLS_SUMMARY: 'Enter additional instructions for the Skills Summary...',
		COVER_LETTER: 'Enter additional instructions for the Cover Letter...',
		RESUME: 'Enter additional instructions for the Resume...',
	},
} as const;
