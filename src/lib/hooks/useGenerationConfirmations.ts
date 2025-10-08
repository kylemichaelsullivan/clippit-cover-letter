import { useState } from 'react';

import { useTemplatesStore, useSkillsStore } from '@/lib/stores';
import { generateDocuments } from '@/lib/documentGeneration';
import { useGenerationTimeout } from './useGenerationTimeout';

type UseGenerationConfirmationsProps = {
	candidateDetails: any;
	coverLetterTemplate: string;
	includeCoverLetter: boolean;
	jobDetails: any;
	skills: any;
};

export const useGenerationConfirmations = ({
	candidateDetails,
	coverLetterTemplate,
	includeCoverLetter,
	jobDetails,
	skills,
}: UseGenerationConfirmationsProps) => {
	const {
		generatedCoverLetter,
		setGeneratedCoverLetter,
		isGenerating,
		setIsGenerating,
	} = useTemplatesStore();

	const {
		generatedSkills,
		generateSkills,
		isGeneratingSkills,
		setIsGeneratingSkills,
		includeSkillGroupNames,
	} = useSkillsStore();

	const [showCoverLetterConfirmation, setShowCoverLetterConfirmation] =
		useState(false);
	const [showSkillsConfirmation, setShowSkillsConfirmation] = useState(false);

	const performCoverLetterGeneration = async () => {
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
			});

			setGeneratedCoverLetter(result.coverLetter);
		} catch (error) {
			console.error('Error generating cover letter:', error);
			setGeneratedCoverLetter(
				'Error generating cover letter. Please try again.',
			);
		} finally {
			setIsGenerating(false);
		}
	};

	const performSkillsGeneration = async () => {
		await generateSkills();
	};

	// Auto-reset if skills generation gets stuck for more than 60 seconds
	useGenerationTimeout({
		isGenerating: isGeneratingSkills,
		setIsGenerating: setIsGeneratingSkills,
		timeoutMessage: 'Skills generation timed out. Please try again.',
	});

	const handleGenerateCoverLetter = async () => {
		if (!includeCoverLetter) {
			return;
		}

		if (generatedCoverLetter && generatedCoverLetter.trim() !== '') {
			setShowCoverLetterConfirmation(true);
			return;
		}

		await performCoverLetterGeneration();
	};

	const handleGenerateSkills = async () => {
		const hasExistingSkills = generatedSkills && generatedSkills.trim() !== '';

		if (hasExistingSkills) {
			setShowSkillsConfirmation(true);
			return;
		}

		await performSkillsGeneration();
	};

	return {
		showCoverLetterConfirmation,
		setShowCoverLetterConfirmation,
		showSkillsConfirmation,
		setShowSkillsConfirmation,
		performCoverLetterGeneration,
		performSkillsGeneration,
		handleGenerateCoverLetter,
		handleGenerateSkills,
		isGenerating,
	};
};
