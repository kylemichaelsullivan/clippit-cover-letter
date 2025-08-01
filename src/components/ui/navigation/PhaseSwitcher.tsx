'use client';

import { CONSTANTS } from '@/config';
import type { Phase } from '@/types';

import { Button } from '@/components/ui/buttons';

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
		<nav
			className='PhaseSwitcher border-light-gray scrollbar-hide flex max-w-screen justify-start gap-2 overflow-x-auto rounded-b-lg border-x border-b bg-white p-2 shadow-sm'
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
	);
}
