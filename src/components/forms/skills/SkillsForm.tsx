'use client';

import { memo } from 'react';

import { Form } from '@/components/forms/core';
import { TabTitle } from '@/components/ui';
import { DownloadButtonMD } from '@/components/results/actions';
import { SkillsSection } from './';
import { usePhaseStore, useSkillsStore } from '@/lib/stores';
import { useSkillsForm } from '@/lib/hooks';
import { getSortedSkillGroups } from '@/lib/utils';
import type { Skills } from '@/types';

type SkillsFormProps = {
	onSubmit: (skillsData: Skills) => void;
};

export const SkillsForm = memo(function SkillsForm({
	onSubmit,
}: SkillsFormProps) {
	const { currentPhase } = usePhaseStore();
	const { skills } = useSkillsStore();

	const { form, error, addSkillGroup, alphabetizeGroups, removeSkillGroup } =
		useSkillsForm(onSubmit);

	if (currentPhase !== 'skills') {
		return null;
	}

	const handleSubmit = () => {
		form.handleSubmit();
	};

	const includedSkillsCount =
		skills?.groups?.reduce(
			(total, group) => total + (group.include ? group.skills?.length || 0 : 0),
			0,
		) || 0;

	const totalSkillsCount =
		skills?.groups?.reduce(
			(total, group) => total + (group.skills?.length || 0),
			0,
		) || 0;

	const actionButton =
		skills && skills.groups && skills.groups.length > 0 ? (
			<DownloadButtonMD
				content={getSortedSkillGroups(skills)
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
				tabIndex={0}
			/>
		) : undefined;

	return (
		<div className='SkillsForm flex flex-col gap-6'>
			<TabTitle
				title={`Skills (${includedSkillsCount}/${totalSkillsCount})`}
				componentName='SkillsFormTitle'
				actionButton={actionButton}
			/>

			<Form componentName='SkillsFormContent' onSubmit={handleSubmit}>
				<SkillsSection
					form={form}
					error={error}
					addSkillGroup={addSkillGroup}
					alphabetizeGroups={alphabetizeGroups}
					removeSkillGroup={removeSkillGroup}
				/>
			</Form>
		</div>
	);
});
