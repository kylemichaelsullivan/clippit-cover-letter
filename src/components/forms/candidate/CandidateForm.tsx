'use client';

import { memo } from 'react';
import { Field } from '@tanstack/react-form';

import { Form, FormField, FormSection } from '@/components/forms/core';
import { TabTitle } from '@/components/ui';
import { useCandidateForm } from '@/lib/hooks';
import { usePhaseStore } from '@/lib/stores';
import type { CandidateDetails } from '@/types';
import { PLACEHOLDERS, CONSTANTS } from '@/config';
import { candidateDetailsSchema, validateSchema } from '@/lib/schemas';

type CandidateFormProps = {
	onSubmit: (details: CandidateDetails) => void;
};

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
				<FormSection title='Personal Information'>
					<Field
						form={form}
						name='fullName'
						validators={{
							onChange: validateSchema(candidateDetailsSchema, 'fullName'),
						}}
					>
						{(field) => (
							<FormField
								id='fullName'
								type='text'
								label='Full Name'
								placeholder={PLACEHOLDERS.CANDIDATE.FULL_NAME}
								field={field}
								schema={candidateDetailsSchema}
								fieldName='fullName'
								onChange={(value: string) => {
									field.handleChange(value);
									handleFieldChange('fullName', value);
								}}
							/>
						)}
					</Field>

					<Field
						form={form}
						name='email'
						validators={{
							onChange: validateSchema(candidateDetailsSchema, 'email'),
						}}
					>
						{(field) => (
							<FormField
								id='email'
								type='email'
								label='Email Address'
								placeholder={PLACEHOLDERS.CANDIDATE.EMAIL}
								field={field}
								schema={candidateDetailsSchema}
								fieldName='email'
								onChange={(value: string) => {
									field.handleChange(value);
									handleFieldChange('email', value);
								}}
							/>
						)}
					</Field>

					<Field form={form} name='phone'>
						{(field) => (
							<FormField
								id='phone'
								type='tel'
								label='Phone Number'
								placeholder={PLACEHOLDERS.CANDIDATE.PHONE}
								field={field}
								schema={candidateDetailsSchema}
								fieldName='phone'
								onChange={(value: string) => {
									field.handleChange(value);
									handleFieldChange('phone', value);
								}}
							/>
						)}
					</Field>

					<Field form={form} name='location'>
						{(field) => (
							<FormField
								id='location'
								type='text'
								label='Location'
								placeholder={PLACEHOLDERS.CANDIDATE.LOCATION}
								field={field}
								schema={candidateDetailsSchema}
								fieldName='location'
								onChange={(value: string) => {
									field.handleChange(value);
									handleFieldChange('location', value);
								}}
							/>
						)}
					</Field>
				</FormSection>

				<FormSection title='Professional Links'>
					<Field
						form={form}
						name='linkedin'
						validators={{
							onChange: validateSchema(candidateDetailsSchema, 'linkedin'),
						}}
					>
						{(field) => (
							<FormField
								id='linkedin'
								type='text'
								label='LinkedIn Profile'
								field={field}
								placeholder={PLACEHOLDERS.CANDIDATE.LINKEDIN}
								schema={candidateDetailsSchema}
								fieldName='linkedin'
								onChange={(value: string) => {
									field.handleChange(value);
									handleFieldChange('linkedin', value);
								}}
								prefix={
									<>
										<span className='hidden text-sm sm:inline'>
											{CONSTANTS.LINKEDIN.FULL_PREFIX}
										</span>
										<span className='text-sm sm:hidden'>
											{CONSTANTS.LINKEDIN.SHORT_PREFIX}
										</span>
									</>
								}
							/>
						)}
					</Field>

					<Field form={form} name='portfolio'>
						{(field) => (
							<FormField
								id='portfolio'
								type='url'
								label='Portfolio Website'
								placeholder={PLACEHOLDERS.CANDIDATE.PORTFOLIO}
								field={field}
								schema={candidateDetailsSchema}
								fieldName='portfolio'
								onChange={(value: string) => {
									field.handleChange(value);
									handleFieldChange('portfolio', value);
								}}
							/>
						)}
					</Field>
				</FormSection>
			</Form>
		</div>
	);
});
