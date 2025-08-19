'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/buttons';

type SortEducationButtonProps = {
	onSortByYear: () => void;
};

export function SortEducationButton({
	onSortByYear,
}: SortEducationButtonProps) {
	return (
		<Button
			color='secondary'
			size='xs'
			onClick={onSortByYear}
			title='Sort by Graduation Year'
			componentName='SortEducationButton border-black'
		>
			<FontAwesomeIcon icon={faSort} aria-hidden='true' />
			<span className='hidden sm:inline'>Sort</span>
		</Button>
	);
}
