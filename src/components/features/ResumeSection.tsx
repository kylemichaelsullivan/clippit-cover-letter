'use client';

import { DocumentSection } from './DocumentSection';
import { ResumeNotProvidedMessage } from '@/components/ui/feedback';
import { useResumeGeneration } from '@/lib/hooks';
import { useTemplatesStore } from '@/lib/stores';
import { useGenerationTimeout } from '@/lib/hooks/useGenerationTimeout';

import { GenerationConfirmationDialog } from './GenerationConfirmationDialog';

type ResumeSectionProps = {
	candidateDetails: any;
	includeResume: boolean;
	jobDetails: any;
	resumeDetails?: {
		summary: string;
		experience: any[];
		education: any[];
	};
	skills: any;
};

export const ResumeSection = ({
	candidateDetails,
	includeResume,
	jobDetails,
	resumeDetails,
	skills,
}: ResumeSectionProps) => {
	const {
		generatedResume,
		setGeneratedResume,
		isGenerating,
		showConfirmation,
		setShowConfirmation,
		performGeneration,
		handleGenerate,
	} = useResumeGeneration({
		candidateDetails,
		includeResume,
		jobDetails,
		resumeDetails,
		skills,
	});

	const { setIsGenerating } = useTemplatesStore();

	useGenerationTimeout({
		isGenerating,
		setIsGenerating,
		timeoutMessage: 'Resume generation timed out. Please try again.',
	});

	return (
		<>
			<div className={includeResume ? '' : 'hidden'}>
				<DocumentSection
					componentName='GenerateResumeButton'
					documentType='resume'
					title='Resume'
					generateTitle='Generate Resume'
					content={generatedResume}
					fallbackMessage={<ResumeNotProvidedMessage />}
					isEditable={!isGenerating}
					isGenerating={isGenerating}
					onGenerate={handleGenerate}
					onContentChange={setGeneratedResume}
				/>
			</div>

			<GenerationConfirmationDialog
				title='Replace Resume'
				message='A resume already exists. Generating a new one will replace the current content. Are you sure you want to continue?'
				isOpen={showConfirmation}
				onConfirm={performGeneration}
				onClose={() => setShowConfirmation(false)}
			/>
		</>
	);
};
