'use client';

import { memo } from 'react';

import { Form } from '@/components/forms/core';
import { SkillsSection } from './';
import { TabTitle } from '@/components/ui';
import { DownloadButtonMD } from '@/components/results/actions';
import { useSkillsForm } from '@/lib/hooks';
import { usePhaseStore, useSkillsStore } from '@/lib/stores';
import type { Skills } from '@/types';

type SkillsFormProps = {
	onSubmit: (skillsData: Skills) => void;
	includeSkills: boolean;
	onIncludeSkillsChange: (includeSkills: boolean) => void;
};

export const SkillsForm = memo(function SkillsForm({
	onSubmit,
	includeSkills,
	onIncludeSkillsChange,
}: SkillsFormProps) {
	const { currentPhase } = usePhaseStore();
	const { skills } = useSkillsStore();

	const {
		form,
		error,
		handleFieldChange,
		addSkillGroup,
		alphabetizeGroups,
		removeSkillGroup,
	} = useSkillsForm(onSubmit);

	if (currentPhase !== 'skills') {
		return null;
	}

	const handleSubmit = () => {
		form.handleSubmit();
	};

	const actionButton =
		skills && skills.groups && skills.groups.length > 0 ? (
			<DownloadButtonMD
				content={skills.groups
					.map((group) => {
						if (group.skills.length === 0) return '';
						return `## ${group.name}\n${group.skills.join(', ')}`;
					})
					.filter(Boolean)
					.join('\n\n')}
				color='primary'
				size='sm'
				title='Skills'
				filename='skills'
				showIcon={true}
				disabled={false}
			/>
		) : undefined;

	return (
		<div className='SkillsForm flex flex-col gap-6'>
			<TabTitle
				title='Skills'
				componentName='SkillsFormTitle'
				actionButton={actionButton}
			/>

			<Form componentName='SkillsFormContent' onSubmit={handleSubmit}>
				<SkillsSection
					form={form}
					includeSkills={includeSkills}
					onIncludeSkillsChange={onIncludeSkillsChange}
					error={error}
					addSkillGroup={addSkillGroup}
					alphabetizeGroups={alphabetizeGroups}
					removeSkillGroup={removeSkillGroup}
					handleFieldChange={handleFieldChange}
				/>
			</Form>
		</div>
	);
});
