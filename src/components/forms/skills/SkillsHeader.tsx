'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/buttons';

type SkillsHeaderProps = {
	includeSkills: boolean;
	onIncludeSkillsChange: (include: boolean) => void;
	onAlphabetizeGroups?: () => void;
	skillsCount: number;
};

export function SkillsHeader({
	includeSkills,
	onIncludeSkillsChange,
	onAlphabetizeGroups,
	skillsCount,
}: SkillsHeaderProps) {
	return (
		<div className='SkillsHeader flex justify-between gap-2 sm:flex-row sm:items-center sm:justify-between'>
			<label className='flex cursor-pointer items-center gap-2 sm:gap-3'>
				<input
					type='checkbox'
					checked={includeSkills}
					onChange={(e) => onIncludeSkillsChange(e.target.checked)}
				/>
				<div className='flex items-center justify-start gap-2'>
					<span className='text-base font-medium text-black sm:text-lg'>
						Curate Skills
					</span>
					<span className='xs:block text-gray hidden text-xs sm:text-sm'>
						({skillsCount})
					</span>
				</div>
			</label>

			<div className='flex gap-2'>
				{onAlphabetizeGroups && (
					<Button
						color='secondary'
						size='xs'
						onClick={onAlphabetizeGroups}
						title='Alphabetize Skill Group Names'
						componentName='AlphabetizeSkillsButton border-black'
					>
						<FontAwesomeIcon icon={faSort} aria-hidden='true' />
						<span className='hidden sm:inline'>Alphabetize</span>
					</Button>
				)}
			</div>
		</div>
	);
}
