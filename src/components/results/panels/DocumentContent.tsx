'use client';

import { memo, type ReactNode } from 'react';
import clsx from 'clsx';

import { MarkdownInput, Checkbox } from '@/components/ui/input';
import {
	StyledMarkdownPreview,
	FormattedPreview,
	DocumentPreview,
} from '@/components/ui/display';
import { PLACEHOLDERS } from '@/config';
import { useSkillsStore, useCandidateStore } from '@/lib/stores';

type DocumentContentProps = {
	title: string;
	content: string;
	onContentChange?: (content: string) => void;
	isEditable?: boolean;
	isGenerating?: boolean;
	className?: string;
	fontSize?: number;
	fontSizeInput?: ReactNode;
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
}: DocumentContentProps) {
	const { includeSkillGroupNames, setIncludeSkillGroupNames } =
		useSkillsStore();
	const { candidateDetails } = useCandidateStore();
	const isSkills = title.toLowerCase().includes('skills');
	const isCoverLetter = title.toLowerCase().includes('cover letter');
	const isResume = title.toLowerCase().includes('resume');
	const inputId = `document-content-${title.toLowerCase().replace(/\s+/g, '-')}`;

	const getGeneratingText = (title: string) => {
		return `Generating ${title}...`;
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
			<div className='flex flex-col justify-between sm:flex-row'>
				<label
					htmlFor={inputId}
					className='DocumentContentTitle flex items-center justify-between text-lg font-semibold text-black'
				>
					<span>{title}</span>
				</label>
				{isSkills ? (
					<div>
						<Checkbox
							checked={includeSkillGroupNames}
							onChange={setIncludeSkillGroupNames}
							label='Include Group Names'
							className='text-sm'
						/>
					</div>
				) : fontSizeInput ? (
					<div className='flex items-center justify-between'>
						{fontSizeInput}
					</div>
				) : null}
			</div>
			{isGenerating ? (
				<MarkdownInput
					id={inputId}
					value={getGeneratingText(title)}
					onChange={onContentChange || (() => {})}
					placeholder={PLACEHOLDERS.GENERAL.DOCUMENT_CONTENT.replace(
						'{title}',
						title.toLowerCase(),
					)}
					componentName='DocumentContentMarkdownInput'
					readOnly={true}
					className='text-light-gray'
				/>
			) : isEditable ? (
				<div className='flex flex-col gap-4'>
					<MarkdownInput
						id={inputId}
						value={content}
						onChange={onContentChange || (() => {})}
						placeholder={PLACEHOLDERS.GENERAL.DOCUMENT_CONTENT.replace(
							'{title}',
							title.toLowerCase(),
						)}
						componentName='DocumentContentMarkdownInput'
						readOnly={false}
					/>
					{/* Show processed preview below the editable input */}
					{isSkills ? (
						<FormattedPreview
							content={content}
							componentName='DocumentContentFormattedPreview'
							isGenerating={false}
							isSkills={true}
							title={title}
						/>
					) : isResume || isCoverLetter ? (
						<div className='bg-gray rounded-lg p-4'>
							<DocumentPreview
								content={content}
								candidateDetails={candidateDetails}
								fontSize={fontSize || 11}
								className='rounded-lg'
							/>
						</div>
					) : (
						<div
							className={`print-content border-light-gray rounded-lg border bg-white p-4`}
						>
							{renderPageHeader()}
							<StyledMarkdownPreview
								content={content}
								componentName='DocumentContentStyledPreview'
								isGenerating={false}
								title={title}
								className='p-0'
							/>
						</div>
					)}
				</div>
			) : isSkills ? (
				<FormattedPreview
					content={content}
					componentName='DocumentContentFormattedPreview'
					isGenerating={isGenerating}
					isSkills={true}
					title={title}
				/>
			) : isResume || isCoverLetter ? (
				<div className='bg-gray rounded-lg p-4'>
					<DocumentPreview
						content={content}
						candidateDetails={candidateDetails}
						fontSize={fontSize || 11}
						className='rounded-lg'
					/>
				</div>
			) : (
				<div
					className={`print-content border-light-gray rounded-lg border bg-white p-4`}
				>
					{renderPageHeader()}
					<StyledMarkdownPreview
						content={content}
						componentName='DocumentContentStyledPreview'
						isGenerating={isGenerating}
						title={title}
						className='p-0'
					/>
				</div>
			)}
		</div>
	);
});
