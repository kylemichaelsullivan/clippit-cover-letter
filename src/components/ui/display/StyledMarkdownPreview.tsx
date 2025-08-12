'use client';

import { memo } from 'react';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';

type StyledMarkdownPreviewProps = {
	content: string;
	componentName?: string;
	className?: string;
	isGenerating?: boolean;
	title?: string;
	isCompact?: boolean;
};

export const StyledMarkdownPreview = memo(function StyledMarkdownPreview({
	content,
	componentName,
	className = '',
	isGenerating = false,
	title = '',
	isCompact = false,
}: StyledMarkdownPreviewProps) {
	const renderContent = () => {
		if (isGenerating) {
			let generatingText = 'Generating...';

			if (title.toLowerCase().includes('cover letter')) {
				generatingText = 'Generating Cover Letter...';
			} else if (title.toLowerCase().includes('resume')) {
				generatingText = 'Generating Resume...';
			} else if (title.toLowerCase().includes('skills')) {
				generatingText = 'Generating Skills...';
			}

			return <div className='text-light-gray'>{generatingText}</div>;
		}

		return <ReactMarkdown>{content}</ReactMarkdown>;
	};

	return (
		<div
			className={clsx(
				componentName || 'StyledMarkdownPreview',
				'min-h-64 w-full max-w-none overflow-y-auto bg-white p-4 text-sm sm:min-h-96 sm:text-base',
				isCompact ? 'leading-tight' : 'leading-relaxed',
				isCompact ? 'prose-compact' : 'prose prose-sm sm:prose-base max-w-none',
				isGenerating && 'text-light-gray flex items-center justify-center',
				className,
			)}
		>
			{renderContent()}
		</div>
	);
});
