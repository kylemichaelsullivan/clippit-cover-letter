'use client';

import clsx from 'clsx';

import { DEFAULTS } from '@/config';
import { useSkillsStore } from '@/lib/stores';
import { renderHtmlContent } from '@/lib/utils';

type FormattedPreviewVariant = 'default' | 'skills' | 'cover-letter' | 'resume';

type FormattedPreviewProps = {
	content: string;
	variant?: FormattedPreviewVariant;
	className?: string;
	isGenerating?: boolean;
};

export function FormattedPreview({
	content,
	variant = 'default',
	className = '',
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
			return <div className='text-light-gray'>{getGeneratingText()}</div>;
		}

		if (!includeSkillGroupNames) {
			const allSkills = generatedSkillsData
				.flatMap((group) => group.skills)
				.sort();
			return (
				<div className='flex flex-col gap-4'>
					<div className='skills-group'>{allSkills.join(', ')}</div>
				</div>
			);
		}

		return (
			<div className='flex flex-col gap-4'>
				{generatedSkillsData.map((group, index) => (
					<div key={index} className='skills-group'>
						<strong>{group.name}:</strong> {group.skills.join(', ')}
					</div>
				))}
			</div>
		);
	};

	const renderContent = () => {
		if (isGenerating) {
			return <div className='text-light-gray'>{getGeneratingText()}</div>;
		}

		return renderHtmlContent(content);
	};

	return (
		<div
			className={clsx(
				'FormattedPreview',
				'min-h-64 max-w-none overflow-y-auto bg-white p-4 text-sm leading-relaxed text-black sm:min-h-96 sm:text-base',
				isGenerating && 'text-light-gray flex items-center justify-center',
				!isGenerating && 'whitespace-pre-wrap',
				className,
			)}
		>
			{variant === 'skills' ? renderSkillsContent() : renderContent()}
		</div>
	);
}
