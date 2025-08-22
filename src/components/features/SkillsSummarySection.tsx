'use client';

import { memo } from 'react';

import { DocumentSection } from './DocumentSection';
import {
	ConfirmationDialog,
	SkillsNotConfiguredMessage,
} from '@/components/ui/feedback';
import { useGenerationConfirmations } from '@/lib/hooks';
import { useSkillsStore } from '@/lib/stores';

export const SkillsSummarySection = memo(function SkillsSummarySection() {
	const { skills, isGeneratingSkills, generatedSkills, setGeneratedSkills } =
		useSkillsStore();

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
					title='Skills Summary'
					content={generatedSkills || ''}
					isEditable={true}
					onContentChange={setGeneratedSkills}
					isGenerating={isGeneratingSkills}
					onGenerate={handleGenerateSkills}
					componentName='GenerateSkillsButton'
					generateTitle='Generate Skills'
					fallbackMessage={
						hasSkillsWithInclude ? (
							<SkillsNotConfiguredMessage />
						) : (
							<div className='text-gray text-sm'>
								No skills available. Please go to the Skills tab and add some
								skills first.
							</div>
						)
					}
					hasContent={!!generatedSkills && generatedSkills.trim() !== ''}
					disabled={!hasSkillsWithInclude}
				/>
			</div>

			<ConfirmationDialog
				isOpen={showSkillsConfirmation}
				onClose={() => setShowSkillsConfirmation(false)}
				onConfirm={performSkillsGeneration}
				title='Replace Skills Summary'
				message='A skills summary already exists. Generating a new one will replace the current content. Are you sure you want to continue?'
				confirmText='Generate New'
				cancelText='Cancel'
			/>
		</>
	);
});
