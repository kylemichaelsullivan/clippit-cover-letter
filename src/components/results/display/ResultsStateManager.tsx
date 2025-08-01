'use client';

import { memo } from 'react';

import { DocumentContent } from '@/components/results/panels';
import { ActionButtons, CopyButton } from '@/components/results/actions';
import { EmptyState } from '@/components/ui/feedback';
import { useAppStore, useTemplatesStore, useSkillsStore } from '@/lib/stores';

type ResultsStateManagerProps = {
	className?: string;
};

export const ResultsStateManager = memo(function ResultsStateManager({
	className,
}: ResultsStateManagerProps) {
	const { includeCoverLetter, includeResume } = useAppStore();
	const { generatedCoverLetter, generatedResume } = useTemplatesStore();
	const { generatedSkills, includeSkills } = useSkillsStore();

	const hasSelectedDocuments =
		includeSkills || includeCoverLetter || includeResume;
	const hasGeneratedContent =
		(includeSkills && generatedSkills) ||
		(includeCoverLetter && generatedCoverLetter) ||
		(includeResume && generatedResume);

	if (!hasSelectedDocuments) {
		return <EmptyState variant='no-results' />;
	}

	if (hasSelectedDocuments && !hasGeneratedContent) {
		return <EmptyState variant='no-data' />;
	}

	return (
		<div
			className={`ResultsStateManager flex flex-col gap-6 ${className || ''}`}
		>
			<div className={includeSkills && generatedSkills ? '' : 'hidden'}>
				<div className='flex flex-col gap-4'>
					<DocumentContent
						title='Skills Summary'
						content={generatedSkills}
						isEditable={false}
					/>
					<CopyButton text={generatedSkills} />
				</div>
			</div>

			<div
				className={includeCoverLetter && generatedCoverLetter ? '' : 'hidden'}
			>
				<div className='flex flex-col gap-4'>
					<DocumentContent
						title='Cover Letter'
						content={generatedCoverLetter}
						isEditable={false}
					/>
					<ActionButtons text={generatedCoverLetter} filename='cover-letter' />
				</div>
			</div>

			<div className={includeResume && generatedResume ? '' : 'hidden'}>
				<div className='flex flex-col gap-4'>
					<DocumentContent
						title='Resume'
						content={generatedResume}
						isEditable={false}
					/>
					<ActionButtons text={generatedResume} filename='resume' />
				</div>
			</div>
		</div>
	);
});
