import {
	CONSTANTS,
	ERB_INSTRUCTIONS,
	MUSTACHE_REPLACEMENTS,
	PLACEHOLDERS,
} from '@/config';
import { getSortedSkillGroups, sortAllSkills } from '@/lib/utils';
import type { CandidateDetails, Job, Skills } from '@/types';
import type { MustacheReplacement } from '@/config/mustacheReplacements';

export type DocumentGenerationParams = {
	includeResume: boolean;
	includeCoverLetter: boolean;
	coverLetterTemplate: string;
	candidateDetails: CandidateDetails;
	jobDetails: Job;
	resumeDetails?: {
		summary: string;
		experience: any[];
		education: any[];
	};
	skills?: Skills;
	includeSkillGroupNames?: boolean;
};

export type DocumentGenerationResult = {
	resume: string;
	coverLetter: string;
};

const replaceMustacheValues = (
	template: string,
	values: Record<string, string>,
) => {
	let result = template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
		const cleanKey = key.trim();
		if (Object.prototype.hasOwnProperty.call(values, cleanKey)) {
			return values[cleanKey];
		}
		return match;
	});

	result = result.replace(/<p>\s*<ul[^>]*>.*?<\/ul>\s*<\/p>/gs, (match) => {
		const ulMatch = match.match(/<ul[^>]*>(.*?)<\/ul>/s);
		return ulMatch ? `<ul>${ulMatch[1]}</ul>` : match;
	});

	return result;
};

const replaceERBInstructions = (
	template: string,
	instructions: Record<string, string>,
	values: Record<string, string>,
) => {
	return template.replace(/<%=([^%>]+)%>/g, (match, key) => {
		const cleanKey = key.trim();

		return instructions[cleanKey]
			? instructions[cleanKey].replace(
					/\{\{([^}]+)\}\}/g,
					(mustacheMatch: string, mustacheKey: string) => {
						const cleanMustacheKey = mustacheKey.trim();
						return values[cleanMustacheKey] || mustacheMatch;
					},
				)
			: match;
	});
};

const formatDate = (): string => {
	const today = new Date();
	return today.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};

const formatSkillsGrouped = (skills?: Skills): string => {
	if (!skills || !skills.groups || skills.groups.length === 0) {
		return '';
	}

	const sortedGroups = getSortedSkillGroups(skills);
	const skillsHtml = sortedGroups
		.map((group) => {
			if (group.skills.length === 0) return '';
			return `<li><strong>${group.name}:</strong> ${group.skills.join(', ')}</li>`;
		})
		.filter(Boolean)
		.join('');

	return `<ul>${skillsHtml}</ul>`;
};

const formatSkillsUngrouped = (skills?: Skills): string => {
	if (!skills || !skills.groups || skills.groups.length === 0) {
		return '';
	}

	const sortedSkills = sortAllSkills(skills);
	return sortedSkills.join(', ');
};

const formatJobOffice = (jobDetails: Job): string => {
	return jobDetails.companyAddress || '';
};

const formatJobAddress = (jobDetails: Job): string => {
	const parts = [];

	if (jobDetails.hiringManager) {
		parts.push(jobDetails.hiringManager);
	}
	if (jobDetails.companyName) {
		parts.push(jobDetails.companyName);
	}
	if (jobDetails.companyAddress) {
		parts.push(jobDetails.companyAddress);
	}

	return parts.join('<br>');
};

const formatEducationText = (education: any[]): string => {
	const filtered = education.filter(
		(edu) => edu.include !== false && (edu.degree || edu.institution),
	);

	const result = filtered
		.map((edu) => {
			const location = edu.location ? ` | ${edu.location}` : '';
			const entry = `<h3>${edu.degree}</h3>
<p><span class="text-shadow">${edu.institution}</span>${location}</p>`;
			return entry;
		})
		.join('\n\n');
	return result;
};

const formatExperienceText = (experience?: any[]): string => {
	if (!experience || experience.length === 0) {
		return '';
	}

	return experience
		.filter((exp) => exp.include !== false && (exp.title || exp.company))
		.map((exp) => {
			const dateRange =
				exp.start && exp.end ? ` | ${exp.start} - ${exp.end}` : '';
			const bulletsText =
				exp.bullets && exp.bullets.length > 0
					? exp.bullets.map((bullet: string) => `<li>${bullet}</li>`).join('')
					: '';
			const bulletsHtml = bulletsText ? `<ul>${bulletsText}</ul>` : '';

			return `<h3>${exp.title}</h3>
<p><span class="text-shadow">${exp.company}</span>${dateRange}</p>${bulletsHtml}`;
		})
		.join('\n\n');
};

const createMustacheValues = (
	candidateDetails: CandidateDetails,
	jobDetails: Job,
	resumeDetails?: {
		summary: string;
		experience: any[];
		education: any[];
	},
	skills?: Skills,
	includeSkillGroupNames?: boolean,
): Record<string, string> => {
	const values: Record<string, string> = {};

	MUSTACHE_REPLACEMENTS.forEach((replacement: MustacheReplacement) => {
		const name = replacement.name;
		switch (name) {
			case 'Date':
				values[replacement.name] = formatDate();
				break;
			case 'My Name':
				values[replacement.name] = candidateDetails.fullName || '';
				break;
			case 'My Email':
				values[replacement.name] = candidateDetails.email || '';
				break;
			case 'My Phone':
				values[replacement.name] = candidateDetails.phone || '';
				break;
			case 'My Location':
				values[replacement.name] = candidateDetails.location || '';
				break;
			case 'My LinkedIn':
				values[replacement.name] = candidateDetails.linkedin || '';
				break;
			case 'My Portfolio':
				values[replacement.name] = candidateDetails.portfolio || '';
				break;
			case 'My Signature':
				values[replacement.name] = candidateDetails.signature
					? `<img src="${candidateDetails.signature}" class="signature-image" alt="Signature" />`
					: candidateDetails.fullName || '';
				break;
			case 'My Skills':
				values[replacement.name] = includeSkillGroupNames
					? formatSkillsGrouped(skills)
					: formatSkillsUngrouped(skills);
				break;
			case 'Grouped Skills':
				values[replacement.name] = formatSkillsGrouped(skills);
				break;
			case 'Ungrouped Skills':
				values[replacement.name] = formatSkillsUngrouped(skills);
				break;
			case 'Job Company':
				values[replacement.name] = jobDetails.companyName || '';
				break;
			case 'Job Title':
				values[replacement.name] = jobDetails.jobTitle || '';
				break;
			case 'Job Manager':
				values[replacement.name] = jobDetails.hiringManager || '';
				break;
			case 'Job Address':
				values[replacement.name] = formatJobAddress(jobDetails);
				break;
			case 'Job Location':
				values[replacement.name] = formatJobOffice(jobDetails);
				break;
			case 'Job Description':
				values[replacement.name] = jobDetails.jobDescription || '';
				break;
			default:
				console.warn(`Unhandled mustache replacement: ${name}`);
				values[replacement.name] = '';
		}
	});

	values['skills'] = formatSkillsGrouped(skills);
	values['summary'] = resumeDetails?.summary || '';
	values['experience'] = formatExperienceText(resumeDetails?.experience);

	values['education'] = formatEducationText(resumeDetails?.education || []);

	return values;
};

const createERBInstructions = (): Record<string, string> => {
	const instructions: Record<string, string> = {};

	ERB_INSTRUCTIONS.forEach((instruction) => {
		instructions[instruction.name] =
			'Prompt instructions for this exact spot in the template';
	});

	return instructions;
};

export async function generateDocuments({
	includeResume,
	includeCoverLetter,
	coverLetterTemplate,
	candidateDetails,
	jobDetails,
	resumeDetails,
	skills,
	includeSkillGroupNames,
}: DocumentGenerationParams): Promise<DocumentGenerationResult> {
	if (!includeResume && !includeCoverLetter) {
		console.log('No documents selected for generation');
		return { resume: '', coverLetter: '' };
	}

	// Mock generation - in real app this would call an API
	await new Promise((resolve) => setTimeout(resolve, 2000));

	const mustacheValues = createMustacheValues(
		candidateDetails,
		jobDetails,
		resumeDetails,
		skills,
		includeSkillGroupNames,
	);

	const erbInstructions = createERBInstructions();

	console.log('Using values for template replacement:', mustacheValues);
	console.log('Using ERB instructions:', erbInstructions);

	let generatedResume = '';
	let generatedCoverLetter = '';

	if (includeResume) {
		console.log('Generating resume…');

		const summaryContent = resumeDetails?.summary || '';
		const experienceContent = formatExperienceText(resumeDetails?.experience);
		const skillsContent = formatSkillsGrouped(skills);

		const educationContent = resumeDetails?.education
			? formatEducationText(resumeDetails.education)
			: '';

		const educationSection = educationContent
			? `\n<h2>Education</h2>\n${educationContent}`
			: '';

		generatedResume = `<h2>Summary</h2>
${summaryContent}

<h2>Skills</h2>
${skillsContent}

<h2>Experience</h2>
${experienceContent}${educationSection}`;

		console.log('Resume generated successfully');
	}

	if (includeCoverLetter && coverLetterTemplate) {
		console.log('Generating cover letter…');
		let processedTemplate = replaceMustacheValues(
			coverLetterTemplate,
			mustacheValues,
		);
		processedTemplate = replaceERBInstructions(
			processedTemplate,
			erbInstructions,
			mustacheValues,
		);
		generatedCoverLetter = processedTemplate;
		console.log('Cover letter generated successfully');
	} else if (includeCoverLetter && !coverLetterTemplate) {
		console.warn(CONSTANTS.MESSAGES.NO_RESUME_TEMPLATE);
		generatedCoverLetter = PLACEHOLDERS.TEMPLATES.COVER_LETTER;
	}

	console.log('Document generation completed');

	return {
		resume: generatedResume,
		coverLetter: generatedCoverLetter,
	};
}
