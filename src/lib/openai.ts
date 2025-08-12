import { getAIConfig } from '@/config/ai';

export type OpenAIResponse = {
	content: string;
	usage?: {
		prompt_tokens: number;
		completion_tokens: number;
		total_tokens: number;
	};
};

export async function callOpenAI(
	prompt: string,
	systemMessage?: string,
): Promise<OpenAIResponse> {
	const config = getAIConfig();

	if (!config.apiKey) {
		throw new Error('OpenAI API key is not configured');
	}

	const messages = [
		...(systemMessage
			? [{ role: 'system' as const, content: systemMessage }]
			: []),
		{ role: 'user' as const, content: prompt },
	];

	try {
		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${config.apiKey}`,
			},
			body: JSON.stringify({
				model: config.model,
				messages,
				max_tokens: config.maxTokens,
				temperature: config.temperature,
			}),
		});

		if (!response.ok) {
			const error = await response.json().catch(() => ({}));
			throw new Error(
				`OpenAI API error: ${response.status} ${error.error?.message || response.statusText}`,
			);
		}

		const data = await response.json();
		const content = data.choices[0]?.message?.content;

		if (!content) {
			throw new Error('No content received from OpenAI API');
		}

		return {
			content,
			usage: data.usage,
		};
	} catch (error) {
		console.error('OpenAI API call failed:', error);
		throw error;
	}
}

export async function generateCoverLetter(
	jobDescription: string,
	companyDetails: string,
	userExperience: string,
): Promise<string> {
	const systemMessage = `You are a professional cover letter writer. Create a compelling, personalized cover letter that:
- Addresses the specific job requirements
- Highlights relevant experience
- Shows enthusiasm for the company
- Is professional yet engaging
- Is between 200-300 words
- Uses a professional tone`;

	const prompt = `Please write a cover letter for the following position:

Job Description:
${jobDescription}

Company Information:
${companyDetails}

My Experience:
${userExperience}

Please write a professional cover letter that connects my experience to this specific role.`;

	const response = await callOpenAI(prompt, systemMessage);
	return response.content;
}
