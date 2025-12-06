'use client';

import { CoverLetterNotProvidedMessage } from '@/components/ui/feedback';
import { useCoverLetterGeneration } from '@/lib/hooks';
import { useGenerationTimeout } from '@/lib/hooks/useGenerationTimeout';
import { useTemplatesStore } from '@/lib/stores';
import { processTipTapContent } from '@/lib/utils/tiptapContentProcessing';
import { DocumentSection } from './DocumentSection';
import { GenerationConfirmationDialog } from './GenerationConfirmationDialog';

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
		isGenerating,
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

	const { setIsGenerating } = useTemplatesStore();

	useGenerationTimeout({
		isGenerating,
		setIsGenerating,
		timeoutMessage: 'Cover letter generation timed out. Please try again.',
	});

	// Except {{My Signature}}
	const processedTemplateContent = processTipTapContent(
		coverLetterTemplate,
		candidateDetails,
		jobDetails
	);

	return (
		<>
			<div className={includeCoverLetter ? '' : 'hidden'}>
				<DocumentSection
					componentName='GenerateCoverLetterButton'
					documentType='cover-letter'
					title='Cover Letter'
					generateTitle='Generate Cover Letter'
					templateContent={processedTemplateContent}
					content={generatedCoverLetter}
					fallbackMessage={<CoverLetterNotProvidedMessage />}
					isEditable={!isGenerating}
					isGenerating={isGenerating}
					onContentChange={setGeneratedCoverLetter}
					onGenerate={handleGenerate}
				/>
			</div>

			<GenerationConfirmationDialog
				title='Replace Cover Letter'
				message='A cover letter already exists. Generating a new one will replace the current content. Are you sure you want to continue?'
				isOpen={showConfirmation}
				onConfirm={performGeneration}
				onClose={() => setShowConfirmation(false)}
			/>
		</>
	);
};
