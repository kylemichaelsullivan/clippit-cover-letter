export type CandidateDetails = {
	email: string;
	fullName: string;
	linkedin?: string;
	location?: string;
	logo?: string;
	logoInclude?: boolean;
	phone?: string;
	portfolio?: string;
	signature?: string;
	signatureInclude?: boolean;
};

export type Education = {
	id: string;
	include: boolean;
	degree: string;
	graduationYear: string;
	institution: string;
	location: string;
};

export type Experience = {
	id: string;
	include: boolean;
	title: string;
	company: string;
	start: string;
	end: string;
	bullets: string[];
};

export type FormData = {
	title: string;
	content: string;
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

export type ResumeDetails = {
	summary: string;
	experience: Experience[];
	education: Education[];
};

export type SelectableItem = {
	id: string;
	label: string;
	checked: boolean;
};

export type SelectableItems = SelectableItem[];

export type SkillGroupItem = {
	id: string;
	include: boolean;
	name: string;
	skills: string[];
};

export type SkillGroupItems = SkillGroupItem[];

export type SkillGroup = {
	id: string;
	include: boolean;
	name: string;
	skills: string[];
};

export type Skills = {
	groups: SkillGroup[];
	minSkillsToUse: number;
	maxSkillsToUse: number;
};
