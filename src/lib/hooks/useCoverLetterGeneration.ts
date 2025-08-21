import { useState } from 'react';

import { useTemplatesStore, useSkillsStore } from '@/lib/stores';
import { generateDocuments } from '@/lib/documentGeneration';

type UseCoverLetterGenerationProps = {
	candidateDetails: any;
	jobDetails: any;
	skills: any;
	includeCoverLetter: boolean;
	coverLetterTemplate: string;
};

export const useCoverLetterGeneration = ({
	candidateDetails,
	includeCoverLetter,
	jobDetails,
	coverLetterTemplate,
	skills,
}: UseCoverLetterGenerationProps) => {
	const {
		generatedCoverLetter,
		setGeneratedCoverLetter,
		isGeneratingCoverLetter,
		setIsGeneratingCoverLetter,
	} = useTemplatesStore();
	const { includeSkillGroupNames } = useSkillsStore();

	const [showConfirmation, setShowConfirmation] = useState(false);

	const performGeneration = async () => {
		setIsGeneratingCoverLetter(true);

		try {
			const result = await generateDocuments({
				includeCoverLetter: true,
				includeResume: false,
				candidateDetails,
				coverLetterTemplate,
				jobDetails,
				skills,
				includeSkillGroupNames,
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
