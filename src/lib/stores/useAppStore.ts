import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { DEFAULTS } from '@/config';

type AppState = {
	includeCoverLetter: boolean;
	setIncludeCoverLetter: (include: boolean) => void;
	includeResume: boolean;
	setIncludeResume: (include: boolean) => void;
	skillsInstructions: string;
	setSkillsInstructions: (instructions: string) => void;
	coverLetterInstructions: string;
	setCoverLetterInstructions: (instructions: string) => void;
	resumeInstructions: string;
	setResumeInstructions: (instructions: string) => void;
};

export const useAppStore = create<AppState>()(
	devtools(
		persist(
			(set) => ({
				includeCoverLetter: DEFAULTS.FORM_DEFAULTS.INCLUDE_COVER_LETTER,
				includeResume: DEFAULTS.FORM_DEFAULTS.INCLUDE_RESUME,
				skillsInstructions:
					DEFAULTS.INITIAL_STATES.DOCUMENT_INSTRUCTIONS.skillsInstructions,
				coverLetterInstructions:
					DEFAULTS.INITIAL_STATES.DOCUMENT_INSTRUCTIONS.coverLetterInstructions,
				resumeInstructions:
					DEFAULTS.INITIAL_STATES.DOCUMENT_INSTRUCTIONS.resumeInstructions,

				setIncludeCoverLetter: (include) =>
					set({ includeCoverLetter: include }),
				setIncludeResume: (include) => set({ includeResume: include }),
				setSkillsInstructions: (instructions) =>
					set({ skillsInstructions: instructions }),
				setCoverLetterInstructions: (instructions) =>
					set({ coverLetterInstructions: instructions }),
				setResumeInstructions: (instructions) =>
					set({ resumeInstructions: instructions }),
			}),
			{
				name: 'app-store',
			},
		),
		{
			name: 'app-store',
		},
	),
);
