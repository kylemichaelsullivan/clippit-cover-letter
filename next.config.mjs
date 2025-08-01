const USE_TURBOPACK = Boolean(process.env.TURBOPACK);

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
		// Add any client-side environment variables here if needed
		// Example: NEXT_PUBLIC_ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID,
	},
	// HMR optimization for development
	experimental: {
		// Improve HMR performance with complex contexts
		optimizePackageImports: ['@fortawesome/react-fontawesome'],
	},
	// Webpack configuration for better HMR (when not using Turbopack)
	webpack: USE_TURBOPACK
		? undefined
		: (config, { dev, isServer }) => {
				if (dev && !isServer) {
					// Optimize HMR for development
					config.optimization = {
						...config.optimization,
						splitChunks: {
							...config.optimization.splitChunks,
							cacheGroups: {
								...config.optimization.splitChunks.cacheGroups,
								// Separate vendor chunks for better HMR
								vendor: {
									test: /[\\/]node_modules[\\/]/,
									name: 'vendors',
									chunks: 'all',
								},
							},
						},
					};
				}
				return config;
			},
};

export default nextConfig;
