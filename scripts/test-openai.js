#!/usr/bin/env node

// Simple script to test OpenAI API integration
require('dotenv').config({ path: '.env.local' });

const { callOpenAI, generateCoverLetter } = require('../src/lib/openai.ts');
const { isAIConfigured, getAIConfig } = require('../src/config/ai.ts');

async function testOpenAI() {
	console.log('🔍 Testing OpenAI API Integration…\n');

	// Check configuration
	console.log('📋 Configuration Check:');
	const config = getAIConfig();
	console.log(`- API Key configured: ${config.apiKey ? '✅ Yes' : '❌ No'}`);
	console.log(`- Model: ${config.model}`);
	console.log(`- Max Tokens: ${config.maxTokens}`);
	console.log(`- Temperature: ${config.temperature}`);
	console.log(`- AI Enabled: ${config.enableAI ? '✅ Yes' : '❌ No'}`);
	console.log(`- Is Configured: ${isAIConfigured() ? '✅ Yes' : '❌ No'}\n`);

	if (!isAIConfigured()) {
		console.log(
			'❌ OpenAI is not properly configured. Please check your .env.local file.',
		);
		process.exit(1);
	}

	try {
		// Test 1: Simple API call
		console.log('🧪 Test 1: Simple API Call');
		const simpleResult = await callOpenAI(
			'Say "Hello, this is a test!" in a simple way.',
		);
		console.log('✅ Response:', simpleResult.content);
		console.log('📊 Token Usage:', simpleResult.usage);
		console.log('');

		// Test 2: Cover letter generation
		console.log('🧪 Test 2: Cover Letter Generation');
		const coverLetter = await generateCoverLetter(
			'Software Engineer position focusing on React and TypeScript',
			'TechCorp - A leading software company',
			'3 years of React development experience with modern JavaScript',
		);
		console.log('✅ Generated Cover Letter:');
		console.log(coverLetter);
		console.log('');

		console.log('🎉 All tests passed! OpenAI API is working correctly.');
	} catch (error) {
		console.error('❌ Test failed:', error.message);
		process.exit(1);
	}
}

testOpenAI();
