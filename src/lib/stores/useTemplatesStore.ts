import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { DEFAULTS } from '@/config';

type TemplatesState = {
	coverLetterTemplate: string;
	setCoverLetterTemplate: (template: string) => void;
	resumeTemplate: string;
	setResumeTemplate: (content: string) => void;
	isGeneratingCoverLetter: boolean;
	setIsGeneratingCoverLetter: (generating: boolean) => void;
	isGeneratingResume: boolean;
	setIsGeneratingResume: (generating: boolean) => void;
	generatedCoverLetter: string;
	setGeneratedCoverLetter: (result: string) => void;
	generatedResume: string;
	setGeneratedResume: (result: string) => void;
};

export const useTemplatesStore = create<TemplatesState>()(
	devtools(
		persist(
			(set) => ({
				coverLetterTemplate: DEFAULTS.INITIAL_STATES.TEMPLATES.coverLetter,
				resumeTemplate: DEFAULTS.INITIAL_STATES.TEMPLATES.resume,
				isGeneratingCoverLetter: false,
				isGeneratingResume: false,
				generatedCoverLetter:
					DEFAULTS.INITIAL_STATES.GENERATION.generatedCoverLetter,
				generatedResume: DEFAULTS.INITIAL_STATES.GENERATION.generatedResume,

				setCoverLetterTemplate: (template) =>
					set({ coverLetterTemplate: template }),
				setResumeTemplate: (template) => set({ resumeTemplate: template }),
				setIsGeneratingCoverLetter: (generating) =>
					set({ isGeneratingCoverLetter: generating }),
				setIsGeneratingResume: (generating) =>
					set({ isGeneratingResume: generating }),
				setGeneratedCoverLetter: (result) =>
					set({ generatedCoverLetter: result }),
				setGeneratedResume: (result) => set({ generatedResume: result }),
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
