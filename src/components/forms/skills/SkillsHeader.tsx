'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { CONSTANTS } from '@/config';
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
					className={CONSTANTS.CLASS_NAMES.CHECKBOX}
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
						<FontAwesomeIcon
							icon={faSort}
							className='h-3 w-3 sm:h-4 sm:w-4'
							aria-hidden='true'
						/>
						<span className='hidden sm:inline'>Alphabetize</span>
					</Button>
				)}
			</div>
		</div>
	);
}
