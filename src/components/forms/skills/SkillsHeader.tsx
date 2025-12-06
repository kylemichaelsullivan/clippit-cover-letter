'use client';

import { Button } from '@/components/ui/buttons';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type SkillsHeaderProps = {
	onAlphabetizeGroups?: () => void;
	groupsCount: number;
	activeGroupsCount: number;
};

export function SkillsHeader({
	onAlphabetizeGroups,
	groupsCount,
	activeGroupsCount,
}: SkillsHeaderProps) {
	return (
		<div className='SkillsHeader flex justify-between gap-2 sm:flex-row sm:items-center sm:justify-between'>
			<div className='flex items-center justify-start gap-2'>
				<span className='text-lg font-semibold text-black'>Skill Groups</span>
				<span className='xs:block text-gray hidden text-xs sm:text-sm'>
					({activeGroupsCount}/{groupsCount})
				</span>
			</div>

			<div className='flex gap-2'>
				{onAlphabetizeGroups && (
					<Button
						componentName='AlphabetizeSkillsButton'
						color='secondary'
						size='sort'
						title='Alphabetize Skill Group Names'
						onClick={onAlphabetizeGroups}
					>
						<FontAwesomeIcon icon={faSort} aria-hidden='true' />
						<span className='hidden sm:block'>Alphabetize</span>
					</Button>
				)}
			</div>
		</div>
	);
}
