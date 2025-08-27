'use client';

import { memo, type ReactNode } from 'react';
import clsx from 'clsx';

import { TipTapEditor } from '@/components/ui/input';
import { DocumentPreview } from '@/components/ui/display';
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
	documentType?: 'cover-letter' | 'resume';
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
	documentType,
}: DocumentContentProps) {
	const { candidateDetails } = useCandidateStore();
	const isCoverLetter = documentType === 'cover-letter';
	const isResume = documentType === 'resume';
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

	return (
		<div className={clsx('DocumentContent flex flex-col gap-4', className)}>
			<div className='xs:flex-row flex flex-col items-center justify-between'>
				<label
					htmlFor={inputId}
					className='DocumentContentTitle flex items-center justify-between text-lg font-semibold text-black'
				>
					<span>{title}</span>
				</label>
				{fontSizeInput ? (
					<div className='flex items-center justify-between'>
						{fontSizeInput}
					</div>
				) : null}
			</div>
			{isGenerating ? (
				<div className='DocumentContentGenerating print-content print-document border-light-gray force-white-bg rounded-lg border p-4'>
					<div className='DocumentContentGeneratingText text-light-gray min-h-64 w-full p-4 font-mono sm:min-h-96 sm:text-base'>
						{getGeneratingText(title)}
					</div>
				</div>
			) : isEditable ? (
				<div className='flex flex-col gap-4'>
					<TipTapEditor
						className='print-document min-h-64 w-full font-mono sm:min-h-96 sm:text-base'
						componentName='DocumentContentTipTapEditor'
						value={content}
						placeholder={PLACEHOLDERS.GENERAL.DOCUMENT_CONTENT.replace(
							'{title}',
							title.toLowerCase(),
						)}
						onChange={onContentChange || (() => {})}
						id={inputId}
						contentPadding='sm'
					/>
					{isResume || isCoverLetter ? (
						<div className='bg-gray rounded-lg p-4'>
							<DocumentPreview
								content={content}
								candidateDetails={candidateDetails}
								fontSize={fontSize || 11}
								className='rounded-lg'
								documentType={isCoverLetter ? 'cover-letter' : 'resume'}
							/>
						</div>
					) : (
						<div
							className={`print-content print-document border-light-gray force-white-bg rounded-lg border p-4`}
						>
							{renderPageHeader()}
							<div className='p-0'>
								{renderHtmlContent(content, candidateDetails)}
							</div>
						</div>
					)}
				</div>
			) : isResume || isCoverLetter ? (
				<div className='bg-gray rounded-lg p-4'>
					<DocumentPreview
						content={content}
						candidateDetails={candidateDetails}
						fontSize={fontSize || 11}
						className='rounded-lg'
						documentType={isCoverLetter ? 'cover-letter' : 'resume'}
					/>
				</div>
			) : (
				<div
					className={`print-content print-document border-light-gray force-white-bg rounded-lg border p-4`}
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
