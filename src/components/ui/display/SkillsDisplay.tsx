'use client';

import { CopyButton } from '@/components/results';
import { EmptySkillsMessage } from '@/components/ui/feedback';
import { TipTapEditor } from '@/components/ui/input';
import { PLACEHOLDERS } from '@/config';
import { useSkillsStore } from '@/lib/stores';
import { getSortedSkillGroups } from '@/lib/utils';
import type { Skills } from '@/types';
import { useEffect, useState } from 'react';

type SkillsDisplayProps = {
	skills: Skills;
	useGeneratedSkills?: boolean;
};

export function SkillsDisplay({
	skills,
	useGeneratedSkills = false,
}: SkillsDisplayProps) {
	const { generatedSkills } = useSkillsStore();

	const [skillsText, setSkillsText] = useState(() => {
		if (useGeneratedSkills && generatedSkills) {
			return generatedSkills;
		}

		const sortedGroups = getSortedSkillGroups(skills);
		const htmlText = sortedGroups
			.map((group) => {
				if (group.skills.length === 0) return '';
				return `<li><strong>${group.name}:</strong> ${group.skills.join(', ')}</li>`;
			})
			.filter(Boolean)
			.join('');

		return htmlText ? `<ul>${htmlText}</ul>` : '';
	});

	useEffect(() => {
		if (useGeneratedSkills && generatedSkills) {
			setSkillsText(generatedSkills);
		}
	}, [useGeneratedSkills, generatedSkills]);

	const handleTextChange = (value: string) => {
		setSkillsText(value);
	};

	const hasSkills = useGeneratedSkills
		? generatedSkills && generatedSkills.trim() !== ''
		: skills.groups.some((group) => group.skills.length > 0);

	const getPlainTextForCopy = () => {
		if (useGeneratedSkills && generatedSkills) {
			// Convert HTML to plain text for copying
			return generatedSkills
				.replace(/<ul>/g, '')
				.replace(/<\/ul>/g, '')
				.replace(
					/<li><p><strong>([^<]+):<\/strong> ([^<]+)<\/p><\/li>/g,
					'$1: $2'
				)
				.replace(/<li><p>([^<]+)<\/p><\/li>/g, '$1')
				.replace(/<li><strong>([^<]+):<\/strong> ([^<]+)<\/li>/g, '$1: $2')
				.replace(/<li>([^<]+)<\/li>/g, '$1')
				.replace(/<p>([^<]+)<\/p>/g, '$1')
				.replace(/<br\s*\/?>/g, '\n')
				.replace(/<[^>]*>/g, '');
		}

		const sortedGroups = getSortedSkillGroups(skills);
		return sortedGroups
			.map((group) => {
				if (group.skills.length === 0) return '';
				return `${group.name}: ${group.skills.join(', ')}`;
			})
			.filter(Boolean)
			.join('\n\n');
	};

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
				<CopyButton text={getPlainTextForCopy()} />
			</div>
			<TipTapEditor
				value={skillsText}
				onChange={handleTextChange}
				placeholder={PLACEHOLDERS.GENERAL.SKILLS_CONTENT}
				componentName='SkillsDisplayTipTapEditor'
				className='h-64 sm:h-96'
				aria-label='Skills text area'
			/>
		</div>
	);
}
