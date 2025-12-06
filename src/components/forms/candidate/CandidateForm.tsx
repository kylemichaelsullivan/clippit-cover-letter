'use client';

import { memo } from 'react';

import { Form } from '@/components/forms/core';
import { TabTitle } from '@/components/ui';
import { useCandidateForm } from '@/lib/hooks';
import { usePhaseStore } from '@/lib/stores';
import type { CandidateFormProps } from '@/types';
import { BrandingSection } from './BrandingSection';
import { PersonalInformationSection } from './PersonalInformationSection';
import { ProfessionalLinksSection } from './ProfessionalLinksSection';

export const CandidateForm = memo(function CandidateForm({
	onSubmit,
}: CandidateFormProps) {
	const { currentPhase } = usePhaseStore();

	const { form, handleFieldChange } = useCandidateForm(onSubmit);

	if (currentPhase !== 'candidate') {
		return null;
	}

	const handleSubmit = () => {
		form.handleSubmit();
	};

	return (
		<div className='CandidateForm flex flex-col gap-6'>
			<TabTitle
				title='Candidate Information'
				componentName='CandidateFormTitle'
			/>

			<Form componentName='CandidateFormContent' onSubmit={handleSubmit}>
				<PersonalInformationSection
					form={form}
					handleFieldChange={handleFieldChange}
				/>
				<ProfessionalLinksSection
					form={form}
					handleFieldChange={handleFieldChange}
				/>
				<BrandingSection form={form} handleFieldChange={handleFieldChange} />
			</Form>
		</div>
	);
});
