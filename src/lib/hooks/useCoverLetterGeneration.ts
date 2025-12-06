import { useState } from 'react';

import { generateDocuments } from '@/lib/documentGeneration';
import { useSkillsStore, useTemplatesStore } from '@/lib/stores';

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
		isGenerating,
		setIsGenerating,
	} = useTemplatesStore();
	const { includeSkillGroupNames, generatedSkills } = useSkillsStore();

	const [showConfirmation, setShowConfirmation] = useState(false);

	const performGeneration = async () => {
		setIsGenerating(true);

		try {
			const result = await generateDocuments({
				includeCoverLetter: true,
				includeResume: false,
				candidateDetails,
				coverLetterTemplate,
				jobDetails,
				skills,
				includeSkillGroupNames,
				generatedSkills,
			});

			setGeneratedCoverLetter(result.coverLetter);
		} catch (error) {
			console.error('Error generating cover letter:', error);
			setGeneratedCoverLetter(
				'Error generating cover letter. Please try again.'
			);
		} finally {
			setIsGenerating(false);
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
		isGenerating,
		showConfirmation,
		setShowConfirmation,
		performGeneration,
		handleGenerate,
	};
};
