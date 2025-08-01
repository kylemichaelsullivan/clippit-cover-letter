import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { DEFAULTS } from '@/config';
import type { Job } from '@/types';

type JobState = {
	jobDetails: Job;
	setJobDetails: (details: Job) => void;
	setJobField: (field: keyof Job, value: string) => void;
};

export const useJobStore = create<JobState>()(
	devtools(
		persist(
			(set) => ({
				jobDetails: {
					...DEFAULTS.INITIAL_STATES.JOB_DETAILS,
				},

				setJobDetails: (details) => set({ jobDetails: details }),

				setJobField: (field, value) =>
					set((state) => ({
						jobDetails: { ...state.jobDetails, [field]: value },
					})),
			}),
			{
				name: 'job-store',
			},
		),
		{
			name: 'job-store',
		},
	),
);
