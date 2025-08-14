import { CONSTANTS, MUSTACHE_REPLACEMENTS, ERB_INSTRUCTIONS } from '@/config';
import { getSortedSkillGroups, sortAllSkills } from '@/lib/utils';
import type { CandidateDetails, Job, Skills } from '@/types';
import type { MustacheReplacement } from '@/config/mustacheReplacements';

export type DocumentGenerationParams = {
	includeResume: boolean;
	includeCoverLetter: boolean;
	resumeTemplate: string;
	coverLetterTemplate: string;
	candidateDetails: CandidateDetails;
	jobDetails: Job;
	skills?: Skills;
};

export type DocumentGenerationResult = {
	resume: string;
	coverLetter: string;
};

const replaceMustacheValues = (
	template: string,
	values: Record<string, string>,
) => {
	return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
		const cleanKey = key.trim();
		return values[cleanKey] || match;
	});
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
	return sortedGroups
		.map((group) => {
			if (group.skills.length === 0) return '';
			return `**${group.name}:** ${group.skills.join(', ')}`;
		})
		.filter(Boolean)
		.join('\n\n');
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

	return parts.map((part) => '<!--ADDRESS_BLOCK-->' + part).join('\n');
};

const formatMySignature = (candidateDetails: CandidateDetails): string => {
	if (!candidateDetails.fullName) {
		return '';
	}

	return '<!--SIGNATURE-->' + candidateDetails.fullName;
};

const createMustacheValues = (
	candidateDetails: CandidateDetails,
	jobDetails: Job,
	skills?: Skills,
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
			case 'My Skills':
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
			case 'Job Office':
				values[replacement.name] = formatJobOffice(jobDetails);
				break;
			case 'Job Description':
				values[replacement.name] = jobDetails.jobDescription || '';
				break;
			case 'My Signature':
				values[replacement.name] = formatMySignature(candidateDetails);
				break;
			default:
				console.warn(`Unhandled mustache replacement: ${name}`);
				values[replacement.name] = '';
		}
	});

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
	resumeTemplate,
	coverLetterTemplate,
	candidateDetails,
	jobDetails,
	skills,
}: DocumentGenerationParams): Promise<DocumentGenerationResult> {
	if (!includeResume && !includeCoverLetter) {
		console.log('No documents selected for generation');
		return { resume: '', coverLetter: '' };
	}

	console.log('Starting document generation...', {
		includeResume,
		includeCoverLetter,
		hasResumeTemplate: !!resumeTemplate,
		hasCoverLetterTemplate: !!coverLetterTemplate,
		candidateDetails,
		jobDetails,
		skills,
	});

	// Mock generation - in real app this would call an API
	await new Promise((resolve) => setTimeout(resolve, 2000));

	const mustacheValues = createMustacheValues(
		candidateDetails,
		jobDetails,
		skills,
	);

	const erbInstructions = createERBInstructions();

	console.log('Using values for template replacement:', mustacheValues);
	console.log('Using ERB instructions:', erbInstructions);

	let generatedResume = '';
	let generatedCoverLetter = '';

	if (includeResume && resumeTemplate) {
		console.log('Generating resume...');
		let processedTemplate = replaceMustacheValues(
			resumeTemplate,
			mustacheValues,
		);
		processedTemplate = replaceERBInstructions(
			processedTemplate,
			erbInstructions,
			mustacheValues,
		);
		generatedResume = processedTemplate;
		console.log('Resume generated successfully');
	} else if (includeResume && !resumeTemplate) {
		console.warn('Resume generation requested but no template provided');
	}

	if (includeCoverLetter && coverLetterTemplate) {
		console.log('Generating cover letter...');
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
	}

	console.log('Document generation completed');

	return {
		resume: generatedResume,
		coverLetter: generatedCoverLetter,
	};
}
