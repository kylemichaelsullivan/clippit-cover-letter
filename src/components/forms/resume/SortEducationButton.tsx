'use client';

import { Button } from '@/components/ui/buttons';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type SortEducationButtonProps = {
	onSortByYear: () => void;
};

export function SortEducationButton({
	onSortByYear,
}: SortEducationButtonProps) {
	return (
		<Button
			componentName='SortEducationButton'
			color='secondary'
			size='sort'
			title='Sort by Graduation Year'
			onClick={onSortByYear}
		>
			<FontAwesomeIcon icon={faSort} aria-hidden='true' />
			<span className='hidden sm:block'>Sort</span>
		</Button>
	);
}
