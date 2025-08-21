export type MustacheReplacement = {
	name: string;
	description: string;
};

export type ERBInstruction = {
	name: string;
	description: string;
};

export const MUSTACHE_REPLACEMENTS: MustacheReplacement[] = [
	{ name: 'Date', description: 'Current date' },
	{ name: 'My Name', description: 'Candidate full name' },
	{ name: 'My Email', description: 'Candidate email address' },
	{ name: 'My Phone', description: 'Candidate phone number' },
	{ name: 'My Location', description: 'Candidate location' },
	{ name: 'My LinkedIn', description: 'Candidate LinkedIn profile' },
	{ name: 'My Portfolio', description: 'Candidate portfolio URL' },
	{ name: 'My Skills', description: 'All skills grouped by category' },
	{ name: 'Grouped Skills', description: 'All skills grouped by category' },
	{ name: 'Ungrouped Skills', description: 'All skills as a flat list' },
	{ name: 'Job Company', description: 'Company name' },
	{ name: 'Job Title', description: 'Job title' },
	{ name: 'Job Manager', description: 'Hiring manager name' },
	{ name: 'Job Location', description: 'Company address (physical or online)' },
	{
		name: 'Job Address',
		description: 'Formatted address block with line breaks',
	},
	{ name: 'Job Description', description: 'Job description text' },
];

export type MustacheReplacementName =
	(typeof MUSTACHE_REPLACEMENTS)[number]['name'];

export const ERB_INSTRUCTIONS: ERBInstruction[] = [
	{
		name: 'Prompt Instructions',
		description: 'Prompt instructions for this exact spot in the template',
	},
];
