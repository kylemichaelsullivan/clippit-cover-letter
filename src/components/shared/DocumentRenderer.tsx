'use client';

import { memo } from 'react';

import { DocumentSection } from '@/components/results/panels';
import { EmptyState } from '@/components/ui/feedback';
import { FontSizeInput } from '@/components/ui/input';
import { useAppStore, useTemplatesStore } from '@/lib/stores';

type DocumentRendererProps = {
	className?: string;
	showActions?: boolean;
	showFontSizeControl?: boolean;
	emptyStateVariant?: 'no-results' | 'no-data';
};

export const DocumentRenderer = memo(function DocumentRenderer({
	className,
	showActions = true,
	showFontSizeControl = true,
	emptyStateVariant = 'no-results',
}: DocumentRendererProps) {
	const {
		includeCoverLetter,
		includeResume,
		coverLetterFontSize,
		resumeFontSize,
		setCoverLetterFontSize,
		setResumeFontSize,
	} = useAppStore();
	const { generatedCoverLetter, generatedResume } = useTemplatesStore();

	const hasSelectedDocuments = includeCoverLetter || includeResume;
	const hasGeneratedContent =
		(includeCoverLetter && generatedCoverLetter) ||
		(includeResume && generatedResume);

	if (!hasSelectedDocuments) {
		return <EmptyState variant={emptyStateVariant} />;
	}

	if (hasSelectedDocuments && !hasGeneratedContent) {
		return <EmptyState variant='no-data' />;
	}

	return (
		<div className={`DocumentRenderer flex flex-col gap-6 ${className || ''}`}>
			<DocumentSection
				documentType='cover-letter'
				title='Cover Letter'
				content={generatedCoverLetter}
				fontSize={coverLetterFontSize}
				showActions={showActions}
				headerElement={
					showFontSizeControl ? (
						<FontSizeInput
							value={coverLetterFontSize}
							onChange={setCoverLetterFontSize}
							documentType='cover-letter'
							label='Base Font'
							ariaLabel='Base font size for cover letter'
						/>
					) : undefined
				}
				className={includeCoverLetter && generatedCoverLetter ? '' : 'hidden'}
			/>

			<DocumentSection
				documentType='resume'
				title='Resume'
				content={generatedResume}
				fontSize={resumeFontSize}
				showActions={showActions}
				headerElement={
					showFontSizeControl ? (
						<FontSizeInput
							documentType='resume'
							value={resumeFontSize}
							label='Base Font'
							ariaLabel='Base font size for resume'
							onChange={setResumeFontSize}
						/>
					) : undefined
				}
				className={includeResume && generatedResume ? '' : 'hidden'}
			/>
		</div>
	);
});
