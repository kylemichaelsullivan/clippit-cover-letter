import { useCallback } from 'react';

import {
	useAppStore,
	useSkillsStore,
	useTemplatesStore,
	useCandidateStore,
	useJobStore,
} from '@/lib/stores';
import { generateDocuments } from '@/lib/documentGeneration';

export const useDocumentGeneration = () => {
	const { includeSkills, generateSkills, isGeneratingSkills, skills } =
		useSkillsStore();
	const { includeCoverLetter, includeResume } = useAppStore();
	const {
		coverLetterTemplate,
		resumeTemplate,
		setGeneratedCoverLetter,
		setGeneratedResume,
		setIsGeneratingCoverLetter,
		setIsGeneratingResume,
		isGeneratingCoverLetter,
		isGeneratingResume,
	} = useTemplatesStore();
	const { candidateDetails } = useCandidateStore();
	const { jobDetails } = useJobStore();

	const hasSelectedDocuments =
		includeSkills || includeCoverLetter || includeResume;
	const isGeneratingAny =
		isGeneratingSkills || isGeneratingCoverLetter || isGeneratingResume;

	const handleGenerateAll = useCallback(async () => {
		if (!hasSelectedDocuments) {
			return;
		}

		const generationTasks: Promise<void>[] = [];

		if (includeSkills) {
			generationTasks.push(generateSkills());
		}

		if (includeCoverLetter && coverLetterTemplate) {
			setIsGeneratingCoverLetter(true);
			const coverLetterTask = generateDocuments({
				includeResume: false,
				includeCoverLetter: true,
				resumeTemplate: '',
				coverLetterTemplate,
				candidateDetails,
				jobDetails,
				skills,
			})
				.then((result) => {
					setGeneratedCoverLetter(result.coverLetter);
				})
				.catch((error) => {
					console.error('Error generating cover letter:', error);
					setGeneratedCoverLetter(
						'Error generating cover letter. Please try again.',
					);
				})
				.finally(() => {
					setIsGeneratingCoverLetter(false);
				});
			generationTasks.push(coverLetterTask);
		}

		if (includeResume && resumeTemplate) {
			setIsGeneratingResume(true);
			const resumeTask = generateDocuments({
				includeCoverLetter: false,
				includeResume: true,
				coverLetterTemplate: '',
				resumeTemplate,
				candidateDetails,
				skills,
				jobDetails,
			})
				.then((result) => {
					setGeneratedResume(result.resume);
				})
				.catch((error) => {
					console.error('Error generating resume:', error);
					setGeneratedResume('Error generating resume. Please try again.');
				})
				.finally(() => {
					setIsGeneratingResume(false);
				});
			generationTasks.push(resumeTask);
		}

		await Promise.all(generationTasks);
	}, [
		hasSelectedDocuments,
		includeSkills,
		generateSkills,
		includeCoverLetter,
		coverLetterTemplate,
		includeResume,
		resumeTemplate,
		candidateDetails,
		jobDetails,
		skills,
		setGeneratedCoverLetter,
		setGeneratedResume,
		setIsGeneratingCoverLetter,
		setIsGeneratingResume,
	]);

	return {
		hasSelectedDocuments,
		isGeneratingAny,
		handleGenerateAll,
	};
};
