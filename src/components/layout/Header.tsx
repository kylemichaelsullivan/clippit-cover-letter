'use client';

import { memo } from 'react';

import { Title } from '@/components/layout';
import { PhaseSwitcher } from '@/components/ui/navigation';
import { usePhaseStore } from '@/lib/stores';

export const Header = memo(function Header() {
	const { phases, currentPhase, onPhaseChange } = usePhaseStore();

	return (
		<header className='Header border-light-gray bg-light-gray flex min-h-[120px] w-full flex-col items-center justify-between border-b'>
			<Title />
			<PhaseSwitcher
				phases={phases}
				currentPhase={currentPhase}
				onPhaseChange={onPhaseChange}
			/>
		</header>
	);
});
