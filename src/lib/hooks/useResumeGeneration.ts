import { useState } from 'react';

import { useTemplatesStore } from '@/lib/stores';
import { generateDocuments } from '@/lib/documentGeneration';

type UseResumeGenerationProps = {
	candidateDetails: any;
	jobDetails: any;
	skills: any;
	includeResume: boolean;
	resumeDetails?: {
		education: any[];
		experience: string;
		summary: string;
	};
	resumeTemplate: string;
};

export const useResumeGeneration = ({
	candidateDetails,
	includeResume,
	jobDetails,
	resumeDetails,
	resumeTemplate,
	skills,
}: UseResumeGenerationProps) => {
	const {
		generatedResume,
		setGeneratedResume,
		isGeneratingResume,
		setIsGeneratingResume,
	} = useTemplatesStore();

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
				resumeTemplate,
				skills,
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
