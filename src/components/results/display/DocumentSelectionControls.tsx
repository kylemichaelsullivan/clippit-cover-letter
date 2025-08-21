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
			setIncludeCoverLetter,
			includeResume,
			setIncludeResume,
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
					className={`DocumentSelectionControls flex flex-col gap-4 rounded-lg border border-black bg-white p-4 ${className || ''}`}
				>
					<div className='flex flex-col gap-14'>
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
