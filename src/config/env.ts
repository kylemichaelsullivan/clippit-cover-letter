export const env = {
	OPENAI_API_KEY: process.env.OPENAI_API_KEY,
	OPENAI_MODEL: process.env.OPENAI_MODEL || 'gpt-4',
	OPENAI_MAX_TOKENS: parseInt(process.env.OPENAI_MAX_TOKENS || '2000', 10),
} as const;

export function validateEnv() {
	const requiredVars = ['OPENAI_API_KEY'] as const;

	for (const varName of requiredVars) {
		if (!env[varName]) {
			throw new Error(`Missing required environment variable: ${varName}`);
		}
	}
}

export type Env = typeof env;
