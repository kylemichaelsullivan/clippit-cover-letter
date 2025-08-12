'use client';

import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';

import { CONSTANTS } from '@/config';

type MarkdownPreviewProps = {
	content: string;
	componentName?: string;
	className?: string;
	isGenerating?: boolean;
};

export function MarkdownPreview({
	content,
	componentName,
	className = '',
	isGenerating = false,
}: MarkdownPreviewProps) {
	return (
		<div
			className={clsx(
				componentName || 'MarkdownPreview',
				CONSTANTS.CLASS_NAMES.MARKDOWN_INPUT,
				'min-h-64 max-w-none overflow-y-auto bg-white p-4 text-sm leading-relaxed sm:min-h-96 sm:text-base',
				isGenerating && 'text-light-gray',
				className,
			)}
		>
			<ReactMarkdown>{content}</ReactMarkdown>
		</div>
	);
}
