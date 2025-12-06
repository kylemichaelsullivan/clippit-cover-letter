'use client';

import { memo } from 'react';

import {
	ConfirmationDialog,
	SkillsNotConfiguredMessage,
} from '@/components/ui/feedback';
import { Checkbox } from '@/components/ui/input';
import { useGenerationConfirmations } from '@/lib/hooks';
import { useSkillsStore } from '@/lib/stores';
import { DocumentSection } from './DocumentSection';

export const SkillsSummarySection = memo(function SkillsSummarySection() {
	const {
		skills,
		isGeneratingSkills,
		generatedSkills,
		setGeneratedSkills,
		includeSkillGroupNames,
		toggleSkillGroupNames,
	} = useSkillsStore();

	const generationConfirmations = useGenerationConfirmations({
		candidateDetails: null,
		coverLetterTemplate: '',
		jobDetails: null,
		includeCoverLetter: false,
		skills,
	});

	const {
		handleGenerateSkills,
		showSkillsConfirmation,
		setShowSkillsConfirmation,
		performSkillsGeneration,
	} = generationConfirmations;

	const hasSkillsWithInclude = skills?.groups?.some((group) => {
		if (!group || !Array.isArray(group.skills)) {
			return false;
		}

		const hasSkills = group.skills.length > 0;
		const isIncluded = Boolean(group.include);

		return hasSkills && isIncluded;
	});

	return (
		<>
			<div className='flex flex-col gap-4'>
				<DocumentSection
					componentName='GenerateSkillsSummaryButton'
					title='Skills Summary'
					content={generatedSkills}
					generateTitle='Generate Skills Summary'
					headerElement={
						<Checkbox
							label='Group by Category'
							checked={includeSkillGroupNames}
							title='Group Skills by Category?'
							aria-label='Toggle Skill Group names in Skills Summary'
							onChange={toggleSkillGroupNames}
						/>
					}
					fallbackMessage={
						hasSkillsWithInclude ? (
							<SkillsNotConfiguredMessage />
						) : (
							<div className='text-sm text-black'>
								No skills available. Please go to the Skills tab and add some
								skills first.
							</div>
						)
					}
					disabled={!hasSkillsWithInclude}
					isEditable={!isGeneratingSkills}
					isGenerating={isGeneratingSkills}
					onContentChange={setGeneratedSkills}
					onGenerate={handleGenerateSkills}
				/>
			</div>

			<ConfirmationDialog
				title='Replace Skills Summary'
				message='A Skills Summary already exists. Generating a new one will replace the current content. Are you sure you want to continue?'
				confirmText='Generate New'
				cancelText='Cancel'
				isOpen={showSkillsConfirmation}
				onClose={() => setShowSkillsConfirmation(false)}
				onConfirm={performSkillsGeneration}
			/>
		</>
	);
});
