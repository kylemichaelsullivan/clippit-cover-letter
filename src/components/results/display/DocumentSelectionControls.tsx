'use client';

import { memo } from 'react';

import { Button } from '@/components/ui/buttons';
import { SkillsRangeSlider } from '@/components/ui/input';
import { PLACEHOLDERS } from '@/config/placeholders';
import { useDocumentGeneration } from '@/lib/hooks/useDocumentGeneration';
import { useAppStore, useSkillsStore } from '@/lib/stores';
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
		const { includeSkills, setIncludeSkills } = useSkillsStore();
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

		const { hasSelectedDocuments, isGeneratingAny, handleGenerateAll } =
			useDocumentGeneration();

		return (
			<div
				className={`DocumentSelectionControls flex flex-col gap-4 rounded-lg border border-black bg-white p-4 ${className || ''}`}
			>
				<DocumentOption
					checked={includeSkills}
					onChange={setIncludeSkills}
					label='Skills Summary'
					placeholder={PLACEHOLDERS.DOCUMENT_INSTRUCTIONS.SKILLS_SUMMARY}
					value={skillsInstructions}
					onValueChange={setSkillsInstructions}
				/>

				<SkillsControls />

				<DocumentOption
					checked={includeCoverLetter}
					onChange={setIncludeCoverLetter}
					label='Cover Letter'
					placeholder={PLACEHOLDERS.DOCUMENT_INSTRUCTIONS.COVER_LETTER}
					value={coverLetterInstructions}
					onValueChange={setCoverLetterInstructions}
				/>

				<DocumentOption
					checked={includeResume}
					onChange={setIncludeResume}
					label='Resume'
					placeholder={PLACEHOLDERS.DOCUMENT_INSTRUCTIONS.RESUME}
					value={resumeInstructions}
					onValueChange={setResumeInstructions}
				/>

				{hasSelectedDocuments && (
					<div className='border-gray flex justify-center border-t pt-4'>
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
		);
	},
);
