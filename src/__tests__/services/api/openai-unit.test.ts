import { describe, it, expect, vi, beforeEach } from 'vitest';
import { callOpenAI, generateCoverLetter } from '@/lib/openai';
import { getAIConfig, isAIConfigured, validateAIConfig } from '@/config/ai';

// Mock fetch globally
global.fetch = vi.fn();

// Mock the env module
vi.mock('@/config/env', () => ({
	env: {
		OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
		OPENAI_MODEL: process.env.OPENAI_MODEL || 'gpt-4o-mini',
		OPENAI_MAX_TOKENS: parseInt(process.env.OPENAI_MAX_TOKENS || '2000', 10),
	},
}));

describe('OpenAI API Integration', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		// Reset environment variables
		delete process.env.OPENAI_API_KEY;
		delete process.env.OPENAI_MODEL;
		delete process.env.OPENAI_MAX_TOKENS;
		delete process.env.OPENAI_TEMPERATURE;
	});

	describe('Configuration', () => {
		it('should validate AI configuration correctly', () => {
			const validConfig = {
				apiKey: 'sk-test123456789012345678901234567890',
				model: 'gpt-4o-mini',
				maxTokens: 2000,
				temperature: 0.25,
				requestsPerMinute: 60,
				requestsPerHour: 1000,
				enableLogging: false,
				logLevel: 'error' as const,
				enableAI: true,
				enableStreaming: false,
				enableRetry: true,
			};

			const errors = validateAIConfig(validConfig);
			expect(errors).toHaveLength(0);
		});

		it('should detect missing API key', () => {
			const invalidConfig = {
				apiKey: '',
				model: 'gpt-4o-mini',
				maxTokens: 2000,
				temperature: 0.7,
				requestsPerMinute: 60,
				requestsPerHour: 1000,
				enableLogging: false,
				logLevel: 'error' as const,
				enableAI: true,
				enableStreaming: false,
				enableRetry: true,
			};

			const errors = validateAIConfig(invalidConfig);
			expect(errors).toContain('OpenAI API key is required');
		});

		it('should detect invalid maxTokens', () => {
			const invalidConfig = {
				apiKey: 'sk-test123456789012345678901234567890',
				model: 'gpt-4o-mini',
				maxTokens: 5000, // Too high
				temperature: 0.7,
				requestsPerMinute: 60,
				requestsPerHour: 1000,
				enableLogging: false,
				logLevel: 'error' as const,
				enableAI: true,
				enableStreaming: false,
				enableRetry: true,
			};

			const errors = validateAIConfig(invalidConfig);
			expect(errors).toContain('maxTokens must be between 1 and 4000');
		});
	});

	describe('API Calls', () => {
		it('should make successful API call', async () => {
			// Mock successful response
			const mockResponse = {
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

			(global.fetch as any).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			// Set up environment
			process.env.OPENAI_API_KEY = 'sk-test123456789012345678901234567890';
			process.env.OPENAI_MODEL = 'gpt-4o-mini';
			process.env.OPENAI_MAX_TOKENS = '2000';

			const result = await callOpenAI('Test prompt');

			expect(result.content).toBe('This is a test response from OpenAI');
			expect(result.usage).toEqual(mockResponse.usage);
			expect(global.fetch).toHaveBeenCalledWith(
				'https://api.openai.com/v1/chat/completions',
				expect.objectContaining({
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer sk-test123456789012345678901234567890',
					},
					body: expect.stringContaining('Test prompt'),
				}),
			);
		});

		it('should handle API errors gracefully', async () => {
			// Mock error response
			(global.fetch as any).mockResolvedValueOnce({
				ok: false,
				status: 401,
				statusText: 'Unauthorized',
				json: async () => ({
					error: { message: 'Invalid API key' },
				}),
			});

			process.env.OPENAI_API_KEY = 'sk-invalid-key';

			await expect(callOpenAI('Test prompt')).rejects.toThrow(
				'OpenAI API error: 401 Invalid API key',
			);
		});

		it('should throw error when API key is missing', async () => {
			await expect(callOpenAI('Test prompt')).rejects.toThrow(
				'OpenAI API key is not configured',
			);
		});
	});

	describe('Cover Letter Generation', () => {
		it('should generate cover letter with proper system message', async () => {
			const mockResponse = {
				choices: [
					{
						message: {
							content:
								'Dear Hiring Manager,\n\nI am writing to express my interest…',
						},
					},
				],
				usage: {
					prompt_tokens: 50,
					completion_tokens: 200,
					total_tokens: 250,
				},
			};

			(global.fetch as any).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			process.env.OPENAI_API_KEY = 'sk-test123456789012345678901234567890';
			process.env.OPENAI_MODEL = 'gpt-4o-mini';
			process.env.OPENAI_MAX_TOKENS = '2000';

			const result = await generateCoverLetter(
				'Software Engineer position',
				'Tech Company Inc.',
				'5 years of React development',
			);

			expect(result).toContain('Dear Hiring Manager');
			expect(global.fetch).toHaveBeenCalledWith(
				'https://api.openai.com/v1/chat/completions',
				expect.objectContaining({
					body: expect.stringContaining('Software Engineer position'),
				}),
			);
		});
	});

	describe('Environment Integration', () => {
		it('should read configuration from environment variables', () => {
			process.env.OPENAI_API_KEY = 'sk-test123456789012345678901234567890';
			process.env.OPENAI_MODEL = 'gpt-4';
			process.env.OPENAI_MAX_TOKENS = '1500';
			process.env.OPENAI_TEMPERATURE = '0.5';

			const config = getAIConfig();

			expect(config.apiKey).toBe('sk-test123456789012345678901234567890');
			expect(config.model).toBe('gpt-4');
			expect(config.maxTokens).toBe(1500);
			expect(config.temperature).toBe(0.5);
		});

		it('should use default values when environment variables are not set', () => {
			const config = getAIConfig();

			expect(config.apiKey).toBe('');
			expect(config.model).toBe('gpt-4o-mini');
			expect(config.maxTokens).toBe(2000);
			expect(config.temperature).toBe(0.7);
		});

		it('should correctly identify if AI is configured', () => {
			// Without API key
			expect(isAIConfigured()).toBe(false);

			// With API key
			process.env.OPENAI_API_KEY = 'sk-test123456789012345678901234567890';
			expect(isAIConfigured()).toBe(true);
		});
	});
});
