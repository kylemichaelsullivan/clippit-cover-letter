'use client';

import { GenerationConfirmationDialog } from './GenerationConfirmationDialog';
import { useGenerationConfirmations } from '@/lib/hooks';

type GenerationConfirmationsProps = {
	candidateDetails: any;
	jobDetails: any;
	skills: any;
	coverLetterTemplate: string;
	includeCoverLetter: boolean;
	generationConfirmations?: any;
};

export const GenerationConfirmations = ({
	candidateDetails,
	jobDetails,
	skills,
	coverLetterTemplate,
	includeCoverLetter,
	generationConfirmations,
}: GenerationConfirmationsProps) => {
	const hookResult = useGenerationConfirmations({
		candidateDetails,
		jobDetails,
		skills,
		coverLetterTemplate,
		includeCoverLetter,
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
			<GenerationConfirmationDialog
				title='Replace Skills Summary'
				message='A skills summary already exists. Generating a new one will replace the current content. Are you sure you want to continue?'
				isOpen={showSkillsConfirmation}
				onClose={() => setShowSkillsConfirmation(false)}
				onConfirm={performSkillsGeneration}
			/>

			<GenerationConfirmationDialog
				title='Replace Cover Letter'
				message='A cover letter already exists. Generating a new one will replace the current content. Are you sure you want to continue?'
				isOpen={showCoverLetterConfirmation}
				onClose={() => setShowCoverLetterConfirmation(false)}
				onConfirm={performCoverLetterGeneration}
			/>
		</>
	);
};
