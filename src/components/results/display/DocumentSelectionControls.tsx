'use client';

import { memo, useMemo } from 'react';

import { Button } from '@/components/ui/buttons';
import { ConfirmationDialog } from '@/components/ui/feedback';
import { DEFAULTS, PLACEHOLDERS } from '@/config';
import { DocumentSelectionControl } from './DocumentSelectionControl';
import { SkillsRangeSlider } from '@/components/ui/input';
import { useAppStore, useSkillsStore, useTemplatesStore } from '@/lib/stores';
import { useDocumentGeneration } from '@/lib/hooks';

type DocumentSelectionControlsProps = {
	className?: string;
};

const SkillsControls = memo(function SkillsControls() {
	const { skills, setSkillsRange } = useSkillsStore();
	const { includeSkills } = useSkillsStore();

	if (!skills?.groups?.length) {
		return null;
	}

	return (
		<div className={includeSkills ? '' : 'hidden'}>
			<SkillsRangeSlider
				minSkills={skills.minSkillsToUse}
				maxSkills={skills.maxSkillsToUse}
				onRangeChange={setSkillsRange}
			/>
		</div>
	);
});

export const DocumentSelectionControls = memo(
	function DocumentSelectionControls({
		className,
	}: DocumentSelectionControlsProps) {
		const { includeSkills, setIncludeSkills, generatedSkills } =
			useSkillsStore();
		const {
			includeCoverLetter,
			setIncludeCoverLetter,
			includeResume,
			setIncludeResume,
			skillsInstructions,
			setSkillsInstructions,
			coverLetterInstructions,
			setCoverLetterInstructions,
			resumeInstructions,
			setResumeInstructions,
		} = useAppStore();
		const { generatedCoverLetter, generatedResume } = useTemplatesStore();

		const {
			hasSelectedDocuments,
			isGeneratingAny,
			handleGenerateAll,
			performSelectiveGeneration,
			showGenerateAllConfirmation,
			setShowGenerateAllConfirmation,
			existingContentForDialog,
		} = useDocumentGeneration();

		const availableItems = useMemo(() => {
			const items = [];

			if (includeSkills && generatedSkills && generatedSkills.trim() !== '') {
				items.push({
					id: 'skills',
					label: 'Skills Summary',
					checked: true,
				});
			}

			if (
				includeCoverLetter &&
				generatedCoverLetter &&
				generatedCoverLetter.trim() !== ''
			) {
				items.push({
					id: 'coverLetter',
					label: 'Cover Letter',
					checked: true,
				});
			}

			if (includeResume && generatedResume && generatedResume.trim() !== '') {
				items.push({
					id: 'resume',
					label: 'Resume',
					checked: true,
				});
			}

			return items;
		}, [
			includeSkills,
			generatedSkills,
			includeCoverLetter,
			generatedCoverLetter,
			includeResume,
			generatedResume,
		]);

		const allItemsSelected =
			availableItems.length > 0 && availableItems.every((item) => item.checked);
		const buttonText = allItemsSelected ? 'Generate All' : 'Generate Selected';

		return (
			<>
				<div
					className={`DocumentSelectionControls flex flex-col gap-4 rounded-lg border border-black bg-white p-4 ${className || ''}`}
				>
					<div className='flex flex-col gap-14'>
						<DocumentSelectionControl
							checked={includeSkills}
							onChange={setIncludeSkills}
							label='Skills Summary'
							placeholder={PLACEHOLDERS.DOCUMENT_INSTRUCTIONS.SKILLS_SUMMARY}
							value={skillsInstructions}
							title='Generate Skills Summary?'
							onValueChange={setSkillsInstructions}
						>
							<SkillsControls />
						</DocumentSelectionControl>

						<DocumentSelectionControl
							checked={includeCoverLetter}
							onChange={setIncludeCoverLetter}
							label='Cover Letter'
							placeholder={PLACEHOLDERS.DOCUMENT_INSTRUCTIONS.COVER_LETTER}
							value={coverLetterInstructions}
							title='Generate Cover Letter?'
							onValueChange={setCoverLetterInstructions}
						/>

						<DocumentSelectionControl
							checked={includeResume}
							onChange={setIncludeResume}
							label='Resume'
							placeholder={PLACEHOLDERS.DOCUMENT_INSTRUCTIONS.RESUME}
							value={resumeInstructions}
							title='Generate Resume?'
							onValueChange={setResumeInstructions}
						/>
					</div>

					{hasSelectedDocuments && (
						<div className='DocumentSelectionControl flex justify-center'>
							<Button
								color='primary'
								size='md'
								onClick={handleGenerateAll}
								disabled={isGeneratingAny}
								title={buttonText}
								componentName='GenerateAllButton'
							>
								{isGeneratingAny ? DEFAULTS.GENERATING_TEXT : buttonText}
							</Button>
						</div>
					)}
				</div>

				<ConfirmationDialog
					isOpen={showGenerateAllConfirmation}
					onClose={() => setShowGenerateAllConfirmation(false)}
					onConfirm={performSelectiveGeneration}
					title='Regenerate Content'
					message='Select content to regenerate:'
					availableItems={existingContentForDialog}
					cancelText='Cancel'
				/>
			</>
		);
	},
);
