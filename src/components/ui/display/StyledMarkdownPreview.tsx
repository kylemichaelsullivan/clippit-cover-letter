'use client';

import { memo } from 'react';
import clsx from 'clsx';
import { extractTipTapContent } from '@/lib/utils/tiptap';
import {
	convertHtmlToMarkdown,
	renderMarkdownContent,
} from '@/lib/utils/markdownComponents';
import { renderHtmlContent } from '@/lib/utils/htmlRenderer';
import type { CandidateDetails } from '@/types';

type StyledMarkdownPreviewProps = {
	content: string;
	componentName?: string;
	className?: string;
	isGenerating?: boolean;
	title?: string;
	isCompact?: boolean;
	isPrintDocument?: boolean;
	fontSize?: number;
	candidateDetails?: CandidateDetails;
};

export const StyledMarkdownPreview = memo(function StyledMarkdownPreview({
	content,
	componentName,
	className = '',
	isGenerating = false,
	title = '',
	isCompact = false,
	isPrintDocument = false,
	fontSize,
	candidateDetails,
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

		const isSkills = title.toLowerCase().includes('skills');

		if (isSkills) {
			const extractedContent = extractTipTapContent(content);
			const markdownContent = convertHtmlToMarkdown(
				extractedContent,
				candidateDetails,
			);
			return renderMarkdownContent(markdownContent);
		} else {
			return renderHtmlContent(content);
		}
	};

	return (
		<div
			className={clsx(
				componentName || 'StyledMarkdownPreview',
				'min-h-64 w-full max-w-none overflow-y-auto p-4 text-sm sm:min-h-96 sm:text-base',
				isCompact ? 'leading-tight' : 'leading-relaxed',
				isCompact ? 'prose-compact' : 'prose prose-sm sm:prose-base max-w-none',
				isGenerating && 'text-light-gray flex items-center justify-center',
				isPrintDocument && 'print-document-content',
				!isPrintDocument && 'bg-white',
				className,
			)}
			style={fontSize ? { fontSize: `${fontSize}pt` } : undefined}
		>
			{renderContent()}
		</div>
	);
});
