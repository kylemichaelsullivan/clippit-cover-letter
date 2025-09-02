'use client';

import { candidateDetailsSchema, validateSchema } from '@/lib/schemas';
import { Checkbox } from '@/components/ui/input';
import { CONSTANTS, PLACEHOLDERS } from '@/config';
import { Field } from '@tanstack/react-form';
import { FormFieldLabel } from '@/components/ui/FormFieldLabel';
import { FormSection, HydrationSafeFormField } from '@/components/forms/core';
import type { CandidateFormHandlers } from '@/types';

type ProfessionalLinksSectionProps = {
	form: any;
	handleFieldChange: CandidateFormHandlers['handleFieldChange'];
};

export const ProfessionalLinksSection = ({
	form,
	handleFieldChange,
}: ProfessionalLinksSectionProps) => {
	return (
		<FormSection title='Professional Links'>
			<Field
				form={form}
				name='linkedin'
				validators={{
					onChange: validateSchema(candidateDetailsSchema, 'linkedin'),
				}}
			>
				{(field) => (
					<HydrationSafeFormField
						type='text'
						label='LinkedIn Profile'
						field={field}
						fieldName='linkedin'
						schema={candidateDetailsSchema}
						placeholder={PLACEHOLDERS.CANDIDATE.LINKEDIN}
						prefix={
							<>
								<span className='hidden text-sm sm:block'>
									{CONSTANTS.LINKEDIN.FULL_PREFIX}
								</span>
								<span className='text-sm sm:hidden'>
									{CONSTANTS.LINKEDIN.SHORT_PREFIX}
								</span>
							</>
						}
						onChange={(value: string) => {
							field.handleChange(value);
							handleFieldChange('linkedin', value);
						}}
						id='linkedin'
					/>
				)}
			</Field>

			<Field form={form} name='portfolio'>
				{(field) => (
					<Field form={form} name='portfolioQRCode'>
						{(qrField) => (
							<div className='FormFieldContainer'>
								<div className='flex items-center gap-2 pb-1'>
									<Checkbox
										label=''
										checked={Boolean(qrField.state.value ?? true)}
										title='Include QR Code in Documents?'
										aria-label='Include QR Code in Documents'
										onChange={(checked) => {
											qrField.handleChange(checked);
											handleFieldChange('portfolioQRCode', checked);
										}}
									/>
									<FormFieldLabel
										htmlFor='portfolio'
										title='Portfolio Website'
										aria-label='Portfolio Website field'
									>
										Portfolio Website
									</FormFieldLabel>
								</div>
								<HydrationSafeFormField
									type='url'
									label=''
									fieldName='portfolio'
									field={field}
									schema={candidateDetailsSchema}
									placeholder={PLACEHOLDERS.CANDIDATE.PORTFOLIO}
									onChange={(value: string) => {
										field.handleChange(value);
										handleFieldChange('portfolio', value);
									}}
									id='portfolio'
								/>
							</div>
						)}
					</Field>
				)}
			</Field>
		</FormSection>
	);
};
