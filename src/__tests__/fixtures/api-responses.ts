export const mockOpenAIResponse = {
	choices: [
		{
			message: {
				content: 'This is a test response from OpenAI',
			},
		},
	],
	usage: {
		prompt_tokens: 10,
		completion_tokens: 20,
		total_tokens: 30,
	},
};

export const mockCoverLetterResponse = {
	choices: [
		{
			message: {
				content:
					'Dear Hiring Manager,\n\nI am writing to express my interest in the Software Engineer position at Tech Corp. With my extensive experience in modern web technologies...\n\nSincerely,\nJohn Doe',
			},
		},
	],
	usage: {
		prompt_tokens: 50,
		completion_tokens: 200,
		total_tokens: 250,
	},
};

export const mockResumeResponse = {
	choices: [
		{
			message: {
				content:
					'John Doe\nSoftware Engineer\n\nEXPERIENCE\n\nSenior Software Engineer - Tech Corp (2020-Present)\n• Led development of microservices architecture\n• Improved system performance by 40%\n\nEDUCATION\n\nBachelor of Science in Computer Science - University of Technology (2018)',
			},
		},
	],
	usage: {
		prompt_tokens: 75,
		completion_tokens: 300,
		total_tokens: 375,
	},
};

export const mockErrorResponse = {
	error: {
		message: 'Invalid API key',
		type: 'invalid_request_error',
	},
};
