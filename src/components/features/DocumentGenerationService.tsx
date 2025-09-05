import { generateDocuments } from '@/lib/documentGeneration';
import { showToast } from '@/lib/toast';

type DocumentGenerationServiceProps = {
	coverLetterTemplate: string;
	resumeDetails: any;
	candidateDetails: any;
	jobDetails: any;
	skills: any;
	includeCoverLetter: boolean;
	includeResume: boolean;
	includeSkillGroupNames: boolean;
	onCoverLetterGenerated: (content: string) => void;
	onResumeGenerated: (content: string) => void;
	onCoverLetterError: (error: string) => void;
	onResumeError: (error: string) => void;
};

export const DocumentGenerationService = function DocumentGenerationService({
	coverLetterTemplate,
	resumeDetails,
	candidateDetails,
	jobDetails,
	skills,
	includeCoverLetter,
	includeResume,
	includeSkillGroupNames,
	onCoverLetterGenerated,
	onResumeGenerated,
	onCoverLetterError,
	onResumeError,
}: DocumentGenerationServiceProps) {
	const generateCoverLetter = async () => {
		if (!includeCoverLetter) {
			return;
		}

		const loadingToast = showToast.loading('Generating cover letter…');

		try {
			const result = await generateDocuments({
				coverLetterTemplate,
				candidateDetails,
				jobDetails,
				skills,
				includeSkillGroupNames,
				includeCoverLetter: true,
				includeResume: false,
			});

			onCoverLetterGenerated(result.coverLetter);
			showToast.dismiss(loadingToast);
			showToast.success('Cover letter generated successfully');
		} catch (error) {
			console.error('Error generating cover letter:', error);
			const errorMessage = 'Error generating cover letter. Please try again.';
			onCoverLetterError(errorMessage);
			showToast.dismiss(loadingToast);
			showToast.error('Failed to generate cover letter');
		}
	};

	const generateResume = async () => {
		if (!includeResume) {
			return;
		}

		const loadingToast = showToast.loading('Generating resume…');

		try {
			const result = await generateDocuments({
				coverLetterTemplate: '',
				resumeDetails,
				candidateDetails,
				jobDetails,
				skills,
				includeSkillGroupNames,
				includeResume: true,
				includeCoverLetter: false,
			});

			onResumeGenerated(result.resume);
			showToast.dismiss(loadingToast);
			showToast.success('Resume generated successfully');
		} catch (error) {
			console.error('Error generating resume:', error);
			const errorMessage = 'Error generating resume. Please try again.';
			onResumeError(errorMessage);
			showToast.dismiss(loadingToast);
			showToast.error('Failed to generate resume');
		}
	};

	const generateAllDocuments = async () => {
		if (!includeCoverLetter && !includeResume) {
			return;
		}

		if (includeCoverLetter) {
			await generateCoverLetter();
		}
		if (includeResume) {
			await generateResume();
		}
	};

	return {
		generateDocuments: generateAllDocuments,
		generateCoverLetter,
		generateResume,
	};
};
