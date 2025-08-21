import { useState } from 'react';

import { useTemplatesStore, useSkillsStore } from '@/lib/stores';
import { generateDocuments } from '@/lib/documentGeneration';

type UseResumeGenerationProps = {
	candidateDetails: any;
	jobDetails: any;
	skills: any;
	includeResume: boolean;
	resumeDetails?: {
		education: any[];
		experience: any[];
		summary: string;
	};
};

export const useResumeGeneration = ({
	candidateDetails,
	includeResume,
	jobDetails,
	resumeDetails,
	skills,
}: UseResumeGenerationProps) => {
	const {
		generatedResume,
		setGeneratedResume,
		isGeneratingResume,
		setIsGeneratingResume,
	} = useTemplatesStore();
	const { includeSkillGroupNames } = useSkillsStore();

	const [showConfirmation, setShowConfirmation] = useState(false);

	const performGeneration = async () => {
		setIsGeneratingResume(true);

		try {
			const result = await generateDocuments({
				includeCoverLetter: false,
				includeResume: true,
				candidateDetails,
				coverLetterTemplate: '',
				jobDetails,
				resumeDetails,
				skills,
				includeSkillGroupNames,
			});

			setGeneratedResume(result.resume);
		} catch (error) {
			console.error('Error generating resume:', error);
			setGeneratedResume('Error generating resume. Please try again.');
		} finally {
			setIsGeneratingResume(false);
		}
	};

	const handleGenerate = async () => {
		if (!includeResume) {
			return;
		}

		if (generatedResume && generatedResume.trim() !== '') {
			setShowConfirmation(true);
			return;
		}

		await performGeneration();
	};

	return {
		generatedResume,
		setGeneratedResume,
		isGeneratingResume,
		showConfirmation,
		setShowConfirmation,
		performGeneration,
		handleGenerate,
	};
};
