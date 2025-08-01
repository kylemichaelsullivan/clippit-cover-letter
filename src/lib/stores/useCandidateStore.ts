import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { DEFAULTS } from '@/config';
import type { CandidateDetails } from '@/types';

type CandidateState = {
	candidateDetails: CandidateDetails;
	setCandidateDetails: (details: CandidateDetails) => void;
	setCandidateField: (field: keyof CandidateDetails, value: string) => void;
	getCandidateDetails: () => CandidateDetails;
};

export const useCandidateStore = create<CandidateState>()(
	devtools(
		persist(
			(set, get) => ({
				candidateDetails: DEFAULTS.INITIAL_STATES.CANDIDATE_DETAILS,

				setCandidateDetails: (details) => set({ candidateDetails: details }),

				setCandidateField: (field, value) =>
					set((state) => ({
						candidateDetails: {
							...state.candidateDetails,
							[field]: value,
						},
					})),

				getCandidateDetails: () => {
					const state = get();
					return state.candidateDetails;
				},
			}),
			{
				name: 'candidate-store',
			},
		),
		{
			name: 'candidate-store',
		},
	),
);
