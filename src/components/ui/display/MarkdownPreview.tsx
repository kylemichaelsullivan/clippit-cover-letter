'use client';

import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';

import { CONSTANTS } from '@/config';

type MarkdownPreviewProps = {
	content: string;
	componentName?: string;
	className?: string;
	isGenerating?: boolean;
	isSkills?: boolean;
};

export function MarkdownPreview({
	content,
	componentName,
	className = '',
	isGenerating = false,
	isSkills = false,
}: MarkdownPreviewProps) {
	return (
		<div
			className={clsx(
				componentName || 'MarkdownPreview',
				CONSTANTS.CLASS_NAMES.MARKDOWN_INPUT,
				'min-h-64 max-w-none bg-white text-sm leading-relaxed sm:min-h-96 sm:text-base',
				// Skills section styling
				isSkills && !isGenerating && 'overflow-hidden p-4',
				// Generating state styling
				isGenerating && 'text-light-gray p-4',
				className,
			)}
		>
			<ReactMarkdown>{content}</ReactMarkdown>
		</div>
	);
}
