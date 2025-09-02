'use client';

import { CONSTANTS } from '@/config';
import { ThemeToggle } from '@/components/ui/buttons/ThemeToggle';
import { usePhaseStore } from '@/lib/stores';

export function Title() {
	const { onPhaseChange, focusCurrentPhaseButton } = usePhaseStore();

	const handleTitleClick = () => {
		onPhaseChange('welcome');
		setTimeout(() => focusCurrentPhaseButton(), 0);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			onPhaseChange('welcome');
			setTimeout(() => focusCurrentPhaseButton(), 0);
		}
	};

	return (
		<div className='Title flex w-full items-center justify-between gap-4 bg-white p-4 shadow-sm sm:px-6 lg:px-8'>
			<h1
				className='hover:text-blue cursor-pointer text-xl font-semibold text-black transition-colors'
				title='Return to Welcome'
				tabIndex={0}
				onClick={handleTitleClick}
				onKeyDown={handleKeyDown}
			>
				{CONSTANTS.APP_NAME}
			</h1>
			<ThemeToggle />
		</div>
	);
}
