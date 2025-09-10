export const PLACEHOLDERS = {
	CANDIDATE: {
		EMAIL: 'email@example.com',
		FULL_NAME: 'Dwight Schrute',
		LINKEDIN: 'your-profile',
		LOCATION: 'Scranton, PA',
		LOGO: 'Upload your logo (JPG, PNG, WEBP)',
		PHONE: '(123) 456-7890',
		PORTFOLIO: 'https://yourportfolio.com',
		SIGNATURE: 'Draw your signature',
	},

	DOCUMENT_INSTRUCTIONS: {
		COVER_LETTER: 'Enter additional instructions for the Cover Letter…',
		RESUME: 'Enter additional instructions for the Resume…',
		SKILLS_SUMMARY: 'Enter additional instructions for the Skills Summary…',
	},

	EDUCATION: {
		DEGREE: 'Bachelor of Science',
		EMPTY_MESSAGE: 'Click the + button below to add your education details',
		GRADUATION_YEAR: '2020 (only for sorting)',
		INSTITUTION: 'University of Michigan',
		LOCATION: 'Ann Arbor, MI',
	},

	EXPERIENCE: {
		BULLET:
			'Consistently exceeded sales targets and built strong client relationships',
		COMPANY: 'Dunder Mifflin Paper Company',
		EMPTY_MESSAGE: 'Click the + button below to add your work experience',
		END: 'April 2008',
		START: 'March 2005',
		TITLE: 'Salesman',
	},

	GENERAL: {
		DOCUMENT_CONTENT:
			'Click the Generate Button or enter your {title} content here…',
		SKILLS_CONTENT: 'Your skills will appear here…',
	},

	JOB: {
		COMPANY_ADDRESS: 'Scranton, PA',
		COMPANY_NAME: 'Dunder Mifflin Paper Company',
		HIRING_MANAGER: 'Michael Scott',
		JOB_DESCRIPTION:
			'Support the Regional Manager in daily operations, handle customer inquiries, manage office supplies and assist with special projects.\n\nMust be detail-oriented, organized and able to work in a fast-paced environment. Experience with paper products and customer service preferred.',
		JOB_TITLE: 'Assistant to the Regional Manager',
	},

	RESUME: {
		DEGREE_LABEL: 'Degree',
		EDUCATION: 'Enter your education background…',
		EXPERIENCE: 'Enter your work experience…',
		GRADUATION_YEAR_LABEL: 'Graduation Year',
		INSTITUTION_LABEL: 'Institution',
		LOCATION_LABEL: 'Location',
		SUMMARY: 'Enter your professional summary…',
	},

	SKILLS: {
		GROUP_NAME: 'Group Name (e.g., Management)',
		SKILL: 'Skill (e.g., Leadership)',
	},

	TEMPLATES: {
		COVER_LETTER:
			'Paste your cover letter template here…\n\nUse {{Date}}, {{My Name}}, {{My Email}}, {{My Phone}}, {{My Location}}, {{My LinkedIn}}, {{My Portfolio}}, {{My Skills}}, {{Grouped Skills}}, {{Ungrouped Skills}}, {{Job Company}}, {{Job Title}}, {{Job Manager}}, {{Job Location}}, {{Job Address}}, {{Job Description}} for dynamic content.\n\nUse <%=Prompt Instructions%> for inline AI prompt instructions.',
		RESUME:
			'<h2>Summary</h2>\n{{summary}}\n\n<h2>Skills</h2>\n{{skills}}\n\n<h2>Experience</h2>\n{{experience}}\n\n<h2>Education</h2>\n{{education}}\n\nUse {{Date}}, {{My Name}}, {{My Email}}, {{My Phone}}, {{My Location}}, {{My LinkedIn}}, {{My Portfolio}}, {{My Skills}}, {{Grouped Skills}}, {{Ungrouped Skills}}, {{Job Company}}, {{Job Title}}, {{Job Manager}}, {{Job Location}}, {{Job Address}}, {{Job Description}} for dynamic content.\n\nUse <%=Prompt Instructions%> for inline AI prompt instructions.',
	},
} as const;
