'use client';

import { memo } from 'react';

import { useGenerationTimeout } from '@/lib/hooks/useGenerationTimeout';
import {
	useAppStore,
	useCandidateStore,
	useJobStore,
	usePhaseStore,
	useResumeStore,
	useSkillsStore,
	useTemplatesStore,
} from '@/lib/stores';

import { DocumentGenerationButton } from './DocumentGenerationButton';
import { DocumentGenerationService } from './DocumentGenerationService';

export const DocumentGenerator = memo(function DocumentGenerator() {
	const { currentPhase } = usePhaseStore();
	const { includeCoverLetter, includeResume } = useAppStore();
	const { jobDetails } = useJobStore();
	const {
		coverLetterTemplate,
		isGenerating,
		setIsGenerating,
		setGeneratedCoverLetter,
		setGeneratedResume,
	} = useTemplatesStore();
	const { candidateDetails } = useCandidateStore();
	const { resumeDetails } = useResumeStore();
	const { skills, includeSkillGroupNames } = useSkillsStore();

	useGenerationTimeout({
		isGenerating,
		setIsGenerating,
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

		setIsGenerating(true);

		if (includeCoverLetter) {
			await generationService.generateCoverLetter();
		}
		if (includeResume) {
			await generationService.generateResume();
		}

		setIsGenerating(false);
	};

	if (currentPhase !== 'generate') {
		return null;
	}

	return (
		<div className='DocumentGenerator'>
			<DocumentGenerationButton
				isGenerating={isGenerating}
				onClick={handleGenerateDocuments}
			/>
		</div>
	);
});
