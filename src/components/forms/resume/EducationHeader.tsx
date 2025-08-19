'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/buttons';

type EducationHeaderProps = {
	onSortByYear?: () => void;
};

export function EducationHeader({ onSortByYear }: EducationHeaderProps) {
	return (
		<div className='EducationHeader flex justify-between gap-2 sm:flex-row sm:items-center sm:justify-between'>
			<div className='flex items-center justify-start gap-2'>
				<span className='text-base font-medium text-black sm:text-lg'>
					Education
				</span>
			</div>

			<div className='flex gap-2'>
				{onSortByYear && (
					<Button
						color='secondary'
						size='xs'
						onClick={onSortByYear}
						title='Sort by Graduation Year'
						componentName='SortEducationButton'
					>
						<FontAwesomeIcon icon={faSort} aria-hidden='true' />
						<span className='xs:inline hidden'>Sort</span>
					</Button>
				)}
			</div>
		</div>
	);
}
