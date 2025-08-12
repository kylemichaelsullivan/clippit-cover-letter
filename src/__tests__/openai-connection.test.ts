import { describe, it, expect } from 'vitest';
import { callOpenAI, generateCoverLetter } from '@/lib/openai';
import { isAIConfigured } from '@/config/ai';

// This test requires a real OpenAI API key in .env.local
describe('OpenAI Real API Test', () => {
	it('should be configured with API key', () => {
		expect(isAIConfigured()).toBe(true);
	});

	it('should make a real API call', async () => {
		const result = await callOpenAI(
			'Say "Hello, this is a test!" in a simple way.',
		);

		expect(result.content).toBeDefined();
		expect(typeof result.content).toBe('string');
		expect(result.content.length).toBeGreaterThan(0);
		expect(result.usage).toBeDefined();
		expect(result.usage?.total_tokens).toBeGreaterThan(0);

		console.log('API Response:', result.content);
		console.log('Token Usage:', result.usage);
	}, 30000); // 30 second timeout for API call

	it('should generate a cover letter', async () => {
		const result = await generateCoverLetter(
			'Software Engineer position focusing on React and TypeScript',
			'TechCorp - A leading software company',
			'3 years of React development experience with modern JavaScript',
		);

		expect(result).toBeDefined();
		expect(typeof result).toBe('string');
		expect(result.length).toBeGreaterThan(100);
		expect(result.toLowerCase()).toContain('dear');

		console.log('Generated Cover Letter:', result);
	}, 30000); // 30 second timeout for API call
});

