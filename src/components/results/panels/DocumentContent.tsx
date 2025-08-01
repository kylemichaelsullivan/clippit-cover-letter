'use client';

import { memo } from 'react';
import clsx from 'clsx';

import { MarkdownInput } from '@/components/ui/input';
import { MarkdownPreview } from '@/components/ui/display';
import { PLACEHOLDERS } from '@/config';

type DocumentContentProps = {
	title: string;
	content: string;
	onContentChange?: (content: string) => void;
	isEditable?: boolean;
	isGenerating?: boolean;
	className?: string;
};

export const DocumentContent = memo(function DocumentContent({
	title,
	content,
	onContentChange,
	isEditable = false,
	isGenerating = false,
	className,
}: DocumentContentProps) {
	const isSkills = title.toLowerCase().includes('skills');
	const inputId = `document-content-${title.toLowerCase().replace(/\s+/g, '-')}`;

	return (
		<div className={clsx('DocumentContent', className)}>
			<label
				htmlFor={inputId}
				className='DocumentContentTitle flex items-center justify-between pb-4 text-lg font-semibold text-black'
			>
				<span>{title}</span>
			</label>
			{isSkills ? (
				<MarkdownInput
					id={inputId}
					value={content}
					onChange={onContentChange || (() => {})}
					placeholder={PLACEHOLDERS.GENERAL.DOCUMENT_CONTENT.replace(
						'{title}',
						title.toLowerCase(),
					)}
					componentName='DocumentContentMarkdownInput'
					readOnly={true}
					className={isGenerating ? 'text-light-gray' : ''}
				/>
			) : isEditable || isGenerating ? (
				<MarkdownInput
					id={inputId}
					value={content}
					onChange={onContentChange || (() => {})}
					placeholder={PLACEHOLDERS.GENERAL.DOCUMENT_CONTENT.replace(
						'{title}',
						title.toLowerCase(),
					)}
					componentName='DocumentContentMarkdownInput'
					readOnly={isGenerating}
					className={isGenerating ? 'text-light-gray' : ''}
				/>
			) : (
				<MarkdownPreview
					content={content}
					componentName='DocumentContentMarkdownPreview'
					isGenerating={isGenerating}
					isSkills={isSkills}
				/>
			)}
		</div>
	);
});
