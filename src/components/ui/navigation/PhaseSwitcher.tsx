'use client';

import { CONSTANTS } from '@/config';
import type { Phase } from '@/types';

import { Button } from '@/components/ui/buttons';
import { SkipLinkTarget } from '@/components/ui/navigation';

type PhaseSwitcherProps = {
	phases: readonly Phase[];
	currentPhase: string;
	onPhaseChange: (phaseId: string) => void;
};

export function PhaseSwitcher({
	phases,
	currentPhase,
	onPhaseChange,
}: PhaseSwitcherProps) {
	return (
		<SkipLinkTarget
			id='PhaseSwitcher'
			className='PhaseSwitcher bg-light-gray flex w-full items-center justify-center'
		>
			<nav
				className='border-light-gray scrollbar-hide flex max-w-screen justify-start gap-2 overflow-x-auto rounded-b-lg border-x border-b bg-white p-2 shadow-sm'
				role='tablist'
				aria-label={CONSTANTS.ARIA_LABELS.PHASE_TABS}
			>
				{phases.map((phase) => (
					<Button
						key={phase.id}
						color='secondary'
						onClick={() => onPhaseChange(phase.id)}
						role='tab'
						title={`Go to ${phase.name}`}
						aria-selected={currentPhase === phase.id}
						aria-label={`${phase.name} tab`}
						componentName='PhaseSwitcherButton'
					>
						{phase.name}
					</Button>
				))}
			</nav>
		</SkipLinkTarget>
	);
}
