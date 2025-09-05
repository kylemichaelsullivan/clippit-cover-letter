'use client';

import { memo } from 'react';

import { Button } from '@/components/ui';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type DocumentGenerationButtonProps = {
	isGenerating: boolean;
	onClick: () => void;
	disabled?: boolean;
};

export const DocumentGenerationButton = memo(function DocumentGenerationButton({
	isGenerating,
	onClick,
	disabled = false,
}: DocumentGenerationButtonProps) {
	return (
		<div className='GenerateButton w-full'>
			<Button
				componentName='GenerateButton'
				color='primary'
				size='lg'
				disabled={disabled || isGenerating}
				onClick={onClick}
			>
				{isGenerating ? (
					<FontAwesomeIcon
						icon={faRefresh}
						className='animate-spin'
						aria-hidden='true'
					/>
				) : (
					'Generate Documents'
				)}
			</Button>
		</div>
	);
});
