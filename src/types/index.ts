export type CandidateDetails = {
	fullName: string;
	email: string;
	phone?: string;
	location?: string;
	linkedin?: string;
	portfolio?: string;
};

export type FormData = {
	title: string;
	content: string;
};

export type ResumeDetails = {
	summary: string;
	experience: string;
	education: Education[];
};

export type Education = {
	id: string;
	include: boolean;
	degree: string;
	graduationYear: string;
	institution: string;
	location: string;
};

export type Job = {
	companyName: string;
	jobTitle: string;
	hiringManager?: string;
	companyAddress?: string;
	jobDescription: string;
};

export type Phase = {
	id: string;
	name: string;
	description: string;
};

export type SkillGroup = {
	id: string;
	name: string;
	skills: string[];
};

export type Skills = {
	groups: SkillGroup[];
	minSkillsToUse: number;
	maxSkillsToUse: number;
};
