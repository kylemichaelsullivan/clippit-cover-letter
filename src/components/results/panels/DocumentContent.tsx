'use client';

import { type ReactNode, memo, useCallback, useRef, useState } from 'react';

import { ViewToggle } from '@/components/ui/buttons';
import { TipTapEditor } from '@/components/ui/input';
import { PLACEHOLDERS } from '@/config';
import type { DocumentType, FontSize } from '@/types';
import clsx from 'clsx';
import { DocumentGenerationState } from './DocumentGenerationState';
import { DocumentHeader } from './DocumentHeader';
import { DocumentPreview } from './DocumentPreview';

type DocumentContentProps = {
	title: string;
	content: string;
	documentType?: DocumentType;
	className?: string;
	headerElement?: ReactNode;
	fontSize?: FontSize;
	fontSizeInput?: ReactNode;
	isEditable?: boolean;
	isGenerating?: boolean;
	templateContent?: string; // Raw template content with placeholders for editing
	onContentChange?: (content: string) => void;
};

export const DocumentContent = memo(function DocumentContent({
	title,
	content,
	documentType,
	className,
	headerElement,
	fontSize,
	fontSizeInput,
	isEditable = false,
	isGenerating = false,
	templateContent,
	onContentChange,
}: DocumentContentProps) {
	const [isTipTapView, setIsTipTapView] = useState(false);
	const isCoverLetter = documentType === 'cover-letter';
	const isResume = documentType === 'resume';
	const inputId = `document-content-${title.toLowerCase().replace(/\s+/g, '-')}`;

	const lastContentRef = useRef<string>(content);

	const handleContentChange = useCallback(
		(newContent: string) => {
			if (onContentChange) {
				const cleanedContent = newContent.replace(
					/<\/ul>\s*<p><br class="ProseMirror-trailingBreak"><\/p>/g,
					'</ul>'
				);

				if (cleanedContent !== lastContentRef.current) {
					lastContentRef.current = cleanedContent;
					onContentChange(cleanedContent);
				}
			}
		},
		[onContentChange]
	);

	if (content !== lastContentRef.current) {
		lastContentRef.current = content;
	}

	const handleToggleView = () => {
		setIsTipTapView(!isTipTapView);
	};

	return (
		<div className={clsx('DocumentContent flex flex-col gap-4', className)}>
			<DocumentHeader
				title={title}
				fontSizeInput={fontSizeInput}
				headerElement={
					isEditable && (isResume || isCoverLetter) ? (
						<ViewToggle
							isTipTapView={isTipTapView}
							onToggle={handleToggleView}
						/>
					) : (
						headerElement
					)
				}
			/>

			{isGenerating ? (
				<DocumentGenerationState isGenerating={true} title={title} />
			) : isEditable ? (
				<div className='flex flex-col gap-4'>
					{isResume || isCoverLetter ? (
						isTipTapView ? (
							<div className='print-document bg-gray border-light-gray border'>
								<TipTapEditor
									componentName='DocumentContentTipTapEditor'
									className='min-h-64 w-full font-mono sm:min-h-96 sm:text-base'
									placeholder={PLACEHOLDERS.GENERAL.DOCUMENT_CONTENT.replace(
										'{title}',
										title.toLowerCase()
									)}
									value={content || templateContent || ''}
									contentPadding='sm'
									onChange={handleContentChange}
									id={inputId}
								/>
							</div>
						) : (
							<DocumentPreview
								content={content}
								documentType={isCoverLetter ? 'cover-letter' : 'resume'}
								fontSize={fontSize || [11, 'pt']}
							/>
						)
					) : (
						<div className='print-document bg-gray border-light-gray border'>
							<TipTapEditor
								componentName='DocumentContentTipTapEditor'
								className='min-h-64 w-full font-mono sm:min-h-96 sm:text-base'
								value={content || templateContent || ''}
								placeholder={PLACEHOLDERS.GENERAL.DOCUMENT_CONTENT.replace(
									'{title}',
									title.toLowerCase()
								)}
								contentPadding='sm'
								onChange={handleContentChange}
								id={inputId}
							/>
						</div>
					)}
				</div>
			) : (
				<DocumentPreview
					content={content}
					documentType={documentType}
					fontSize={fontSize || [11, 'pt']}
				/>
			)}
		</div>
	);
});
