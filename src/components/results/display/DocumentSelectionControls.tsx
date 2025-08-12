'use client';

import { memo } from 'react';

import { Button } from '@/components/ui/buttons';
import { ConfirmationDialog } from '@/components/ui/feedback';
import { SkillsRangeSlider } from '@/components/ui/input';
import { PLACEHOLDERS } from '@/config/placeholders';
import { useDocumentGeneration } from '@/lib/hooks/useDocumentGeneration';
import { useAppStore, useSkillsStore, useTemplatesStore } from '@/lib/stores';
import { DocumentOption } from './DocumentOption';

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
			checkForExistingContent,
		} = useDocumentGeneration();

		const existingContent = checkForExistingContent();
		const contentList = existingContent.join(', ');

		const getAvailableItems = () => {
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
		};

		return (
			<>
				<div
					className={`DocumentSelectionControls flex flex-col gap-14 rounded-lg border border-black bg-white p-4 ${className || ''}`}
				>
					{/* Skills Summary Section */}
					<div className='DocumentSelectionControl flex flex-col gap-1'>
						<DocumentOption
							checked={includeSkills}
							onChange={setIncludeSkills}
							label='Skills Summary'
							placeholder={PLACEHOLDERS.DOCUMENT_INSTRUCTIONS.SKILLS_SUMMARY}
							value={skillsInstructions}
							onValueChange={setSkillsInstructions}
						/>
						<SkillsControls />
					</div>

					{/* Cover Letter Section */}
					<div className='DocumentSelectionControl'>
						<DocumentOption
							checked={includeCoverLetter}
							onChange={setIncludeCoverLetter}
							label='Cover Letter'
							placeholder={PLACEHOLDERS.DOCUMENT_INSTRUCTIONS.COVER_LETTER}
							value={coverLetterInstructions}
							onValueChange={setCoverLetterInstructions}
						/>
					</div>

					{/* Resume Section */}
					<div className='DocumentSelectionControl'>
						<DocumentOption
							checked={includeResume}
							onChange={setIncludeResume}
							label='Resume'
							placeholder={PLACEHOLDERS.DOCUMENT_INSTRUCTIONS.RESUME}
							value={resumeInstructions}
							onValueChange={setResumeInstructions}
						/>
					</div>

					{/* Generate All Section */}
					{hasSelectedDocuments && (
						<div className='DocumentSelectionControl flex justify-center'>
							<Button
								color='primary'
								size='md'
								onClick={handleGenerateAll}
								disabled={isGeneratingAny}
								title='Generate All'
								componentName='GenerateAllButton'
							>
								{isGeneratingAny ? 'Generating...' : 'Generate All'}
							</Button>
						</div>
					)}
				</div>

				<ConfirmationDialog
					isOpen={showGenerateAllConfirmation}
					onClose={() => setShowGenerateAllConfirmation(false)}
					onConfirm={performSelectiveGeneration}
					title='Select Content to Regenerate'
					message={`The following content already exists: ${contentList}. Select which content you would like to regenerate.`}
					availableItems={getAvailableItems()}
					confirmText='Generate Selected'
					cancelText='Cancel'
				/>
			</>
		);
	},
);
