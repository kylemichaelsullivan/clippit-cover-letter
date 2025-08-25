'use client';

import clsx from 'clsx';

import { DEFAULTS } from '@/config';
import { useSkillsStore } from '@/lib/stores';
import { renderHtmlContent } from '@/lib/utils';
import type { CandidateDetails } from '@/types';

type FormattedPreviewVariant = 'default' | 'skills' | 'cover-letter' | 'resume';

type FormattedPreviewProps = {
	content: string;
	variant?: FormattedPreviewVariant;
	className?: string;
	candidateDetails?: CandidateDetails;
	isGenerating?: boolean;
};

export function FormattedPreview({
	content,
	variant = 'default',
	className = '',
	candidateDetails,
	isGenerating = false,
}: FormattedPreviewProps) {
	const { generatedSkillsData, includeSkillGroupNames } = useSkillsStore();

	const getGeneratingText = (): string => {
		switch (variant) {
			case 'skills':
				return 'Generating Skills…';
			case 'cover-letter':
				return 'Generating Cover Letter…';
			case 'resume':
				return 'Generating Resume…';
			default:
				return DEFAULTS.GENERATING_TEXT;
		}
	};

	const renderSkillsContent = () => {
		if (isGenerating) {
			return (
				<div className='text-light-gray text-center text-base sm:text-lg'>
					{getGeneratingText()}
				</div>
			);
		}

		if (!includeSkillGroupNames) {
			const allSkills = generatedSkillsData
				.flatMap((group) => group.skills)
				.sort();
			return <p>{allSkills.join(', ')}</p>;
		}

		return (
			<>
				{generatedSkillsData.map((group, index) => (
					<p key={index}>
						<strong>{group.name}:</strong> {group.skills.join(', ')}
					</p>
				))}
			</>
		);
	};

	const renderContent = () => {
		if (isGenerating) {
			return (
				<div className='text-light-gray text-center text-base sm:text-lg'>
					{getGeneratingText()}
				</div>
			);
		}

		return renderHtmlContent(content, candidateDetails);
	};

	return (
		<div
			className={clsx(
				'FormattedPreview',
				'force-white-bg min-h-64 max-w-none overflow-y-auto p-4 text-sm leading-relaxed text-black sm:min-h-96 sm:text-base',
				isGenerating &&
					'text-light-gray flex min-h-64 items-center justify-center sm:min-h-96',
				!isGenerating && 'whitespace-pre-wrap',
				className,
			)}
		>
			{variant === 'skills' ? renderSkillsContent() : renderContent()}
		</div>
	);
}
