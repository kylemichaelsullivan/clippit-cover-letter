'use client';

import { memo } from 'react';

import { DocumentSelectionControls } from '@/components/results/display';
import { TabTitle } from '@/components/ui';
import { EmptyState } from '@/components/ui/feedback';
import {
	useAppStore,
	useCandidateStore,
	useJobStore,
	usePhaseStore,
	useResumeStore,
	useSkillsStore,
	useTemplatesStore,
} from '@/lib/stores';
import { useGenerationConfirmations } from '@/lib/hooks';

import { CoverLetterSection, GenerationConfirmations, ResumeSection } from './';

export const PreviewContent = memo(function PreviewContent() {
	const { currentPhase } = usePhaseStore();
	const { candidateDetails } = useCandidateStore();
	const { jobDetails } = useJobStore();
	const { coverLetterTemplate } = useTemplatesStore();
	const { includeCoverLetter, includeResume } = useAppStore();
	const { resumeDetails } = useResumeStore();
	const { skills } = useSkillsStore();

	const generationConfirmations = useGenerationConfirmations({
		candidateDetails,
		coverLetterTemplate,
		jobDetails,
		includeCoverLetter,
		includeSkills: false,
		skills,
	});

	if (currentPhase !== 'preview') {
		return null;
	}

	const hasData = candidateDetails && jobDetails;
	const hasSelectedDocuments = includeCoverLetter || includeResume;

	return (
		<>
			<div className='PreviewContent flex flex-col gap-12'>
				<div className='flex items-center justify-between'>
					<TabTitle title='Preview' componentName='PreviewContentTitle' />
				</div>
				<DocumentSelectionControls />
				<div className='flex flex-col gap-4'>
					{!hasData && <EmptyState variant='no-data' />}

					{hasData && !hasSelectedDocuments && (
						<EmptyState variant='no-documents-selected' />
					)}

					{hasData && hasSelectedDocuments && (
						<div className='flex flex-col gap-8'>
							<CoverLetterSection
								candidateDetails={candidateDetails}
								jobDetails={jobDetails}
								skills={skills}
								includeCoverLetter={includeCoverLetter}
								coverLetterTemplate={coverLetterTemplate}
							/>

							<ResumeSection
								candidateDetails={candidateDetails}
								jobDetails={jobDetails}
								skills={skills}
								includeResume={includeResume}
								resumeDetails={resumeDetails}
							/>
						</div>
					)}
				</div>
			</div>

			<GenerationConfirmations
				candidateDetails={candidateDetails}
				jobDetails={jobDetails}
				skills={skills}
				coverLetterTemplate={coverLetterTemplate}
				includeSkills={false}
				includeCoverLetter={includeCoverLetter}
				generationConfirmations={generationConfirmations}
			/>
		</>
	);
});
