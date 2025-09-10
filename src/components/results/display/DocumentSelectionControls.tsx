'use client';

import { memo, useMemo } from 'react';

import { Button } from '@/components/ui/buttons';
import { ConfirmationDialog } from '@/components/ui/feedback';
import { DEFAULTS, PLACEHOLDERS } from '@/config';
import { DocumentSelectionControl } from './DocumentSelectionControl';
import { useAppStore, useTemplatesStore } from '@/lib/stores';
import { useDocumentGeneration } from '@/lib/hooks';

type DocumentSelectionControlsProps = {
	className?: string;
};

export const DocumentSelectionControls = memo(
	function DocumentSelectionControls({
		className,
	}: DocumentSelectionControlsProps) {
		const {
			includeCoverLetter,
			includeResume,
			setIncludeCoverLetter,
			setIncludeResume,
			coverLetterInstructions,
			resumeInstructions,
			setCoverLetterInstructions,
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
		} = useDocumentGeneration(true); // excludeSkills = true for Preview page

		const availableItems = useMemo(() => {
			const items = [];

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
					className={`DocumentSelectionControls flex w-full flex-col gap-4 rounded-lg border-black bg-white p-4 ${className || ''}`}
				>
					<div className='flex flex-col gap-14'>
						<DocumentSelectionControl
							label='Cover Letter'
							checked={includeCoverLetter}
							placeholder={PLACEHOLDERS.DOCUMENT_INSTRUCTIONS.COVER_LETTER}
							value={coverLetterInstructions}
							title='Generate Cover Letter?'
							onChange={setIncludeCoverLetter}
							onValueChange={setCoverLetterInstructions}
						/>

						<DocumentSelectionControl
							label='Resume'
							checked={includeResume}
							placeholder={PLACEHOLDERS.DOCUMENT_INSTRUCTIONS.RESUME}
							value={resumeInstructions}
							title='Generate Resume?'
							onChange={setIncludeResume}
							onValueChange={setResumeInstructions}
						/>
					</div>

					{hasSelectedDocuments && (
						<div className='DocumentSelectionControl flex justify-center'>
							<Button
								componentName='GenerateAllButton'
								color='primary'
								size='md'
								title={buttonText}
								disabled={isGeneratingAny}
								onClick={handleGenerateAll}
							>
								{isGeneratingAny ? DEFAULTS.GENERATING_TEXT : buttonText}
							</Button>
						</div>
					)}
				</div>

				<ConfirmationDialog
					message='Select content to regenerate:'
					availableItems={existingContentForDialog}
					isOpen={showGenerateAllConfirmation}
					title='Regenerate Content'
					cancelText='Cancel'
					onConfirm={performSelectiveGeneration}
					onClose={() => setShowGenerateAllConfirmation(false)}
				/>
			</>
		);
	},
);
