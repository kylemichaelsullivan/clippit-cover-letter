import { useState } from 'react';

import { useTemplatesStore, useSkillsStore } from '@/lib/stores';
import { generateDocuments } from '@/lib/documentGeneration';

type UseGenerationConfirmationsProps = {
	candidateDetails: any;
	jobDetails: any;
	skills: any;
	coverLetterTemplate: string;
	resumeTemplate: string;
	includeCoverLetter: boolean;
	includeResume: boolean;
	includeSkills: boolean;
};

export const useGenerationConfirmations = ({
	candidateDetails,
	jobDetails,
	skills,
	coverLetterTemplate,
	resumeTemplate,
	includeCoverLetter,
	includeResume,
	includeSkills,
}: UseGenerationConfirmationsProps) => {
	const {
		generatedCoverLetter,
		setGeneratedCoverLetter,
		isGeneratingCoverLetter,
		setIsGeneratingCoverLetter,
		generatedResume,
		setGeneratedResume,
		isGeneratingResume,
		setIsGeneratingResume,
	} = useTemplatesStore();

	const { generatedSkills, generateSkills } = useSkillsStore();

	// Confirmation dialog states
	const [showCoverLetterConfirmation, setShowCoverLetterConfirmation] =
		useState(false);
	const [showResumeConfirmation, setShowResumeConfirmation] = useState(false);
	const [showSkillsConfirmation, setShowSkillsConfirmation] = useState(false);

	const performCoverLetterGeneration = async () => {
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

	const performResumeGeneration = async () => {
		setIsGeneratingResume(true);

		try {
			const result = await generateDocuments({
				includeResume: true,
				includeCoverLetter: false,
				resumeTemplate,
				coverLetterTemplate: '',
				candidateDetails,
				jobDetails,
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

	const performSkillsGeneration = async () => {
		await generateSkills();
	};

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

	const handleGenerateResume = async () => {
		if (!includeResume) {
			return;
		}

		if (generatedResume && generatedResume.trim() !== '') {
			setShowResumeConfirmation(true);
			return;
		}

		await performResumeGeneration();
	};

	const handleGenerateSkills = async () => {
		if (!includeSkills) {
			return;
		}

		// Check if there's existing generated skills content
		const hasExistingSkills = generatedSkills && generatedSkills.trim() !== '';

		if (hasExistingSkills) {
			setShowSkillsConfirmation(true);
			return;
		}

		// If no existing content, generate directly
		await performSkillsGeneration();
	};

	return {
		// Confirmation states
		showCoverLetterConfirmation,
		setShowCoverLetterConfirmation,
		showResumeConfirmation,
		setShowResumeConfirmation,
		showSkillsConfirmation,
		setShowSkillsConfirmation,
		// Generation functions
		performCoverLetterGeneration,
		performResumeGeneration,
		performSkillsGeneration,
		// Handler functions
		handleGenerateCoverLetter,
		handleGenerateResume,
		handleGenerateSkills,
		// Generation states
		isGeneratingCoverLetter,
		isGeneratingResume,
	};
};
