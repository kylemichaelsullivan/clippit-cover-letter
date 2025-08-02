'use client';

import { memo } from 'react';

import { Title } from '@/components/layout';
import { PhaseSwitcher, SkipLink } from '@/components/ui/navigation';
import { usePhaseStore } from '@/lib/stores';

export const Header = memo(function Header() {
	const { phases, currentPhase, onPhaseChange, focusCurrentPhaseButton } =
		usePhaseStore();

	const skipLinkToBody = (
		<div className='SkipLinkToBody relative -top-2 flex w-full items-center justify-center bg-white'>
			<SkipLink href='#Body' destination='Body' />
		</div>
	);

	return (
		<header className='Header flex min-h-[120px] w-full flex-col items-center justify-between bg-white'>
			<SkipLink
				href='#PhaseSwitcher'
				destination='Navigation'
				onClick={focusCurrentPhaseButton}
			/>
			<Title />

			{skipLinkToBody}

			<PhaseSwitcher
				phases={phases}
				currentPhase={currentPhase}
				onPhaseChange={onPhaseChange}
			/>
		</header>
	);
});
