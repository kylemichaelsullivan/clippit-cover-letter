/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		OPENAI_API_KEY: process.env.OPENAI_API_KEY,
		OPENAI_MODEL: process.env.OPENAI_MODEL,
		OPENAI_MAX_TOKENS: process.env.OPENAI_MAX_TOKENS,
	},
	// Ensure environment variables are available on the server side
	serverRuntimeConfig: {
		OPENAI_API_KEY: process.env.OPENAI_API_KEY,
	},
	// Environment variables that should be available on the client side (if needed)
	publicRuntimeConfig: {
		// Add any public env vars here if needed
	},
};

export default nextConfig;
