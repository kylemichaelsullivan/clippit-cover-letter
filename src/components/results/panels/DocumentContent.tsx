'use client';

import { memo } from 'react';
import clsx from 'clsx';

import { MarkdownInput, Checkbox } from '@/components/ui/input';
import { MarkdownPreview, FormattedPreview } from '@/components/ui/display';
import { PLACEHOLDERS } from '@/config';
import { useAppStore, useSkillsStore } from '@/lib/stores';

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
	const { previewViewMode } = useAppStore();
	const { includeSkillGroupNames, setIncludeSkillGroupNames } =
		useSkillsStore();
	const isSkills = title.toLowerCase().includes('skills');
	const inputId = `document-content-${title.toLowerCase().replace(/\s+/g, '-')}`;

	const getGeneratingText = (title: string) => {
		return `Generating ${title}...`;
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
				<div className='mb-4'>
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
					isSkills={isSkills}
					title={title}
				/>
			) : previewViewMode === 'markdown' ? (
				<MarkdownPreview
					content={content}
					componentName='DocumentContentMarkdownPreview'
					isGenerating={isGenerating}
					isSkills={isSkills}
				/>
			) : (
				<FormattedPreview
					content={content}
					componentName='DocumentContentFormattedPreview'
					isGenerating={isGenerating}
					isSkills={isSkills}
					title={title}
				/>
			)}
		</div>
	);
});
