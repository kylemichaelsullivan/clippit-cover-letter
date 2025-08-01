'use client';

import { Button } from '@/components/ui/buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../providers/ThemeProvider';
import { CONSTANTS } from '@/config';

export function ThemeToggle() {
	const { theme, toggleTheme, isMounted } = useTheme();

	return (
		<Button
			color='secondary'
			size='sm'
			onClick={isMounted ? toggleTheme : undefined}
			disabled={!isMounted}
			aria-label={
				isMounted
					? theme === 'dark'
						? CONSTANTS.ARIA_LABELS.THEME_TOGGLE.LIGHT
						: CONSTANTS.ARIA_LABELS.THEME_TOGGLE.DARK
					: 'Loading theme toggle'
			}
			title={
				isMounted
					? theme === 'dark'
						? CONSTANTS.ARIA_LABELS.THEME_TOGGLE.LIGHT_TEXT
						: CONSTANTS.ARIA_LABELS.THEME_TOGGLE.DARK_TEXT
					: 'Loading...'
			}
			suppressHydrationWarning
			componentName='ThemeToggle'
		>
			<div className='flex h-5 w-5 items-center justify-center'>
				{isMounted ? (
					<div className='flex h-4 w-4 items-center justify-center'>
						<FontAwesomeIcon
							icon={theme === 'light' ? faSun : faMoon}
							className='h-4 w-4'
							aria-hidden='true'
						/>
					</div>
				) : (
					<div className='h-4 w-4 animate-pulse rounded-full bg-gray-300' />
				)}
			</div>
		</Button>
	);
}
