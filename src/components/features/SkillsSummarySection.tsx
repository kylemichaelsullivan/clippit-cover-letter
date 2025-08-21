'use client';

import { memo } from 'react';

import { DocumentSection } from './DocumentSection';
import { SkillsNotConfiguredMessage } from '@/components/ui/feedback';
import { useSkillsStore } from '@/lib/stores';
import { useGenerationConfirmations } from '@/lib/hooks';

export const SkillsSummarySection = memo(function SkillsSummarySection() {
	const {
		skills,
		includeSkills,
		isGeneratingSkills,
		generatedSkills,
		setGeneratedSkills,
	} = useSkillsStore();

	const generationConfirmations = useGenerationConfirmations({
		candidateDetails: null,
		coverLetterTemplate: '',
		jobDetails: null,
		includeCoverLetter: false,
		includeSkills,
		skills,
	});

	const { handleGenerateSkills } = generationConfirmations;

	if (!includeSkills) {
		return null;
	}

	return (
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
				fallbackMessage={<SkillsNotConfiguredMessage />}
				hasContent={!!generatedSkills && generatedSkills.trim() !== ''}
				disabled={!skills?.groups?.some((group) => group.skills.length > 0)}
			/>
		</div>
	);
});
