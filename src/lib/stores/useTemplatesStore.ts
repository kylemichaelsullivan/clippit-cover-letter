import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { DEFAULTS } from '@/config';

type TemplatesState = {
	coverLetterTemplate: string;
	resumeTemplate: string;
	isGeneratingCoverLetter: boolean;
	isGeneratingResume: boolean;
	setIsGeneratingCoverLetter: (generating: boolean) => void;
	setIsGeneratingResume: (generating: boolean) => void;
	generatedCoverLetter: string;
	generatedResume: string;
	setGeneratedCoverLetter: (result: string) => void;
	setGeneratedResume: (result: string) => void;
	setCoverLetterTemplate: (template: string) => void;
	setResumeTemplate: (content: string) => void;
};

export const useTemplatesStore = create<TemplatesState>()(
	devtools(
		persist(
			(set) => ({
				coverLetterTemplate: DEFAULTS.INITIAL_STATES.TEMPLATES.coverLetter,
				resumeTemplate: DEFAULTS.INITIAL_STATES.TEMPLATES.resume,
				isGeneratingCoverLetter: false,
				isGeneratingResume: false,
				setIsGeneratingCoverLetter: (generating) =>
					set({ isGeneratingCoverLetter: generating }),
				setIsGeneratingResume: (generating) =>
					set({ isGeneratingResume: generating }),
				generatedCoverLetter:
					DEFAULTS.INITIAL_STATES.GENERATION.generatedCoverLetter,
				generatedResume: DEFAULTS.INITIAL_STATES.GENERATION.generatedResume,
				setGeneratedCoverLetter: (result) =>
					set({ generatedCoverLetter: result }),
				setGeneratedResume: (result) => set({ generatedResume: result }),
				setCoverLetterTemplate: (template) =>
					set({ coverLetterTemplate: template }),
				setResumeTemplate: (template) => set({ resumeTemplate: template }),
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
