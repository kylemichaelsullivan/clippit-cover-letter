'use client';

import { Button } from '@/components/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

type GenerateButtonProps = {
	isGenerating: boolean;
	onClick: () => void;
	componentName: string;
	title: string;
};

export const GenerateButton = function GenerateButton({
	isGenerating,
	onClick,
	componentName,
	title,
}: GenerateButtonProps) {
	return (
		<div className={`${componentName} flex w-full justify-center`}>
			<Button
				color='primary'
				size='md'
				onClick={onClick}
				componentName={componentName}
				title={title}
			>
				<FontAwesomeIcon
					icon={faRefresh}
					aria-hidden='true'
					className={isGenerating ? 'animate-spin' : ''}
				/>

				<span className='GenerateButtonText xs:block hidden text-sm font-semibold'>
					{isGenerating ? 'Generating...' : title}
				</span>
			</Button>
		</div>
	);
};
