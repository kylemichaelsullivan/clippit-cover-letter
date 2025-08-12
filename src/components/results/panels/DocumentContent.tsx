'use client';

import { memo } from 'react';
import clsx from 'clsx';

import { MarkdownInput, Checkbox } from '@/components/ui/input';
import {
	StyledMarkdownPreview,
	FormattedPreview,
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
};

export const DocumentContent = memo(function DocumentContent({
	title,
	content,
	onContentChange,
	isEditable = false,
	isGenerating = false,
	className,
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
			<div className='page-header pb-4 text-center'>
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
		<div className={clsx('DocumentContent', className)}>
			<label
				htmlFor={inputId}
				className='DocumentContentTitle flex items-center justify-between pb-4 text-lg font-semibold text-black'
			>
				<span>{title}</span>
			</label>
			{isSkills && (
				<div className='pb-4'>
					<Checkbox
						checked={includeSkillGroupNames}
						onChange={setIncludeSkillGroupNames}
						label='Include Group Names'
						className='text-sm'
					/>
				</div>
			)}
			{isEditable || isGenerating ? (
				<MarkdownInput
					id={inputId}
					value={isGenerating ? getGeneratingText(title) : content}
					onChange={onContentChange || (() => {})}
					placeholder={PLACEHOLDERS.GENERAL.DOCUMENT_CONTENT.replace(
						'{title}',
						title.toLowerCase(),
					)}
					componentName='DocumentContentMarkdownInput'
					readOnly={isGenerating}
					className={isGenerating ? 'text-light-gray' : ''}
				/>
			) : isSkills ? (
				<FormattedPreview
					content={content}
					componentName='DocumentContentFormattedPreview'
					isGenerating={isGenerating}
					isSkills={true}
					title={title}
				/>
			) : (
				<div
					className={`print-content rounded-lg p-4 ${isCoverLetter || isResume ? 'print-document' : 'border-light-gray border bg-white'}`}
				>
					{renderPageHeader()}
					<StyledMarkdownPreview
						content={content}
						componentName='DocumentContentStyledPreview'
						isGenerating={isGenerating}
						title={title}
						className='p-0'
						isCompact={isCoverLetter || isResume}
						isPrintDocument={isCoverLetter || isResume}
					/>
				</div>
			)}
		</div>
	);
});
