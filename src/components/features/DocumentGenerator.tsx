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
import { useGenerationTimeout } from '@/lib/hooks/useGenerationTimeout';

import { DocumentGenerationButton } from './DocumentGenerationButton';
import { DocumentGenerationService } from './DocumentGenerationService';

export const DocumentGenerator = memo(function DocumentGenerator() {
	const { currentPhase } = usePhaseStore();
	const { includeCoverLetter, includeResume } = useAppStore();
	const { jobDetails } = useJobStore();
	const {
		coverLetterTemplate,
		isGeneratingCoverLetter,
		isGeneratingResume,
		setIsGeneratingCoverLetter,
		setIsGeneratingResume,
		setGeneratedCoverLetter,
		setGeneratedResume,
	} = useTemplatesStore();
	const { candidateDetails } = useCandidateStore();
	const { resumeDetails } = useResumeStore();
	const { skills, includeSkillGroupNames } = useSkillsStore();

	useGenerationTimeout({
		isGenerating: isGeneratingCoverLetter || isGeneratingResume,
		setIsGenerating: () => {
			setIsGeneratingCoverLetter(false);
			setIsGeneratingResume(false);
		},
		timeoutMessage: 'Document generation timed out. Please try again.',
	});

	const generationService = DocumentGenerationService({
		includeCoverLetter,
		includeResume,
		coverLetterTemplate,
		candidateDetails,
		jobDetails,
		resumeDetails,
		skills,
		includeSkillGroupNames,
		onCoverLetterGenerated: (content: string) => {
			setGeneratedCoverLetter(content);
		},
		onResumeGenerated: (content: string) => {
			setGeneratedResume(content);
		},
		onCoverLetterError: (error: string) => {
			setGeneratedCoverLetter(error);
		},
		onResumeError: (error: string) => {
			setGeneratedResume(error);
		},
	});

	const handleGenerateDocuments = async () => {
		if (!includeCoverLetter && !includeResume) {
			return;
		}

		if (includeCoverLetter) {
			setIsGeneratingCoverLetter(true);
			await generationService.generateCoverLetter();
			setIsGeneratingCoverLetter(false);
		}
		if (includeResume) {
			setIsGeneratingResume(true);
			await generationService.generateResume();
			setIsGeneratingResume(false);
		}
	};

	if (currentPhase !== 'generate') {
		return null;
	}

	return (
		<div className='DocumentGenerator'>
			<DocumentGenerationButton
				isGenerating={isGeneratingCoverLetter || isGeneratingResume}
				onClick={handleGenerateDocuments}
			/>
		</div>
	);
});
