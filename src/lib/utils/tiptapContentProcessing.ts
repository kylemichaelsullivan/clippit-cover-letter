import type { CandidateDetails, Job } from '@/types';

/**
 * Processes content for TipTap editor by replacing all Mustache placeholders
 * except {{My Signature}}, which should remain as a placeholder for editing
 */
export function processTipTapContent(
	content: string,
	candidateDetails: CandidateDetails,
	jobDetails: Job,
): string {
	if (!content) return content;

	const tempContent = content.replace(
		/\{\{My Signature\}\}/g,
		'___SIGNATURE_PLACEHOLDER___',
	);

	// Do {{Mustache Replacements}} (except {{My Signature}})
	const values: Record<string, string> = {
		Date: new Date().toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}),
		'My Name': candidateDetails.fullName || '',
		'My Email': candidateDetails.email || '',
		'My Phone': candidateDetails.phone || '',
		'My Location': candidateDetails.location || '',
		'My LinkedIn': candidateDetails.linkedin || '',
		'My Portfolio': candidateDetails.portfolio || '',
		'Job Company': jobDetails.companyName || 'Job Company',
		'Job Title': jobDetails.jobTitle || 'Job Title',
		'Job Manager': jobDetails.hiringManager || 'Job Manager',
		'Job Location': jobDetails.companyAddress || '',
		'Job Address': formatJobAddress(jobDetails),
		'Job Description': jobDetails.jobDescription || '',
	};

	const processedContent = replaceMustacheValues(tempContent, values);

	const finalContent = processedContent.replace(
		/___SIGNATURE_PLACEHOLDER___/g,
		'{{My Signature}}',
	);

	return finalContent;
}

/**
 * Formats job address with hiring manager, company name, and address
 */
function formatJobAddress(jobDetails: Job): string {
	const parts = [];

	const hiringManager = jobDetails.hiringManager || 'Hiring Manager';
	const companyName = jobDetails.companyName || 'Company Name';
	const companyAddress = jobDetails.companyAddress || 'Company Address';

	parts.push(hiringManager);
	parts.push(companyName);
	parts.push(companyAddress);

	return parts.join('<br>');
}

/**
 * Replaces Mustache variables in a template with provided values
 */
function replaceMustacheValues(
	template: string,
	values: Record<string, string>,
): string {
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
}
