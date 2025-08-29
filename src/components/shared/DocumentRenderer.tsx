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
		resumeFontSize,
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
						title='Cover Letter'
						documentType='cover-letter'
						content={generatedCoverLetter}
						isEditable={false}
					/>
					{showActions && (
						<ActionButtons
							text={generatedCoverLetter}
							filename='cover-letter'
							documentType='Cover Letter'
							candidateDetails={candidateDetails}
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
								/>
							) : undefined
						}
						isEditable={false}
					/>
					{showActions && (
						<ActionButtons
							filename='resume'
							documentType='Resume'
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
