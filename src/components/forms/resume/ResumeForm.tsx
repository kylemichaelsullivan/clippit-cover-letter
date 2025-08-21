'use client';

import { memo } from 'react';
import { Field } from '@tanstack/react-form';

import { Form, FormSection } from '@/components/forms/core';
import { TabTitle } from '@/components/ui';
import { usePhaseStore } from '@/lib/stores';
import { useResumeForm } from '@/lib/hooks';
import {
	Summary,
	ExperienceSection,
	EducationSection,
	SortEducationButton,
} from './index';

type ResumeFormProps = {
	onSubmit: (
		includeResume: boolean,
		summary: string,
		experience: any[],
		education: any[],
	) => void;
};

export const ResumeForm = memo(function ResumeForm({
	onSubmit,
}: ResumeFormProps) {
	const { currentPhase } = usePhaseStore();

	const {
		form,
		handleFieldChange,
		addEducation,
		removeEducation,
		addExperience,
		removeExperience,
		sortEducationByYear,
	} = useResumeForm(onSubmit);

	if (currentPhase !== 'resume') {
		return null;
	}

	const handleSubmit = () => {
		form.handleSubmit();
	};

	return (
		<div className='ResumeForm flex flex-col gap-6'>
			<TabTitle title='Resume' componentName='ResumeFormTitle' />
			<Form componentName='ResumeFormContent' onSubmit={handleSubmit}>
				<div className='flex flex-col gap-6'>
					<Field name='summary' form={form}>
						{(summaryField) => (
							<FormSection
								id='summary'
								title='Summary'
								checked={summaryField.state.value ? true : false}
								onCheckedChange={(value: boolean) => {
									summaryField.handleChange(value ? ' ' : '');
									handleFieldChange('summary', value ? ' ' : '');
								}}
							>
								<Summary form={form} handleFieldChange={handleFieldChange} />
							</FormSection>
						)}
					</Field>

					<Field name='experience' form={form}>
						{() => (
							<FormSection id='experience' title='Experience'>
								<ExperienceSection
									form={form}
									addExperience={addExperience}
									removeExperience={removeExperience}
									handleFieldChange={handleFieldChange}
								/>
							</FormSection>
						)}
					</Field>

					<Field name='education' form={form}>
						{() => (
							<FormSection
								id='education'
								title='Education'
								headerContent={
									<SortEducationButton onSortByYear={sortEducationByYear} />
								}
							>
								<EducationSection
									form={form}
									addEducation={addEducation}
									removeEducation={removeEducation}
									handleFieldChange={handleFieldChange}
								/>
							</FormSection>
						)}
					</Field>
				</div>
			</Form>
		</div>
	);
});
