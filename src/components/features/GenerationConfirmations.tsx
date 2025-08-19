'use client';

import { ConfirmationDialog } from '@/components/ui/feedback';
import { useGenerationConfirmations } from '@/lib/hooks';

type GenerationConfirmationsProps = {
	candidateDetails: any;
	jobDetails: any;
	skills: any;
	coverLetterTemplate: string;
	includeCoverLetter: boolean;
	includeSkills: boolean;
	generationConfirmations?: any;
};

export const GenerationConfirmations = ({
	candidateDetails,
	jobDetails,
	skills,
	coverLetterTemplate,
	includeCoverLetter,
	includeSkills,
	generationConfirmations,
}: GenerationConfirmationsProps) => {
	const hookResult = useGenerationConfirmations({
		candidateDetails,
		jobDetails,
		skills,
		coverLetterTemplate,
		includeCoverLetter,
		includeSkills,
	});

	const {
		showSkillsConfirmation,
		setShowSkillsConfirmation,
		performSkillsGeneration,
		showCoverLetterConfirmation,
		setShowCoverLetterConfirmation,
		performCoverLetterGeneration,
	} = generationConfirmations || hookResult;

	return (
		<>
			<ConfirmationDialog
				isOpen={showSkillsConfirmation}
				onClose={() => setShowSkillsConfirmation(false)}
				onConfirm={performSkillsGeneration}
				title='Replace Skills Summary'
				message='A skills summary already exists. Generating a new one will replace the current content. Are you sure you want to continue?'
				confirmText='Generate New'
				cancelText='Cancel'
			/>

			<ConfirmationDialog
				isOpen={showCoverLetterConfirmation}
				onClose={() => setShowCoverLetterConfirmation(false)}
				onConfirm={performCoverLetterGeneration}
				title='Replace Cover Letter'
				message='A cover letter already exists. Generating a new one will replace the current content. Are you sure you want to continue?'
				confirmText='Generate New'
				cancelText='Cancel'
			/>
		</>
	);
};
