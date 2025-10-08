import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { DEFAULTS } from '@/config';

type TemplatesState = {
	coverLetterTemplate: string;
	isGenerating: boolean;
	setIsGenerating: (generating: boolean) => void;
	generatedCoverLetter: string;
	generatedResume: string;
	setGeneratedCoverLetter: (result: string) => void;
	setGeneratedResume: (result: string) => void;
	setCoverLetterTemplate: (template: string) => void;
};

export const useTemplatesStore = create<TemplatesState>()(
	devtools(
		persist(
			(set) => ({
				coverLetterTemplate: DEFAULTS.INITIAL_STATES.TEMPLATES.coverLetter,
				isGenerating: false,
				setIsGenerating: (generating) => set({ isGenerating: generating }),
				generatedCoverLetter:
					DEFAULTS.INITIAL_STATES.GENERATION.generatedCoverLetter,
				generatedResume: DEFAULTS.INITIAL_STATES.GENERATION.generatedResume,
				setGeneratedCoverLetter: (result) =>
					set({ generatedCoverLetter: result }),
				setGeneratedResume: (result) => set({ generatedResume: result }),
				setCoverLetterTemplate: (template) =>
					set({ coverLetterTemplate: template }),
			}),
			{
				name: 'templates-store',
			},
		),
		{
			name: 'templates-store',
		},
	),
);
