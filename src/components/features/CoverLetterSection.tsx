'use client';

import { DocumentSection } from './DocumentSection';
import { CoverLetterNotProvidedMessage } from '@/components/ui/feedback';
import { useCoverLetterGeneration } from '@/lib/hooks';
import { ConfirmationDialog } from '@/components/ui/feedback';
import { useGenerationTimeout } from '@/lib/hooks/useGenerationTimeout';
import { useTemplatesStore } from '@/lib/stores';

type CoverLetterSectionProps = {
	candidateDetails: any;
	jobDetails: any;
	skills: any;
	includeCoverLetter: boolean;
	coverLetterTemplate: string;
};

export const CoverLetterSection = ({
	candidateDetails,
	jobDetails,
	skills,
	includeCoverLetter,
	coverLetterTemplate,
}: CoverLetterSectionProps) => {
	const {
		generatedCoverLetter,
		setGeneratedCoverLetter,
		isGeneratingCoverLetter,
		showConfirmation,
		setShowConfirmation,
		performGeneration,
		handleGenerate,
	} = useCoverLetterGeneration({
		candidateDetails,
		jobDetails,
		skills,
		includeCoverLetter,
		coverLetterTemplate,
	});

	const { setIsGeneratingCoverLetter } = useTemplatesStore();

	useGenerationTimeout({
		isGenerating: isGeneratingCoverLetter,
		setIsGenerating: setIsGeneratingCoverLetter,
		timeoutMessage: 'Cover letter generation timed out. Please try again.',
	});

	return (
		<>
			<div className={includeCoverLetter ? '' : 'hidden'}>
				<DocumentSection
					title='Cover Letter'
					content={generatedCoverLetter}
					isEditable={!isGeneratingCoverLetter}
					onContentChange={setGeneratedCoverLetter}
					isGenerating={isGeneratingCoverLetter}
					onGenerate={handleGenerate}
					componentName='GenerateCoverLetterButton'
					generateTitle='Generate Cover Letter'
					fallbackMessage={<CoverLetterNotProvidedMessage />}
					documentType='cover-letter'
				/>
			</div>

			<ConfirmationDialog
				isOpen={showConfirmation}
				onClose={() => setShowConfirmation(false)}
				onConfirm={performGeneration}
				title='Replace Cover Letter'
				message='A cover letter already exists. Generating a new one will replace the current content. Are you sure you want to continue?'
				confirmText='Generate New'
				cancelText='Cancel'
			/>
		</>
	);
};
