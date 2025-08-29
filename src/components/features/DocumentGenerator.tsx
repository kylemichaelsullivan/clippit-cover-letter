'use client';

import { memo } from 'react';

import { Button } from '@/components/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import {
	usePhaseStore,
	useAppStore,
	useJobStore,
	useTemplatesStore,
	useCandidateStore,
	useResumeStore,
	useSkillsStore,
} from '@/lib/stores';
import { generateDocuments } from '@/lib/documentGeneration';
import { showToast } from '@/lib/toast';
import { useGenerationTimeout } from '@/lib/hooks/useGenerationTimeout';

export const DocumentGenerator = memo(function DocumentGenerator() {
	const { currentPhase } = usePhaseStore();
	const { includeCoverLetter, includeResume } = useAppStore();
	const { jobDetails } = useJobStore();
	const {
		coverLetterTemplate,
		isGeneratingCoverLetter,
		setIsGeneratingCoverLetter,
		isGeneratingResume,
		setIsGeneratingResume,
		setGeneratedCoverLetter,
		setGeneratedResume,
	} = useTemplatesStore();
	const { candidateDetails } = useCandidateStore();
	const { resumeDetails } = useResumeStore();
	const { skills, includeSkillGroupNames } = useSkillsStore();

	useGenerationTimeout({
		isGenerating: isGeneratingCoverLetter || isGeneratingResume,
		setIsGenerating: () => {
			setIsGeneratingCoverLetter(false);
			setIsGeneratingResume(false);
		},
		timeoutMessage: 'Document generation timed out. Please try again.',
	});

	const handleGenerateDocuments = async () => {
		if (!includeCoverLetter && !includeResume) {
			return;
		}

		if (includeCoverLetter) {
			await handleGenerateCoverLetter();
		}
		if (includeResume) {
			await handleGenerateResume();
		}
	};

	const handleGenerateCoverLetter = async () => {
		if (!includeCoverLetter) {
			return;
		}

		setIsGeneratingCoverLetter(true);
		const loadingToast = showToast.loading('Generating cover letter…');

		try {
			const result = await generateDocuments({
				includeCoverLetter: true,
				includeResume: false,
				coverLetterTemplate,
				candidateDetails,
				jobDetails,
				skills,
				includeSkillGroupNames,
			});

			setGeneratedCoverLetter(result.coverLetter);
			showToast.dismiss(loadingToast);
			showToast.success('Cover letter generated successfully');
		} catch (error) {
			console.error('Error generating cover letter:', error);
			setGeneratedCoverLetter(
				'Error generating cover letter. Please try again.',
			);
			showToast.dismiss(loadingToast);
			showToast.error('Failed to generate cover letter');
		} finally {
			setIsGeneratingCoverLetter(false);
		}
	};

	const handleGenerateResume = async () => {
		if (!includeResume) {
			return;
		}

		setIsGeneratingResume(true);
		const loadingToast = showToast.loading('Generating resume…');

		try {
			const result = await generateDocuments({
				includeResume: true,
				includeCoverLetter: false,
				coverLetterTemplate: '',
				candidateDetails,
				jobDetails,
				resumeDetails,
				skills,
				includeSkillGroupNames,
			});

			setGeneratedResume(result.resume);
			showToast.dismiss(loadingToast);
			showToast.success('Resume generated successfully');
		} catch (error) {
			console.error('Error generating resume:', error);
			setGeneratedResume('Error generating resume. Please try again.');
			showToast.dismiss(loadingToast);
			showToast.error('Failed to generate resume');
		} finally {
			setIsGeneratingResume(false);
		}
	};

	if (currentPhase !== 'generate') {
		return null;
	}

	return (
		<div className='DocumentGenerator'>
			<div className='GenerateButton w-full'>
				<Button
					componentName='GenerateButton'
					color='primary'
					size='lg'
					onClick={handleGenerateDocuments}
				>
					{isGeneratingCoverLetter || isGeneratingResume ? (
						<FontAwesomeIcon
							icon={faRefresh}
							className='animate-spin'
							aria-hidden='true'
						/>
					) : (
						'Generate Documents'
					)}
				</Button>
			</div>
		</div>
	);
});
