import { useState } from 'react';

import { useTemplatesStore } from '@/lib/stores';
import { generateDocuments } from '@/lib/documentGeneration';

type UseCoverLetterGenerationProps = {
	candidateDetails: any;
	jobDetails: any;
	skills: any;
	coverLetterTemplate: string;
	includeCoverLetter: boolean;
};

export const useCoverLetterGeneration = ({
	candidateDetails,
	jobDetails,
	skills,
	coverLetterTemplate,
	includeCoverLetter,
}: UseCoverLetterGenerationProps) => {
	const {
		generatedCoverLetter,
		setGeneratedCoverLetter,
		isGeneratingCoverLetter,
		setIsGeneratingCoverLetter,
	} = useTemplatesStore();

	const [showConfirmation, setShowConfirmation] = useState(false);

	const performGeneration = async () => {
		setIsGeneratingCoverLetter(true);

		try {
			const result = await generateDocuments({
				includeResume: false,
				includeCoverLetter: true,
				resumeTemplate: '',
				coverLetterTemplate,
				candidateDetails,
				jobDetails,
				skills,
			});

			setGeneratedCoverLetter(result.coverLetter);
		} catch (error) {
			console.error('Error generating cover letter:', error);
			setGeneratedCoverLetter(
				'Error generating cover letter. Please try again.',
			);
		} finally {
			setIsGeneratingCoverLetter(false);
		}
	};

	const handleGenerate = async () => {
		if (!includeCoverLetter) {
			return;
		}

		if (generatedCoverLetter && generatedCoverLetter.trim() !== '') {
			setShowConfirmation(true);
			return;
		}

		await performGeneration();
	};

	return {
		generatedCoverLetter,
		setGeneratedCoverLetter,
		isGeneratingCoverLetter,
		showConfirmation,
		setShowConfirmation,
		performGeneration,
		handleGenerate,
	};
};
