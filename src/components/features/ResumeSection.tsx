'use client';

import { DocumentSection } from './DocumentSection';
import { ResumeNotProvidedMessage } from '@/components/ui/feedback';
import { useResumeGeneration } from '@/lib/hooks';
import { ConfirmationDialog } from '@/components/ui/feedback';
import { useTemplatesStore } from '@/lib/stores';
import { useGenerationTimeout } from '@/lib/hooks/useGenerationTimeout';

type ResumeSectionProps = {
	candidateDetails: any;
	includeResume: boolean;
	jobDetails: any;
	resumeDetails?: {
		summary: string;
		experience: string;
		education: any[];
	};
	resumeTemplate: string;
	skills: any;
};

export const ResumeSection = ({
	candidateDetails,
	includeResume,
	jobDetails,
	resumeDetails,
	resumeTemplate,
	skills,
}: ResumeSectionProps) => {
	const {
		generatedResume,
		setGeneratedResume,
		isGeneratingResume,
		showConfirmation,
		setShowConfirmation,
		performGeneration,
		handleGenerate,
	} = useResumeGeneration({
		candidateDetails,
		includeResume,
		jobDetails,
		resumeDetails,
		resumeTemplate,
		skills,
	});

	const { setIsGeneratingResume } = useTemplatesStore();

	useGenerationTimeout({
		isGenerating: isGeneratingResume,
		setIsGenerating: setIsGeneratingResume,
		timeoutMessage: 'Resume generation timed out. Please try again.',
	});

	return (
		<>
			<div className={includeResume ? '' : 'hidden'}>
				<DocumentSection
					title='Resume'
					content={generatedResume}
					isEditable={!isGeneratingResume}
					onContentChange={setGeneratedResume}
					isGenerating={isGeneratingResume}
					onGenerate={handleGenerate}
					componentName='GenerateResumeButton'
					generateTitle='Generate Resume'
					fallbackMessage={<ResumeNotProvidedMessage />}
					hasContent={!!resumeTemplate}
				/>
			</div>

			<ConfirmationDialog
				isOpen={showConfirmation}
				onClose={() => setShowConfirmation(false)}
				onConfirm={performGeneration}
				title='Replace Resume'
				message='A resume already exists. Generating a new one will replace the current content. Are you sure you want to continue?'
				confirmText='Generate New'
				cancelText='Cancel'
			/>
		</>
	);
};
