'use client';

import { memo, type ReactNode, useState } from 'react';
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
	onContentChange?: (content: string) => void;
	isEditable?: boolean;
	isGenerating?: boolean;
	className?: string;
	fontSize?: number;
	fontSizeInput?: ReactNode;
	headerElement?: ReactNode;
};

export const DocumentContent = memo(function DocumentContent({
	title,
	content,
	onContentChange,
	isEditable = false,
	isGenerating = false,
	className,
	fontSize,
	fontSizeInput,
	headerElement,
}: DocumentContentProps) {
	const { candidateDetails } = useCandidateStore();
	const [isTipTapView, setIsTipTapView] = useState(false);
	const isCoverLetter = title.toLowerCase().includes('cover letter');
	const isResume = title.toLowerCase().includes('resume');
	const inputId = `document-content-${title.toLowerCase().replace(/\s+/g, '-')}`;

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
				<div className='ResultsDocumentContentGenerating print-content print-document border-light-gray force-white-bg rounded-lg border'>
					<div className='ResultsDocumentContentGeneratingText text-light-gray min-h-64 w-full p-4 font-mono sm:min-h-96 sm:text-base'>
						{getGeneratingText(title)}
					</div>
				</div>
			) : isEditable ? (
				<div className='flex flex-col gap-4'>
					{isResume || isCoverLetter ? (
						isTipTapView ? (
							<div className='print-document border-light-gray force-white-bg rounded-lg border'>
								<TipTapEditor
									value={content}
									onChange={onContentChange || (() => {})}
									placeholder={PLACEHOLDERS.GENERAL.DOCUMENT_CONTENT.replace(
										'{title}',
										title.toLowerCase(),
									)}
									id={inputId}
									componentName='DocumentContentTipTapEditor'
									className='min-h-64 w-full font-mono sm:min-h-96 sm:text-base'
									contentPadding='sm'
								/>
							</div>
						) : (
							<div className='print-content print-document border-light-gray force-white-bg rounded-lg border p-2'>
								<DocumentPreview
									className='rounded-lg'
									content={content}
									candidateDetails={candidateDetails}
									fontSize={fontSize || 11}
								/>
							</div>
						)
					) : (
						<div className='print-document border-light-gray force-white-bg rounded-lg border'>
							<TipTapEditor
								value={content}
								onChange={onContentChange || (() => {})}
								placeholder={PLACEHOLDERS.GENERAL.DOCUMENT_CONTENT.replace(
									'{title}',
									title.toLowerCase(),
								)}
								id={inputId}
								componentName='DocumentContentTipTapEditor'
								className='min-h-64 w-full font-mono sm:min-h-96 sm:text-base'
								contentPadding='sm'
							/>
						</div>
					)}
				</div>
			) : isResume || isCoverLetter ? (
				<div className='print-content print-document border-light-gray force-white-bg rounded-lg border p-2'>
					<DocumentPreview
						className='rounded-lg'
						content={content}
						candidateDetails={candidateDetails}
						fontSize={fontSize || 11}
					/>
				</div>
			) : (
				<div
					className={`print-content print-document border-light-gray force-white-bg rounded-lg border p-2`}
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
