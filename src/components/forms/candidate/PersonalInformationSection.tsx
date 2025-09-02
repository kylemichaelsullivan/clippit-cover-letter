'use client';

import { Field } from '@tanstack/react-form';
import { FormSection, HydrationSafeFormField } from '@/components/forms/core';
import { candidateDetailsSchema, validateSchema } from '@/lib/schemas';
import { PLACEHOLDERS } from '@/config';
import type { CandidateFormHandlers } from '@/types';

type PersonalInformationSectionProps = {
	form: any;
	handleFieldChange: CandidateFormHandlers['handleFieldChange'];
};

export const PersonalInformationSection = ({
	form,
	handleFieldChange,
}: PersonalInformationSectionProps) => {
	return (
		<FormSection title='Personal Information'>
			<Field
				form={form}
				name='fullName'
				validators={{
					onChange: validateSchema(candidateDetailsSchema, 'fullName'),
				}}
			>
				{(field) => (
					<HydrationSafeFormField
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
					<HydrationSafeFormField
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
					<HydrationSafeFormField
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
					<HydrationSafeFormField
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
	);
};
