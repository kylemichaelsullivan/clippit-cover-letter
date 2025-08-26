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
	SortExperienceButton,
} from './index';

type ResumeFormProps = {
	onSubmit: (
		includeResume: boolean,
		summary: string,
		education: any[],
		experience: any[],
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
		sortExperienceByDate,
	} = useResumeForm(onSubmit);

	if (currentPhase !== 'resume') {
		return null;
	}

	const handleSubmit = () => {
		form.handleSubmit();
	};

	return (
		<div className='ResumeForm flex flex-col gap-6'>
			<TabTitle title='Resume Details' componentName='ResumeFormTitle' />
			<Form componentName='ResumeFormContent' onSubmit={handleSubmit}>
				<div className='flex flex-col gap-6'>
					<Field name='summary' form={form}>
						{(summaryField) => (
							<FormSection
								title='Summary'
								checked={summaryField.state.value ? true : false}
								onCheckedChange={(value: boolean) => {
									summaryField.handleChange(value ? ' ' : '');
									handleFieldChange('summary', value ? ' ' : '');
								}}
								id='summary'
							>
								<Summary form={form} handleFieldChange={handleFieldChange} />
							</FormSection>
						)}
					</Field>

					<Field name='experience' form={form}>
						{() => (
							<FormSection
								title='Experience'
								headerContent={
									<SortExperienceButton onSortByDate={sortExperienceByDate} />
								}
								id='experience'
							>
								<ExperienceSection
									form={form}
									handleFieldChange={handleFieldChange}
									addExperience={addExperience}
									removeExperience={removeExperience}
								/>
							</FormSection>
						)}
					</Field>

					<Field name='education' form={form}>
						{() => (
							<FormSection
								title='Education'
								headerContent={
									<SortEducationButton onSortByYear={sortEducationByYear} />
								}
								id='education'
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
