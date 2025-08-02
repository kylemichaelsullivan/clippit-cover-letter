import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { DEFAULTS } from '@/config';
import { getSortedSkillGroups } from '@/lib/utils';
import type { Skills } from '@/types';

type SkillsState = {
	skills: Skills;
	setSkills: (skills: Skills) => void;
	setSkillsRange: (minSkills: number, maxSkills: number) => void;
	includeSkills: boolean;
	setIncludeSkills: (include: boolean) => void;
	generatedSkills: string;
	setGeneratedSkills: (result: string) => void;
	isGeneratingSkills: boolean;
	setIsGeneratingSkills: (generating: boolean) => void;
	generateSkills: () => Promise<void>;
};

export const useSkillsStore = create<SkillsState>()(
	devtools(
		persist(
			(set, get) => ({
				skills: {
					groups: [
						{
							id: `group-${Date.now()}`,
							name: '',
							skills: [],
						},
					],
					minSkillsToUse: 5,
					maxSkillsToUse: 10,
				},
				includeSkills: DEFAULTS.FORM_DEFAULTS.INCLUDE_SKILLS,
				generatedSkills: DEFAULTS.INITIAL_STATES.GENERATION.generatedSkills,
				isGeneratingSkills: false,

				setSkills: (skills) => set({ skills }),
				setSkillsRange: (minSkills, maxSkills) =>
					set((state) => ({
						skills: {
							...state.skills,
							minSkillsToUse: minSkills,
							maxSkillsToUse: maxSkills,
						},
					})),
				setIncludeSkills: (include) => set({ includeSkills: include }),
				setGeneratedSkills: (result) => set({ generatedSkills: result }),
				setIsGeneratingSkills: (generating) =>
					set({ isGeneratingSkills: generating }),

				generateSkills: async () => {
					const state = get();
					set({ isGeneratingSkills: true });
					try {
						// Mock generation - in real app this would call an API
						await new Promise((resolve) => setTimeout(resolve, 1000));

						const sortedGroups = getSortedSkillGroups(state.skills);
						const skillsText = sortedGroups
							.map((group) => {
								if (group.skills.length === 0) return '';
								return `<strong>${group.name}:</strong> ${group.skills.join(', ')}`;
							})
							.filter(Boolean)
							.join('<br>');
						set({ generatedSkills: skillsText });
					} catch (error) {
						console.error('Error generating skills:', error);
						set({
							generatedSkills: 'Error generating skills. Please try again.',
						});
					} finally {
						set({ isGeneratingSkills: false });
					}
				},
			}),
			{
				name: 'skills-store',
			},
		),
		{
			name: 'skills-store',
		},
	),
);
