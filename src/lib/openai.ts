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
- Addresses the specific job requirements directly
- Highlights relevant experience with concrete examples
- Shows genuine interest in the company
- Uses professional, natural language
- Is between 200-300 words
- Avoids promotional language and editorializing
- Uses varied sentence structure
- Focuses on facts and specific achievements
- Maintains a neutral, professional tone

Avoid these AI-typical patterns:
- Undue emphasis on symbolism ("stands as a testament", "plays a vital role")
- Promotional language ("rich history", "breathtaking", "must-visit")
- Editorializing ("it's important to note", "it is worth")
- Overuse of conjunctions ("moreover", "furthermore")
- Section summaries ("In summary", "In conclusion")
- Negative parallelisms ("Not only... but...")
- Rule of three overuse ("adjective, adjective, and adjective")
- Superficial analyses ("ensuring...", "highlighting...")
- Vague attributions ("Industry reports", "Some critics argue")`;

	const prompt = `Write a cover letter for the following position:

Job Description:
${jobDescription}

Company Information:
${companyDetails}

My Experience:
${userExperience}

Write a professional cover letter that connects my experience to this specific role. Use natural language and avoid AI-typical phrases.`;

	const response = await callOpenAI(prompt, systemMessage);
	return response.content;
}
