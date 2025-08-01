'use client';

import { DocumentSection } from './DocumentSection';
import { ResumeNotProvidedMessage } from '@/components/ui/feedback';
import { useResumeGeneration } from '@/lib/hooks';
import { ConfirmationDialog } from '@/components/ui/feedback';

type ResumeSectionProps = {
	candidateDetails: any;
	jobDetails: any;
	skills: any;
	includeResume: boolean;
	resumeTemplate: string;
};

export const ResumeSection = ({
	candidateDetails,
	jobDetails,
	skills,
	includeResume,
	resumeTemplate,
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
		jobDetails,
		skills,
		includeResume,
		resumeTemplate,
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
