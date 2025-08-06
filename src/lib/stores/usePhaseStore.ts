import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { CONSTANTS, DEFAULTS } from '@/config';

type PhaseState = {
	currentPhase: string;
	setCurrentPhase: (phase: string) => void;
	phases: typeof CONSTANTS.PHASES;
	onPhaseChange: (phaseId: string) => void;
	focusCurrentPhaseButton: () => void;
};

export const usePhaseStore = create<PhaseState>()(
	devtools(
		(set) => ({
			currentPhase: DEFAULTS.INITIAL_STATES.PHASE,
			phases: CONSTANTS.PHASES,

			setCurrentPhase: (phase: string) => set({ currentPhase: phase }),

			onPhaseChange: (phaseId: string) => {
				set({ currentPhase: phaseId });
			},

			focusCurrentPhaseButton: () => {
				const phaseSwitcher = document.getElementById('PhaseSwitcher');

				if (phaseSwitcher) {
					const currentPhaseButton = phaseSwitcher.querySelector(
						`[aria-selected="true"]`,
					) as HTMLElement;

					if (currentPhaseButton) {
						currentPhaseButton.focus();
					}
				}
			},
		}),
		{
			name: 'phase-store',
		},
	),
);
