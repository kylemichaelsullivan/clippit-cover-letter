'use client';

import { memo } from 'react';

import { DocumentSelectionControls } from '@/components/results/display';
import { TabTitle } from '@/components/ui';
import {
	EmptyState,
	SkillsNotConfiguredMessage,
} from '@/components/ui/feedback';
import {
	useAppStore,
	useJobStore,
	useTemplatesStore,
	useCandidateStore,
	usePhaseStore,
	useSkillsStore,
} from '@/lib/stores';
import { useGenerationConfirmations } from '@/lib/hooks';

import {
	CoverLetterSection,
	DocumentSection,
	ResumeSection,
	GenerationConfirmations,
} from './';

export const PreviewContent = memo(function PreviewContent() {
	const { currentPhase } = usePhaseStore();
	const { candidateDetails } = useCandidateStore();
	const { jobDetails } = useJobStore();
	const { coverLetterTemplate, resumeTemplate } = useTemplatesStore();
	const { includeCoverLetter, includeResume } = useAppStore();
	const { skills, includeSkills, isGeneratingSkills, generatedSkills } =
		useSkillsStore();

	const generationConfirmations = useGenerationConfirmations({
		candidateDetails,
		jobDetails,
		skills,
		coverLetterTemplate,
		resumeTemplate,
		includeSkills,
		includeCoverLetter,
		includeResume,
	});

	const { handleGenerateSkills } = generationConfirmations;

	if (currentPhase !== 'preview') {
		return null;
	}

	const hasData = candidateDetails && jobDetails;
	const hasSelectedDocuments =
		includeSkills || includeCoverLetter || includeResume;

	const skillsContent = generatedSkills || '';

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
							{includeSkills && (
								<DocumentSection
									title='Skills Summary'
									content={skillsContent}
									isEditable={false}
									isGenerating={isGeneratingSkills}
									onGenerate={handleGenerateSkills}
									componentName='GenerateSkillsButton'
									generateTitle='Generate Skills'
									fallbackMessage={<SkillsNotConfiguredMessage />}
									hasContent={
										!!generatedSkills && generatedSkills.trim() !== ''
									}
									disabled={
										!skills?.groups?.some((group) => group.skills.length > 0)
									}
								/>
							)}

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
								resumeTemplate={resumeTemplate}
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
				resumeTemplate={resumeTemplate}
				includeSkills={includeSkills}
				includeCoverLetter={includeCoverLetter}
				includeResume={includeResume}
				generationConfirmations={generationConfirmations}
			/>
		</>
	);
});
