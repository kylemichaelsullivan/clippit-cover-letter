'use client';

import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
	theme: Theme;
	isMounted: boolean;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ClientOnly({
	children,
	fallback,
}: {
	children: ReactNode;
	fallback?: ReactNode;
}) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return fallback ? <>{fallback}</> : null;
	}

	return <>{children}</>;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	// Start with 'light' to ensure consistent SSR
	const [theme, setTheme] = useState<Theme>('light');
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);

		const initializeTheme = () => {
			try {
				const savedTheme = localStorage.getItem('theme') as Theme;
				if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
					setTheme(savedTheme);
				} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
					setTheme('dark');
				}
			} catch (error) {
				console.warn('Could not access localStorage:', error);
			}
		};

		// Small delay to ensure DOM is ready
		const timer = setTimeout(initializeTheme, 0);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (isMounted) {
			document.documentElement.classList.toggle('dark', theme === 'dark');

			try {
				localStorage.setItem('theme', theme);
			} catch (error) {
				console.warn('Could not save theme to localStorage:', error);
			}
		}
	}, [theme, isMounted]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme, isMounted }}>
			{/* Suppress hydration warning for theme-dependent classes */}
			<div suppressHydrationWarning>{children}</div>
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		return {
			theme: 'light' as Theme,
			toggleTheme: () => {},
			isMounted: false,
		};
	}
	return context;
}

export { ClientOnly };
