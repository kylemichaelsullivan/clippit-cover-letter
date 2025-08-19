import { useState } from 'react';

import { useTemplatesStore, useSkillsStore } from '@/lib/stores';
import { generateDocuments } from '@/lib/documentGeneration';

type UseGenerationConfirmationsProps = {
	candidateDetails: any;
	coverLetterTemplate: string;
	includeCoverLetter: boolean;
	includeResume: boolean;
	includeSkills: boolean;
	jobDetails: any;
	resumeDetails?: {
		summary: string;
		experience: string;
		education: any[];
	};
	resumeTemplate: string;
	skills: any;
};

export const useGenerationConfirmations = ({
	candidateDetails,
	coverLetterTemplate,
	includeCoverLetter,
	includeResume,
	includeSkills,
	jobDetails,
	resumeDetails,
	resumeTemplate,
	skills,
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

	const [showCoverLetterConfirmation, setShowCoverLetterConfirmation] =
		useState(false);
	const [showResumeConfirmation, setShowResumeConfirmation] = useState(false);
	const [showSkillsConfirmation, setShowSkillsConfirmation] = useState(false);

	const performCoverLetterGeneration = async () => {
		setIsGeneratingCoverLetter(true);

		try {
			const result = await generateDocuments({
				includeCoverLetter: true,
				includeResume: false,
				candidateDetails,
				coverLetterTemplate,
				jobDetails,
				resumeTemplate: '',
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
				candidateDetails,
				coverLetterTemplate: '',
				includeCoverLetter: false,
				includeResume: true,
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
		showResumeConfirmation,
		setShowResumeConfirmation,
		showSkillsConfirmation,
		setShowSkillsConfirmation,
		performCoverLetterGeneration,
		performResumeGeneration,
		performSkillsGeneration,
		handleGenerateCoverLetter,
		handleGenerateResume,
		handleGenerateSkills,
		isGeneratingCoverLetter,
		isGeneratingResume,
	};
};
