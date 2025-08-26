'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/buttons';

type SortExperienceButtonProps = {
	onSortByDate: () => void;
};

export function SortExperienceButton({
	onSortByDate,
}: SortExperienceButtonProps) {
	return (
		<Button
			componentName='SortExperienceButton'
			color='secondary'
			size='sort'
			title='Sort by Date'
			onClick={onSortByDate}
		>
			<FontAwesomeIcon icon={faSort} aria-hidden='true' />
			<span className='hidden sm:inline'>Sort</span>
		</Button>
	);
}
