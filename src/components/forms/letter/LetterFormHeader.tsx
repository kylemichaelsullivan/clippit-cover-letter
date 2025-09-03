'use client';

import { memo } from 'react';
import { Button } from '@/components/ui/buttons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TabTitle } from '@/components/ui';

type LetterFormHeaderProps = {
	onOpenHelp: () => void;
};

export const LetterFormHeader = memo(function LetterFormHeader({
	onOpenHelp,
}: LetterFormHeaderProps) {
	return (
		<div className='flex items-center justify-between'>
			<TabTitle componentName='LetterFormTitle' title='Cover Letter Template' />
			<Button
				componentName='LetterFormHelpButton'
				color='primary'
				size='md'
				title='Template Variables Help'
				onClick={onOpenHelp}
			>
				<FontAwesomeIcon icon={faCircleQuestion} aria-hidden='true' />
			</Button>
		</div>
	);
});
