import { useCallback } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { useCandidateStore } from '../stores/useCandidateStore';
import { useJobStore } from '../stores/useJobStore';
import { useSkillsStore } from '../stores/useSkillsStore';
import { useTemplatesStore } from '../stores/useTemplatesStore';
import { useResumeStore } from '../stores/useResumeStore';
import { generateDocuments } from '../documentGeneration';
import { useState } from 'react';

export const useDocumentGeneration = () => {
	const { includeCoverLetter, includeResume } = useAppStore();
	const { candidateDetails } = useCandidateStore();
	const { jobDetails } = useJobStore();
	const {
		skills,
		generateSkills,
		isGeneratingSkills,
		setIsGeneratingSkills,
		generatedSkills,
		setGeneratedSkills,
		includeSkillGroupNames,
	} = useSkillsStore();
	const { resumeDetails } = useResumeStore();
	const {
		coverLetterTemplate,
		isGeneratingCoverLetter,
		setIsGeneratingCoverLetter,
		isGeneratingResume,
		setIsGeneratingResume,
		generatedCoverLetter,
		setGeneratedCoverLetter,
		generatedResume,
		setGeneratedResume,
	} = useTemplatesStore();

	const [showGenerateAllConfirmation, setShowGenerateAllConfirmation] =
		useState(false);
	const [existingContentForDialog, setExistingContentForDialog] = useState<
		Array<{
			id: string;
			label: string;
			checked: boolean;
		}>
	>([]);

	const includeSkills = skills.groups.some((group) => group.skills.length > 0);
	const hasSelectedDocuments =
		includeSkills || includeCoverLetter || includeResume;
	const isGeneratingAny =
		isGeneratingSkills || isGeneratingCoverLetter || isGeneratingResume;

	const checkForExistingContent = useCallback(() => {
		const existingContent = [];

		if (includeSkills && generatedSkills && generatedSkills.trim() !== '') {
			existingContent.push('Skills Summary');
		}

		if (
			includeCoverLetter &&
			generatedCoverLetter &&
			generatedCoverLetter.trim() !== ''
		) {
			existingContent.push('Cover Letter');
		}

		if (includeResume && generatedResume && generatedResume.trim() !== '') {
			existingContent.push('Resume');
		}

		return existingContent;
	}, [
		includeCoverLetter,
		includeResume,
		includeSkills,
		generatedSkills,
		generatedCoverLetter,
		generatedResume,
	]);

	const performGenerateAll = async () => {
		if (!hasSelectedDocuments) {
			return;
		}

		const generationTasks: Promise<void>[] = [];

		if (includeSkills) {
			if (!generatedSkills || generatedSkills.trim() === '') {
				generationTasks.push(generateSkills());
			}
		}

		if (includeCoverLetter && coverLetterTemplate) {
			if (!generatedCoverLetter || generatedCoverLetter.trim() === '') {
				setIsGeneratingCoverLetter(true);
				const coverLetterTask = generateDocuments({
					candidateDetails,
					coverLetterTemplate,
					includeCoverLetter: true,
					includeResume: false,
					jobDetails,
					skills,
					includeSkillGroupNames,
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
		}

		if (includeResume) {
			if (!generatedResume || generatedResume.trim() === '') {
				setIsGeneratingResume(true);
				const resumeTask = generateDocuments({
					candidateDetails,
					coverLetterTemplate: '',
					includeCoverLetter: false,
					includeResume: true,
					jobDetails,
					skills,
					includeSkillGroupNames,
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
		}

		await Promise.all(generationTasks);
	};

	const performGenerateAllWithReplacements = async () => {
		if (!hasSelectedDocuments) {
			return;
		}

		const generationTasks: Promise<void>[] = [];

		if (includeSkills) {
			setIsGeneratingSkills(true);
			const skillsTask = generateSkills()
				.then(() => {
					// generateSkills already handles setting the result
				})
				.catch((error) => {
					console.error('Error generating skills:', error);
					setGeneratedSkills('Error generating skills. Please try again.');
				})
				.finally(() => {
					setIsGeneratingSkills(false);
				});
			generationTasks.push(skillsTask);
		}

		if (includeCoverLetter && coverLetterTemplate) {
			setIsGeneratingCoverLetter(true);
			const coverLetterTask = generateDocuments({
				candidateDetails,
				coverLetterTemplate,
				includeCoverLetter: true,
				includeResume: false,
				jobDetails,
				skills,
				includeSkillGroupNames,
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

		if (includeResume) {
			setIsGeneratingResume(true);
			const resumeTask = generateDocuments({
				candidateDetails,
				coverLetterTemplate: '',
				includeCoverLetter: false,
				includeResume: true,
				jobDetails,
				resumeDetails,
				skills,
				includeSkillGroupNames,
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
	};

	const performSelectiveGeneration = async (selectedItems?: string[]) => {
		if (!hasSelectedDocuments || !selectedItems || selectedItems.length === 0) {
			return;
		}

		const generationTasks: Promise<void>[] = [];

		if (selectedItems.includes('skills') && includeSkills) {
			setIsGeneratingSkills(true);
			const skillsTask = generateSkills()
				.then(() => {
					// generateSkills already handles setting the result
				})
				.catch((error) => {
					console.error('Error generating skills:', error);
					setGeneratedSkills('Error generating skills. Please try again.');
				})
				.finally(() => {
					setIsGeneratingSkills(false);
				});
			generationTasks.push(skillsTask);
		}

		if (
			selectedItems.includes('coverLetter') &&
			includeCoverLetter &&
			coverLetterTemplate
		) {
			setIsGeneratingCoverLetter(true);
			const coverLetterTask = generateDocuments({
				candidateDetails,
				coverLetterTemplate,
				includeCoverLetter: true,
				includeResume: false,
				jobDetails,
				skills,
				includeSkillGroupNames,
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

		if (selectedItems.includes('resume') && includeResume) {
			setIsGeneratingResume(true);
			const resumeTask = generateDocuments({
				candidateDetails,
				coverLetterTemplate: '',
				includeCoverLetter: false,
				includeResume: true,
				jobDetails,
				resumeDetails,
				skills,
				includeSkillGroupNames,
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
	};

	const performGenerateEmptyOnly = useCallback(async () => {
		if (!hasSelectedDocuments) {
			return;
		}

		const generationTasks: Promise<void>[] = [];

		if (includeSkills && (!generatedSkills || generatedSkills.trim() === '')) {
			generationTasks.push(generateSkills());
		}

		if (
			includeCoverLetter &&
			coverLetterTemplate &&
			(!generatedCoverLetter || generatedCoverLetter.trim() === '')
		) {
			setIsGeneratingCoverLetter(true);
			const coverLetterTask = generateDocuments({
				candidateDetails,
				coverLetterTemplate,
				includeCoverLetter: true,
				includeResume: false,
				jobDetails,
				skills,
				includeSkillGroupNames,
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

		if (includeResume && (!generatedResume || generatedResume.trim() === '')) {
			setIsGeneratingResume(true);
			const resumeTask = generateDocuments({
				candidateDetails,
				coverLetterTemplate: '',
				includeCoverLetter: false,
				includeResume: true,
				jobDetails,
				resumeDetails,
				skills,
				includeSkillGroupNames,
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
		includeCoverLetter,
		includeResume,
		coverLetterTemplate,
		generatedSkills,
		generatedCoverLetter,
		generatedResume,
		candidateDetails,
		jobDetails,
		skills,
		resumeDetails,
		generateSkills,
		setIsGeneratingCoverLetter,
		setGeneratedCoverLetter,
		setIsGeneratingResume,
		setGeneratedResume,
		includeSkillGroupNames,
	]);

	const handleGenerateAll = useCallback(async () => {
		if (!hasSelectedDocuments) {
			return;
		}

		const existingContent = checkForExistingContent();

		const existingItems = [];
		if (includeSkills && generatedSkills && generatedSkills.trim() !== '') {
			existingItems.push({
				id: 'skills',
				label: 'Skills Summary',
				checked: true,
			});
		}
		if (
			includeCoverLetter &&
			generatedCoverLetter &&
			generatedCoverLetter.trim() !== ''
		) {
			existingItems.push({
				id: 'coverLetter',
				label: 'Cover Letter',
				checked: true,
			});
		}
		if (includeResume && generatedResume && generatedResume.trim() !== '') {
			existingItems.push({
				id: 'resume',
				label: 'Resume',
				checked: true,
			});
		}
		setExistingContentForDialog(existingItems);

		await performGenerateEmptyOnly();

		if (existingContent.length > 0) {
			setShowGenerateAllConfirmation(true);
		}
	}, [
		hasSelectedDocuments,
		checkForExistingContent,
		performGenerateEmptyOnly,
		includeSkills,
		generatedSkills,
		includeCoverLetter,
		generatedCoverLetter,
		includeResume,
		generatedResume,
	]);

	return {
		hasSelectedDocuments,
		isGeneratingAny,
		handleGenerateAll,
		performGenerateAll,
		performGenerateAllWithReplacements,
		performSelectiveGeneration,
		performGenerateEmptyOnly,
		showGenerateAllConfirmation,
		setShowGenerateAllConfirmation,
		checkForExistingContent,
		existingContentForDialog,
	};
};
