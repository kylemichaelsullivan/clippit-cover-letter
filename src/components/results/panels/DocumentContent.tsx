'use client';

import { memo, useState, useRef, useCallback, type ReactNode } from 'react';
import clsx from 'clsx';

import { DocumentPreview } from '@/components/ui/display';
import { TipTapEditor } from '@/components/ui/input';
import { ViewToggle } from '@/components/ui/buttons';
import { PLACEHOLDERS } from '@/config';
import { renderHtmlContent } from '@/lib/utils';
import { useCandidateStore } from '@/lib/stores';

type DocumentContentProps = {
	title: string;
	content: string;
	documentType?: 'cover-letter' | 'resume';
	className?: string;
	headerElement?: ReactNode;
	fontSize?: number;
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
	const { candidateDetails } = useCandidateStore();
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
					'</ul>',
				);

				if (cleanedContent !== lastContentRef.current) {
					lastContentRef.current = cleanedContent;
					onContentChange(cleanedContent);
				}
			}
		},
		[onContentChange],
	);

	if (content !== lastContentRef.current) {
		lastContentRef.current = content;
	}

	const getGeneratingText = (title: string) => {
		return `Generating ${title}…`;
	};

	const renderPageHeader = () => {
		if (!isCoverLetter && !isResume) return null;

		const { fullName, email, phone, linkedin, portfolio } = candidateDetails;
		const formattedLinkedin = linkedin ? `/in/${linkedin}` : '';
		const contactInfo = [email, phone, formattedLinkedin, portfolio]
			.filter(Boolean)
			.join(' | ');

		return (
			<div className='page-header text-center'>
				<h1 className='page-header-name text-2xl font-bold'>{fullName}</h1>
				{contactInfo && (
					<div className='page-header-contact text-sm font-light'>
						{contactInfo}
					</div>
				)}
			</div>
		);
	};

	const handleToggleView = () => {
		setIsTipTapView(!isTipTapView);
	};

	return (
		<div className={clsx('DocumentContent flex flex-col gap-4', className)}>
			<div className='xs:flex-row flex flex-col items-center justify-between'>
				<label
					htmlFor={inputId}
					className='DocumentContentTitle flex items-center justify-between text-lg font-semibold text-black'
				>
					<span>{title}</span>
				</label>
				<div className='flex items-center gap-3'>
					{headerElement}
					{fontSizeInput ? (
						<div className='flex items-center justify-between'>
							{fontSizeInput}
						</div>
					) : null}
					{isEditable && (isResume || isCoverLetter) && (
						<ViewToggle
							isTipTapView={isTipTapView}
							onToggle={handleToggleView}
						/>
					)}
				</div>
			</div>
			{isGenerating ? (
				<div className='ResultsDocumentContentGenerating print-content print-document border-light-gray force-white-bg border'>
					<div className='ResultsDocumentContentGeneratingText text-light-gray flex min-h-64 w-full items-center justify-center p-8 text-center font-mono sm:min-h-96 sm:text-base'>
						{getGeneratingText(title)}
					</div>
				</div>
			) : isEditable ? (
				<div className='flex flex-col gap-4'>
					{isResume || isCoverLetter ? (
						isTipTapView ? (
							<div className='print-document border-light-gray force-white-bg border'>
								<TipTapEditor
									componentName='DocumentContentTipTapEditor'
									className='min-h-64 w-full font-mono sm:min-h-96 sm:text-base'
									value={content || templateContent || ''}
									placeholder={PLACEHOLDERS.GENERAL.DOCUMENT_CONTENT.replace(
										'{title}',
										title.toLowerCase(),
									)}
									contentPadding='sm'
									id={inputId}
									onChange={handleContentChange}
								/>
							</div>
						) : (
							<div className='print-content print-document border-light-gray force-white-bg border p-2'>
								<DocumentPreview
									className='rounded-lg'
									documentType={isCoverLetter ? 'cover-letter' : 'resume'}
									content={content}
									candidateDetails={candidateDetails}
									fontSize={fontSize || 11}
								/>
							</div>
						)
					) : (
						<div className='print-document border-light-gray force-white-bg border'>
							<TipTapEditor
								componentName='DocumentContentTipTapEditor'
								className='min-h-64 w-full font-mono sm:min-h-96 sm:text-base'
								value={content || templateContent || ''}
								placeholder={PLACEHOLDERS.GENERAL.DOCUMENT_CONTENT.replace(
									'{title}',
									title.toLowerCase(),
								)}
								contentPadding='sm'
								id={inputId}
								onChange={handleContentChange}
							/>
						</div>
					)}
				</div>
			) : isResume || isCoverLetter ? (
				<div className='print-content print-document border-light-gray force-white-bg border p-2'>
					<DocumentPreview
						className='rounded-lg'
						documentType={isCoverLetter ? 'cover-letter' : 'resume'}
						content={content}
						candidateDetails={candidateDetails}
						fontSize={fontSize || 11}
					/>
				</div>
			) : (
				<div
					className={`print-content print-document border-light-gray force-white-bg border p-2`}
				>
					{renderPageHeader()}
					<div className='p-0'>
						{renderHtmlContent(content, candidateDetails)}
					</div>
				</div>
			)}
		</div>
	);
});
