import { useCallback, useState } from 'react';
import { generateDocuments } from '../documentGeneration';
import { useAppStore } from '../stores/useAppStore';
import { useCandidateStore } from '../stores/useCandidateStore';
import { useJobStore } from '../stores/useJobStore';
import { useSkillsStore } from '../stores/useSkillsStore';
import { useTemplatesStore } from '../stores/useTemplatesStore';
import { useResumeStore } from '../stores/useResumeStore';
import type { SelectableItems } from '@/types';

export const useDocumentGeneration = (excludeSkills = false) => {
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
		isGenerating,
		setIsGenerating,
		generatedCoverLetter,
		setGeneratedCoverLetter,
		generatedResume,
		setGeneratedResume,
	} = useTemplatesStore();

	const [showGenerateAllConfirmation, setShowGenerateAllConfirmation] =
		useState(false);
	const [existingContentForDialog, setExistingContentForDialog] =
		useState<SelectableItems>([]);

	const includeSkills =
		!excludeSkills &&
		skills.groups.some((group) => group.skills.length > 0 && group.include);
	const hasSelectedDocuments =
		includeSkills || includeCoverLetter || includeResume;
	const isGeneratingAny = isGeneratingSkills || isGenerating;

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
		let needsDocumentGeneration = false;

		if (includeSkills) {
			if (!generatedSkills || generatedSkills.trim() === '') {
				generationTasks.push(generateSkills());
			}
		}

		if (includeCoverLetter && coverLetterTemplate) {
			if (!generatedCoverLetter || generatedCoverLetter.trim() === '') {
				needsDocumentGeneration = true;
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
					});
				generationTasks.push(coverLetterTask);
			}
		}

		if (includeResume) {
			if (!generatedResume || generatedResume.trim() === '') {
				needsDocumentGeneration = true;
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
					});
				generationTasks.push(resumeTask);
			}
		}

		if (needsDocumentGeneration) {
			setIsGenerating(true);
		}

		try {
			await Promise.all(generationTasks);
		} finally {
			if (needsDocumentGeneration) {
				setIsGenerating(false);
			}
		}
	};

	const performGenerateAllWithReplacements = async () => {
		if (!hasSelectedDocuments) {
			return;
		}

		const generationTasks: Promise<void>[] = [];
		let needsDocumentGeneration = false;

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
			needsDocumentGeneration = true;
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
				});
			generationTasks.push(coverLetterTask);
		}

		if (includeResume) {
			needsDocumentGeneration = true;
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
				});
			generationTasks.push(resumeTask);
		}

		if (needsDocumentGeneration) {
			setIsGenerating(true);
		}

		try {
			await Promise.all(generationTasks);
		} finally {
			if (needsDocumentGeneration) {
				setIsGenerating(false);
			}
		}
	};

	const performSelectiveGeneration = async (selectedItems?: string[]) => {
		if (!hasSelectedDocuments || !selectedItems || selectedItems.length === 0) {
			return;
		}

		const generationTasks: Promise<void>[] = [];
		let needsDocumentGeneration = false;

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
			needsDocumentGeneration = true;
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
				});
			generationTasks.push(coverLetterTask);
		}

		if (selectedItems.includes('resume') && includeResume) {
			needsDocumentGeneration = true;
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
				});
			generationTasks.push(resumeTask);
		}

		if (needsDocumentGeneration) {
			setIsGenerating(true);
		}

		try {
			await Promise.all(generationTasks);
		} finally {
			if (needsDocumentGeneration) {
				setIsGenerating(false);
			}
		}
	};

	const performGenerateEmptyOnly = useCallback(async () => {
		if (!hasSelectedDocuments) {
			return;
		}

		const generationTasks: Promise<void>[] = [];
		let needsDocumentGeneration = false;

		if (includeSkills && (!generatedSkills || generatedSkills.trim() === '')) {
			generationTasks.push(generateSkills());
		}

		if (
			includeCoverLetter &&
			coverLetterTemplate &&
			(!generatedCoverLetter || generatedCoverLetter.trim() === '')
		) {
			needsDocumentGeneration = true;
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
				});
			generationTasks.push(coverLetterTask);
		}

		if (includeResume && (!generatedResume || generatedResume.trim() === '')) {
			needsDocumentGeneration = true;
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
				});
			generationTasks.push(resumeTask);
		}

		if (needsDocumentGeneration) {
			setIsGenerating(true);
		}

		try {
			await Promise.all(generationTasks);
		} finally {
			if (needsDocumentGeneration) {
				setIsGenerating(false);
			}
		}
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
		setIsGenerating,
		setGeneratedCoverLetter,
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
