'use client';

import { memo, useState } from 'react';
import { Field } from '@tanstack/react-form';

import { Form, FormField } from '@/components/forms/core';
import { TabTitle, Button } from '@/components/ui';
import { ConfirmationDialog } from '@/components/ui/feedback';
import { MarkdownInput } from '@/components/ui/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useJobForm } from '@/lib/hooks';
import { usePhaseStore, useJobStore } from '@/lib/stores';
import { PLACEHOLDERS, DEFAULTS } from '@/config';
import { jobDetailsSchema, validateSchema } from '@/lib/schemas';
import type { Job } from '@/types';

type JobFormProps = {
	onSubmit: (details: Job) => Promise<void>;
};

export const JobForm = memo(function JobForm({ onSubmit }: JobFormProps) {
	const { currentPhase } = usePhaseStore();
	const { setJobDetails } = useJobStore();
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
			// Clear job store data
			setJobDetails(DEFAULTS.INITIAL_STATES.JOB_DETAILS);
			// Clear localStorage for job store
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
							id='companyName'
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
							id='jobTitle'
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
							id='hiringManager'
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
							id='companyAddress'
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
						<div className='FormFieldContainer flex flex-col gap-1'>
							<label
								htmlFor='jobDescription'
								className='FormFieldLabel flex items-center justify-between text-sm font-medium text-black'
							>
								<span>Job Description</span>
							</label>
							<MarkdownInput
								value={field.state.value || ''}
								onChange={(value: string) => {
									field.handleChange(value);
									handleFieldChange('jobDescription', value);
								}}
								placeholder={PLACEHOLDERS.JOB.JOB_DESCRIPTION}
								aria-label='Job description in markdown format'
								componentName='JobDescriptionMarkdownInput'
								required={true}
								id='jobDescription'
							/>
							{field.state.meta.errors?.[0] && (
								<p className='FormFieldError text-red text-sm'>
									{field.state.meta.errors[0]}
								</p>
							)}
						</div>
					)}
				</Field>
			</Form>

			<ConfirmationDialog
				isOpen={showConfirmation}
				onClose={handleClose}
				onConfirm={handleConfirm}
				title='Clear Job Data'
				message='This will permanently delete all your saved job details. This action cannot be undone.'
				confirmText='Clear Job Data'
				cancelText='Cancel'
			/>
		</div>
	);
});
