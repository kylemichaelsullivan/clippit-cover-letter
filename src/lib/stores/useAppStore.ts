import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { DEFAULTS } from '@/config';

type AppState = {
	includeCoverLetter: boolean;
	includeResume: boolean;
	setIncludeCoverLetter: (include: boolean) => void;
	setIncludeResume: (include: boolean) => void;
	skillsInstructions: string;
	coverLetterInstructions: string;
	resumeInstructions: string;
	setSkillsInstructions: (instructions: string) => void;
	setCoverLetterInstructions: (instructions: string) => void;
	setResumeInstructions: (instructions: string) => void;
	resumeFontSize: number;
	setResumeFontSize: (size: number) => void;
};

export const useAppStore = create<AppState>()(
	devtools(
		persist(
			(set) => ({
				includeCoverLetter: DEFAULTS.FORM_DEFAULTS.INCLUDE_COVER_LETTER,
				includeResume: DEFAULTS.FORM_DEFAULTS.INCLUDE_RESUME,
				setIncludeCoverLetter: (include) =>
					set({ includeCoverLetter: include }),
				setIncludeResume: (include) => set({ includeResume: include }),

				skillsInstructions:
					DEFAULTS.INITIAL_STATES.DOCUMENT_INSTRUCTIONS.skillsInstructions,
				coverLetterInstructions:
					DEFAULTS.INITIAL_STATES.DOCUMENT_INSTRUCTIONS.coverLetterInstructions,
				resumeInstructions:
					DEFAULTS.INITIAL_STATES.DOCUMENT_INSTRUCTIONS.resumeInstructions,
				setSkillsInstructions: (instructions) =>
					set({ skillsInstructions: instructions }),
				setCoverLetterInstructions: (instructions) =>
					set({ coverLetterInstructions: instructions }),
				setResumeInstructions: (instructions) =>
					set({ resumeInstructions: instructions }),

				resumeFontSize: DEFAULTS.FORM_DEFAULTS.RESUME_FONT_SIZE,
				setResumeFontSize: (size) => set({ resumeFontSize: size }),
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
