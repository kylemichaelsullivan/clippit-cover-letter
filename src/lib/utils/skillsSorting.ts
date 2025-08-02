import type { Skills, SkillGroup } from '@/types';

export const sortSkillGroups = (groups: SkillGroup[]): SkillGroup[] => {
	return [...groups].sort((a, b) => {
		const nameA = a.name.toLowerCase();
		const nameB = b.name.toLowerCase();
		if (nameA < nameB) return -1;
		if (nameA > nameB) return 1;
		return 0;
	});
};

export const sortSkillsInGroup = (skills: string[]): string[] => {
	return [...skills].sort((a, b) => {
		const skillA = a.toLowerCase();
		const skillB = b.toLowerCase();
		if (skillA < skillB) return -1;
		if (skillA > skillB) return 1;
		return 0;
	});
};

export const sortAllSkills = (skills: Skills): string[] => {
	if (!skills || !skills.groups || skills.groups.length === 0) {
		return [];
	}

	const allSkills: string[] = [];
	skills.groups.forEach((group) => {
		allSkills.push(...group.skills);
	});

	return sortSkillsInGroup(allSkills);
};

export const getSortedSkillGroups = (skills: Skills): SkillGroup[] => {
	if (!skills || !skills.groups || skills.groups.length === 0) {
		return [];
	}

	return sortSkillGroups(skills.groups).map((group) => ({
		...group,
		skills: sortSkillsInGroup(group.skills),
	}));
};
