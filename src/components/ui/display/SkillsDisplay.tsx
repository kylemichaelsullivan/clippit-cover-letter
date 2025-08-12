'use client';

import { useState } from 'react';
import { CopyButton } from '@/components/results';
import { EmptySkillsMessage } from '@/components/ui/feedback';
import { CONSTANTS, PLACEHOLDERS } from '@/config';
import { getSortedSkillGroups } from '@/lib/utils';
import { clsx } from 'clsx';
import type { Skills } from '@/types';

type SkillsDisplayProps = {
	skills: Skills;
};

export function SkillsDisplay({ skills }: SkillsDisplayProps) {
	const [skillsText, setSkillsText] = useState(() => {
		const sortedGroups = getSortedSkillGroups(skills);
		return sortedGroups
			.map((group) => {
				if (group.skills.length === 0) return '';
				return `**${group.name}:** ${group.skills.join(', ')}`;
			})
			.filter(Boolean)
			.join('\n\n');
	});

	const handleTextChange = (value: string) => {
		setSkillsText(value);
	};

	const hasSkills = skills.groups.some((group) => group.skills.length > 0);

	if (!hasSkills) {
		return (
			<div className='SkillsDisplay flex flex-col gap-3 rounded-lg bg-white p-4 shadow-md sm:gap-4 sm:p-6'>
				<div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
					<h3 className='text-gray text-base font-medium sm:text-lg'>Skills</h3>
				</div>
				<EmptySkillsMessage />
			</div>
		);
	}

	return (
		<div className='SkillsDisplay flex flex-col gap-3 rounded-lg bg-white p-4 shadow-md sm:gap-4 sm:p-6'>
			<div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
				<h3 className='text-gray text-base font-medium sm:text-lg'>Skills</h3>
				<CopyButton text={skillsText} />
			</div>
			<textarea
				value={skillsText}
				onChange={(e) => handleTextChange(e.target.value)}
				className={clsx(
					CONSTANTS.CLASS_NAMES.MARKDOWN_INPUT,
					'h-64 text-sm sm:h-96 sm:text-base',
				)}
				placeholder={PLACEHOLDERS.GENERAL.SKILLS_CONTENT}
				aria-label='Skills text area'
			/>
		</div>
	);
}
