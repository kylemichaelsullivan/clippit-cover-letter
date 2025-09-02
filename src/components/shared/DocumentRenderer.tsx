'use client';

import { memo } from 'react';

import { ActionButtons } from '@/components/results/actions';
import { DocumentContent } from '@/components/results/panels';
import { EmptyState } from '@/components/ui/feedback';
import { FontSizeInput } from '@/components/ui/input';
import {
	useAppStore,
	useTemplatesStore,
	useCandidateStore,
} from '@/lib/stores';

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
	const { candidateDetails } = useCandidateStore();

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
			<div
				className={includeCoverLetter && generatedCoverLetter ? '' : 'hidden'}
			>
				<div className='flex flex-col gap-4'>
					<DocumentContent
						documentType='cover-letter'
						title='Cover Letter'
						content={generatedCoverLetter}
						fontSize={coverLetterFontSize}
						fontSizeInput={
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
						isEditable={false}
					/>
					{showActions && (
						<ActionButtons
							text={generatedCoverLetter}
							documentType='cover-letter'
							filename='cover-letter'
							candidateDetails={candidateDetails}
							fontSize={coverLetterFontSize}
						/>
					)}
				</div>
			</div>

			<div className={includeResume && generatedResume ? '' : 'hidden'}>
				<div className='flex flex-col gap-4'>
					<DocumentContent
						title='Resume'
						documentType='resume'
						content={generatedResume}
						fontSize={resumeFontSize}
						fontSizeInput={
							showFontSizeControl ? (
								<FontSizeInput
									value={resumeFontSize}
									onChange={setResumeFontSize}
									documentType='resume'
									label='Base Font'
									ariaLabel='Base font size for resume'
								/>
							) : undefined
						}
						isEditable={false}
					/>
					{showActions && (
						<ActionButtons
							filename='resume'
							documentType='resume'
							candidateDetails={candidateDetails}
							text={generatedResume}
							fontSize={resumeFontSize}
						/>
					)}
				</div>
			</div>
		</div>
	);
});
