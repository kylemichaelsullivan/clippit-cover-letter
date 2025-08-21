'use client';

import { Button } from '@/components/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

type DocumentHeaderProps = {
	title: string;
	onGenerate?: () => void;
	isGenerating?: boolean;
};

export function DocumentHeader({
	title,
	onGenerate,
	isGenerating = false,
}: DocumentHeaderProps) {
	return (
		<header className='DocumentHeader border-gray flex items-center justify-between gap-3 border-b bg-white px-4 py-3 sm:flex-row sm:justify-between sm:gap-0 sm:px-6 sm:py-4'>
			<h3 className='text-base font-medium text-black sm:text-lg'>{title}</h3>
			{onGenerate && (
				<div className='GenerateButton w-full'>
					<Button
						color='primary'
						size='lg'
						onClick={onGenerate}
						componentName='GenerateButton'
					>
						{isGenerating ? (
							<FontAwesomeIcon
								icon={faRefresh}
								aria-hidden='true'
								className='animate-spin'
							/>
						) : (
							'Generate Documents'
						)}
					</Button>
				</div>
			)}
		</header>
	);
}
