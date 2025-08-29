'use client';

import { DocumentSection } from './DocumentSection';
import { ConfirmationDialog } from '@/components/ui/feedback';
import { CoverLetterNotProvidedMessage } from '@/components/ui/feedback';
import { processTipTapContent } from '@/lib/utils/tiptapContentProcessing';
import { useCoverLetterGeneration } from '@/lib/hooks';
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

	// Process template content for TipTap editor (all placeholders except {{My Signature}})
	const processedTemplateContent = processTipTapContent(
		coverLetterTemplate,
		candidateDetails,
		jobDetails,
	);

	return (
		<>
			<div className={includeCoverLetter ? '' : 'hidden'}>
				<DocumentSection
					componentName='GenerateCoverLetterButton'
					documentType='cover-letter'
					title='Cover Letter'
					content={generatedCoverLetter}
					generateTitle='Generate Cover Letter'
					templateContent={processedTemplateContent}
					fallbackMessage={<CoverLetterNotProvidedMessage />}
					isEditable={!isGeneratingCoverLetter}
					isGenerating={isGeneratingCoverLetter}
					onContentChange={setGeneratedCoverLetter}
					onGenerate={handleGenerate}
				/>
			</div>

			<ConfirmationDialog
				title='Replace Cover Letter'
				message='A cover letter already exists. Generating a new one will replace the current content. Are you sure you want to continue?'
				isOpen={showConfirmation}
				confirmText='Generate New'
				cancelText='Cancel'
				onClose={() => setShowConfirmation(false)}
				onConfirm={performGeneration}
			/>
		</>
	);
};
