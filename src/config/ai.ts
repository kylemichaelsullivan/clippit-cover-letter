/**
 * AI Configuration with security best practices
 * Handles OpenAI API configuration with proper validation and defaults
 */

export type AIConfig = {
	// API Configuration
	apiKey: string;
	model: string;
	maxTokens: number;
	temperature: number;

	// Rate Limiting
	requestsPerMinute: number;
	requestsPerHour: number;

	// Security
	enableLogging: boolean;
	logLevel: 'none' | 'error' | 'warn' | 'info';

	// Feature Flags
	enableAI: boolean;
	enableStreaming: boolean;
	enableRetry: boolean;
};

/**
 * Default AI configuration
 * These are safe defaults that can be overridden by environment variables
 */
const defaultAIConfig: AIConfig = {
	// API Configuration
	apiKey: '',
	model: 'gpt-4o-mini',
	maxTokens: 2000,
	temperature: 0.7,

	// Rate Limiting
	requestsPerMinute: 60,
	requestsPerHour: 1000,

	// Security
	enableLogging: false,
	logLevel: 'error',

	// Feature Flags
	enableAI: true,
	enableStreaming: false,
	enableRetry: true,
};

/**
 * Parse environment variables for AI configuration
 * Uses secure practices and validation
 */
function parseAIEnvConfig(): Partial<AIConfig> {
	const config: Partial<AIConfig> = {};

	// API Configuration
	if (process.env.OPENAI_API_KEY) {
		config.apiKey = process.env.OPENAI_API_KEY;
	}

	if (process.env.OPENAI_MODEL) {
		config.model = process.env.OPENAI_MODEL;
	}

	if (process.env.OPENAI_MAX_TOKENS) {
		const maxTokens = Number.parseInt(process.env.OPENAI_MAX_TOKENS, 10);
		if (!isNaN(maxTokens) && maxTokens > 0 && maxTokens <= 4000) {
			config.maxTokens = maxTokens;
		}
	}

	if (process.env.OPENAI_TEMPERATURE) {
		const temperature = Number.parseFloat(process.env.OPENAI_TEMPERATURE);
		if (!isNaN(temperature) && temperature >= 0 && temperature <= 2) {
			config.temperature = temperature;
		}
	}

	// Rate Limiting
	if (process.env.OPENAI_REQUESTS_PER_MINUTE) {
		const rpm = Number.parseInt(process.env.OPENAI_REQUESTS_PER_MINUTE, 10);
		if (!isNaN(rpm) && rpm > 0) {
			config.requestsPerMinute = rpm;
		}
	}

	if (process.env.OPENAI_REQUESTS_PER_HOUR) {
		const rph = Number.parseInt(process.env.OPENAI_REQUESTS_PER_HOUR, 10);
		if (!isNaN(rph) && rph > 0) {
			config.requestsPerHour = rph;
		}
	}

	// Security
	if (process.env.OPENAI_ENABLE_LOGGING !== undefined) {
		config.enableLogging = process.env.OPENAI_ENABLE_LOGGING === 'true';
	}

	if (process.env.OPENAI_LOG_LEVEL) {
		const logLevel = process.env.OPENAI_LOG_LEVEL as AIConfig['logLevel'];
		if (['none', 'error', 'warn', 'info'].includes(logLevel)) {
			config.logLevel = logLevel;
		}
	}

	// Feature Flags
	if (process.env.OPENAI_ENABLE_AI !== undefined) {
		config.enableAI = process.env.OPENAI_ENABLE_AI === 'true';
	}

	if (process.env.OPENAI_ENABLE_STREAMING !== undefined) {
		config.enableStreaming = process.env.OPENAI_ENABLE_STREAMING === 'true';
	}

	if (process.env.OPENAI_ENABLE_RETRY !== undefined) {
		config.enableRetry = process.env.OPENAI_ENABLE_RETRY === 'true';
	}

	return config;
}

/**
 * Get the current AI configuration
 * Merges defaults with environment variables
 */
export function getAIConfig(): AIConfig {
	const envConfig = parseAIEnvConfig();
	return { ...defaultAIConfig, ...envConfig };
}

/**
 * Validate AI configuration
 * Returns validation errors if any
 */
export function validateAIConfig(config: AIConfig): string[] {
	const errors: string[] = [];

	if (!config.apiKey) {
		errors.push('OpenAI API key is required');
	}

	if (config.apiKey && config.apiKey.length < 20) {
		errors.push('OpenAI API key appears to be invalid (too short)');
	}

	if (config.maxTokens < 1 || config.maxTokens > 4000) {
		errors.push('maxTokens must be between 1 and 4000');
	}

	if (config.temperature < 0 || config.temperature > 2) {
		errors.push('temperature must be between 0 and 2');
	}

	if (config.requestsPerMinute < 1) {
		errors.push('requestsPerMinute must be greater than 0');
	}

	if (config.requestsPerHour < 1) {
		errors.push('requestsPerHour must be greater than 0');
	}

	return errors;
}

/**
 * Check if AI is properly configured
 */
export function isAIConfigured(): boolean {
	const config = getAIConfig();
	const errors = validateAIConfig(config);
	return errors.length === 0 && config.enableAI;
}

/**
 * Get a safe version of the config for logging (without API key)
 */
export function getSafeAIConfig(): Omit<AIConfig, 'apiKey'> & {
	apiKey: string;
} {
	const config = getAIConfig();
	return {
		...config,
		apiKey: config.apiKey ? `${config.apiKey.substring(0, 8)}…` : 'not-set',
	};
}
