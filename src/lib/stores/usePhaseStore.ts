import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { CONSTANTS, DEFAULTS } from '@/config';

type PhaseState = {
	currentPhase: string;
	setCurrentPhase: (phase: string) => void;
	phases: typeof CONSTANTS.PHASES;
	onPhaseChange: (phaseId: string) => void;
};

export const usePhaseStore = create<PhaseState>()(
	devtools(
		(set) => ({
			currentPhase: DEFAULTS.INITIAL_STATES.PHASE,
			phases: CONSTANTS.PHASES,

			setCurrentPhase: (phase: string) => set({ currentPhase: phase }),

			onPhaseChange: (phaseId: string) => set({ currentPhase: phaseId }),
		}),
		{
			name: 'phase-store',
		},
	),
);
