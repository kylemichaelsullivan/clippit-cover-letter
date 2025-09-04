'use client';

import { memo } from 'react';
import { Form } from '@/components/forms/core';
import { JobFormFields } from './JobFormFields';
import { JobFormHeader } from './JobFormHeader';
import { JobSkillsSection } from './JobSkillsSection';
import { useJobForm } from '@/lib/hooks';
import { usePhaseStore } from '@/lib/stores';
import type { Job } from '@/types';

type JobFormProps = {
	onSubmit: (details: Job) => Promise<void>;
};

export const JobForm = memo(function JobForm({ onSubmit }: JobFormProps) {
	const { currentPhase } = usePhaseStore();
	const { form, handleFieldChange } = useJobForm(onSubmit);

	if (currentPhase !== 'job') {
		return null;
	}

	const handleSubmit = () => {
		form.handleSubmit();
	};

	return (
		<div className='JobForm flex flex-col gap-6'>
			<JobFormHeader />

			<Form componentName='JobFormContent' onSubmit={handleSubmit}>
				<JobFormFields form={form} handleFieldChange={handleFieldChange} />
			</Form>

			<JobSkillsSection />
		</div>
	);
});
