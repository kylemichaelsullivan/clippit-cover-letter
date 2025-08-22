import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { DEFAULTS } from '@/config';
import { getSortedSkillGroups } from '@/lib/utils';
import type { Skills } from '@/types';

type SkillsGroup = {
	name: string;
	skills: string[];
};

type SkillsState = {
	skills: Skills;
	setSkills: (skills: Skills) => void;
	setSkillsRange: (minSkills: number, maxSkills: number) => void;
	includeSkills: boolean;
	setIncludeSkills: (include: boolean) => void;
	includeSkillGroupNames: boolean;
	setIncludeSkillGroupNames: (include: boolean) => void;
	generatedSkills: string;
	setGeneratedSkills: (result: string) => void;
	generatedSkillsData: SkillsGroup[];
	setGeneratedSkillsData: (data: SkillsGroup[]) => void;
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
							include: true,
							name: '',
							skills: [],
						},
					],
					minSkillsToUse: 5,
					maxSkillsToUse: 10,
				},
				includeSkills: DEFAULTS.FORM_DEFAULTS.INCLUDE_SKILLS,
				includeSkillGroupNames:
					DEFAULTS.FORM_DEFAULTS.INCLUDE_SKILL_GROUP_NAMES,
				generatedSkills: DEFAULTS.INITIAL_STATES.GENERATION.generatedSkills,
				generatedSkillsData: [],
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
				setIncludeSkillGroupNames: (include) =>
					set({ includeSkillGroupNames: include }),
				setGeneratedSkills: (result) => set({ generatedSkills: result }),
				setGeneratedSkillsData: (data) => set({ generatedSkillsData: data }),
				setIsGeneratingSkills: (generating) =>
					set({ isGeneratingSkills: generating }),

				generateSkills: async () => {
					const state = get();
					set({ isGeneratingSkills: true });
					try {
						// Mock generation - in real app this would call an API
						await new Promise((resolve) => setTimeout(resolve, 1000));

						const sortedGroups = getSortedSkillGroups(state.skills);

						const skillsData = sortedGroups
							.filter((group) => group.skills.length > 0 && group.include)
							.map((group) => ({
								name: group.name,
								skills: group.skills,
							}));

						if (skillsData.length === 0) {
							set({
								generatedSkills:
									'No skills found. Please add skills in the Skills tab before generating.',
								generatedSkillsData: [],
							});
							return;
						}

						const skillsText = skillsData
							.map((group) =>
								state.includeSkillGroupNames
									? `<strong>${group.name}:</strong> ${group.skills.join(', ')}`
									: group.skills.join(', '),
							)
							.join('<br>');

						set({
							generatedSkills: skillsText,
							generatedSkillsData: skillsData,
						});
					} catch (error) {
						console.error('Error generating skills:', error);
						set({
							generatedSkills: 'Error generating skills. Please try again.',
							generatedSkillsData: [],
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
