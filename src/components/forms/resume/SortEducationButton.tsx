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
