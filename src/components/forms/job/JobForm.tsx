'use client';

import { memo, useState } from 'react';
import { Field } from '@tanstack/react-form';
import { Form, FormField, FormSection } from '@/components/forms/core';
import { TabTitle, Button } from '@/components/ui';
import { ConfirmationDialog } from '@/components/ui/feedback';
import { SkillsRangeSlider, TipTapEditor } from '@/components/ui/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useJobForm } from '@/lib/hooks';
import { usePhaseStore, useJobStore, useSkillsStore } from '@/lib/stores';
import { PLACEHOLDERS, DEFAULTS } from '@/config';
import { jobDetailsSchema, validateSchema } from '@/lib/schemas';
import { SkillsSummarySection } from '@/components/features';
import type { Job } from '@/types';

type JobFormProps = {
	onSubmit: (details: Job) => Promise<void>;
};

export const JobForm = memo(function JobForm({ onSubmit }: JobFormProps) {
	const { currentPhase } = usePhaseStore();
	const { setJobDetails } = useJobStore();
	const { skills, setSkillsRange } = useSkillsStore();
	const [showConfirmation, setShowConfirmation] = useState(false);

	const { form, handleFieldChange } = useJobForm(onSubmit);

	if (currentPhase !== 'job') {
		return null;
	}

	const handleSubmit = () => {
		form.handleSubmit();
	};

	const handleClearClick = () => {
		setShowConfirmation(true);
	};

	const handleClose = () => {
		setShowConfirmation(false);
	};

	const handleConfirm = async () => {
		try {
			setJobDetails(DEFAULTS.INITIAL_STATES.JOB_DETAILS);
			localStorage.removeItem('job-store');
			console.log('Job data cleared successfully');
		} catch (error) {
			console.error('Failed to clear job data:', error);
		} finally {
			setShowConfirmation(false);
		}
	};

	return (
		<div className='JobForm flex flex-col gap-6'>
			<TabTitle
				title='Job Details'
				componentName='JobFormTitle'
				actionButton={
					<Button
						componentName='ClearJobButton'
						color='danger'
						size='md'
						title='Clear Job Details'
						aria-label='Clear Job Details'
						onClick={handleClearClick}
					>
						<FontAwesomeIcon icon={faTrash} aria-hidden='true' />
						Clear
					</Button>
				}
			/>

			<Form componentName='JobFormContent' onSubmit={handleSubmit}>
				<Field
					form={form}
					name='companyName'
					validators={{
						onChange: validateSchema(jobDetailsSchema, 'companyName'),
					}}
				>
					{(field) => (
						<FormField
							type='text'
							label='Company Name'
							placeholder={PLACEHOLDERS.JOB.COMPANY_NAME}
							field={field}
							schema={jobDetailsSchema}
							fieldName='companyName'
							onChange={(value: string) => {
								field.handleChange(value);
								handleFieldChange('companyName', value);
							}}
							id='companyName'
						/>
					)}
				</Field>

				<Field
					form={form}
					name='jobTitle'
					validators={{
						onChange: validateSchema(jobDetailsSchema, 'jobTitle'),
					}}
				>
					{(field) => (
						<FormField
							type='text'
							label='Job Title'
							placeholder={PLACEHOLDERS.JOB.JOB_TITLE}
							field={field}
							schema={jobDetailsSchema}
							fieldName='jobTitle'
							onChange={(value: string) => {
								field.handleChange(value);
								handleFieldChange('jobTitle', value);
							}}
							id='jobTitle'
						/>
					)}
				</Field>

				<Field
					form={form}
					name='hiringManager'
					validators={{
						onChange: validateSchema(jobDetailsSchema, 'hiringManager'),
					}}
				>
					{(field) => (
						<FormField
							type='text'
							label='Hiring Manager'
							placeholder={PLACEHOLDERS.JOB.HIRING_MANAGER}
							field={field}
							schema={jobDetailsSchema}
							fieldName='hiringManager'
							onChange={(value: string) => {
								field.handleChange(value);
								handleFieldChange('hiringManager', value);
							}}
							id='hiringManager'
						/>
					)}
				</Field>

				<Field
					form={form}
					name='companyAddress'
					validators={{
						onChange: validateSchema(jobDetailsSchema, 'companyAddress'),
					}}
				>
					{(field) => (
						<FormField
							type='text'
							label='Company Address'
							placeholder={PLACEHOLDERS.JOB.COMPANY_ADDRESS}
							field={field}
							schema={jobDetailsSchema}
							fieldName='companyAddress'
							onChange={(value: string) => {
								field.handleChange(value);
								handleFieldChange('companyAddress', value);
							}}
							id='companyAddress'
						/>
					)}
				</Field>

				<Field
					form={form}
					name='jobDescription'
					validators={{
						onChange: validateSchema(jobDetailsSchema, 'jobDescription'),
					}}
				>
					{(field) => (
						<div className='FormFieldContainer'>
							<label htmlFor='jobDescription' className='FormFieldLabel'>
								Job Description
							</label>
							<TipTapEditor
								value={field.state.value || ''}
								onChange={(value: string) => {
									field.handleChange(value);
									handleFieldChange('jobDescription', value);
								}}
								placeholder={PLACEHOLDERS.JOB.JOB_DESCRIPTION}
								id='jobDescription'
								className='min-h-64 w-full font-mono sm:min-h-96 sm:text-base'
								aria-label='Job description'
								componentName='JobDescriptionEditor'
							/>
						</div>
					)}
				</Field>
			</Form>

			<FormSection title='Select Skills'>
				<div className='flex flex-col gap-4'>
					{skills?.groups?.length > 0 && (
						<div className='flex flex-col gap-2'>
							<SkillsRangeSlider
								minSkills={skills.minSkillsToUse}
								maxSkills={skills.maxSkillsToUse}
								onRangeChange={setSkillsRange}
							/>
						</div>
					)}

					<SkillsSummarySection />
				</div>
			</FormSection>

			<ConfirmationDialog
				isOpen={showConfirmation}
				title='Clear Job Data'
				message='This will permanently delete all your saved job details. This action cannot be undone.'
				confirmText='Clear Job Data'
				cancelText='Cancel'
				onConfirm={handleConfirm}
				onClose={handleClose}
			/>
		</div>
	);
});
