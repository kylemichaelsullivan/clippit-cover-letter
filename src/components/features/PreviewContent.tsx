'use client';

import { memo } from 'react';

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

import {
	CoverLetterSection,
	GenerationConfirmations,
	PreviewLayout,
	ResumeSection,
} from './';

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
		skills,
	});

	if (currentPhase !== 'preview') {
		return null;
	}

	const hasData = Boolean(candidateDetails && jobDetails);
	const hasSelectedDocuments = includeCoverLetter || includeResume;

	return (
		<>
			<PreviewLayout
				hasData={hasData}
				hasSelectedDocuments={hasSelectedDocuments}
			>
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
			</PreviewLayout>

			<GenerationConfirmations
				candidateDetails={candidateDetails}
				jobDetails={jobDetails}
				skills={skills}
				coverLetterTemplate={coverLetterTemplate}
				includeCoverLetter={includeCoverLetter}
				generationConfirmations={generationConfirmations}
			/>
		</>
	);
});
