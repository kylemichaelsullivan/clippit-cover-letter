'use client';

import { memo } from 'react';

import { DocumentContent } from '@/components/documents/panels';
import { ActionButtons } from '@/components/documents/actions';
import { EmptyState } from '@/components/ui/feedback';
import { FontSizeInput } from '@/components/ui/input';
import {
	useAppStore,
	useTemplatesStore,
	useCandidateStore,
} from '@/lib/stores';

type DocumentsStateManagerProps = {
	className?: string;
};

export const DocumentsStateManager = memo(function DocumentsStateManager({
	className,
}: DocumentsStateManagerProps) {
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
		return <EmptyState variant='no-documents-selected' />;
	}

	if (hasSelectedDocuments && !hasGeneratedContent) {
		return <EmptyState variant='no-data' />;
	}

	return (
		<div
			className={`DocumentsStateManager flex flex-col gap-6 ${className || ''}`}
		>
			<div
				className={includeCoverLetter && generatedCoverLetter ? '' : 'hidden'}
			>
				<div className='flex flex-col gap-4'>
					<DocumentContent
						title='Cover Letter'
						content={generatedCoverLetter}
						isEditable={false}
					/>
					<ActionButtons
						text={generatedCoverLetter}
						filename='cover-letter'
						documentType='Cover Letter'
						candidateDetails={candidateDetails}
					/>
				</div>
			</div>

			<div className={includeResume && generatedResume ? '' : 'hidden'}>
				<div className='flex flex-col gap-4'>
					<DocumentContent
						title='Resume'
						content={generatedResume}
						isEditable={false}
						fontSize={resumeFontSize}
						fontSizeInput={
							<FontSizeInput
								value={resumeFontSize}
								onChange={setResumeFontSize}
							/>
						}
					/>
					<ActionButtons
						text={generatedResume}
						filename='resume'
						documentType='Resume'
						candidateDetails={candidateDetails}
						fontSize={resumeFontSize}
					/>
				</div>
			</div>
		</div>
	);
});
