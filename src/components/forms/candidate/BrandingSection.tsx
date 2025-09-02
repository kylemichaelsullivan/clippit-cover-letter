'use client';

import { candidateDetailsSchema } from '@/lib/schemas';
import { Checkbox, ImageInput, SignatureInput } from '@/components/ui/input';
import { Field } from '@tanstack/react-form';
import { FormFieldLabel } from '@/components/ui/FormFieldLabel';
import { FormSection } from '@/components/forms/core';
import { PLACEHOLDERS } from '@/config';
import type { CandidateFormHandlers } from '@/types';

type BrandingSectionProps = {
	form: any;
	handleFieldChange: CandidateFormHandlers['handleFieldChange'];
};

export const BrandingSection = ({
	form,
	handleFieldChange,
}: BrandingSectionProps) => {
	return (
		<FormSection title='Branding'>
			<Field form={form} name='signature'>
				{(field) => (
					<Field form={form} name='signatureUseImage'>
						{(imageField) => (
							<div className='FormFieldContainer'>
								<div className='flex items-center gap-2 pb-1'>
									<Checkbox
										label=''
										checked={Boolean(imageField.state.value ?? false)}
										title='Use Signature Image?'
										aria-label='Use Signature Image if available'
										onChange={(checked) => {
											imageField.handleChange(checked);
											handleFieldChange('signatureUseImage', checked);
										}}
										id='signature-use-image'
									/>
									<FormFieldLabel
										htmlFor='signature-use-image'
										title='Signature'
										aria-label='Signature field'
									>
										Signature
									</FormFieldLabel>
								</div>
								<SignatureInput
									field={field}
									label=''
									fieldName='signature'
									placeholder={PLACEHOLDERS.CANDIDATE.SIGNATURE}
									schema={candidateDetailsSchema}
									onChange={(value: string) => {
										field.handleChange(value);
										handleFieldChange('signature', value);
									}}
									id='signature'
								/>
							</div>
						)}
					</Field>
				)}
			</Field>

			<Field form={form} name='logo'>
				{(field) => (
					<Field form={form} name='logoInclude'>
						{(includeField) => (
							<ImageInput
								field={field}
								label='Logo'
								fieldName='logo'
								includeField={includeField}
								includeFieldName='logoInclude'
								aspectRatio='square'
								placeholder={PLACEHOLDERS.CANDIDATE.LOGO}
								schema={candidateDetailsSchema}
								accept='image/*'
								onChange={(value: string) => {
									field.handleChange(value);
									handleFieldChange('logo', value);
								}}
								onIncludeChange={(value: boolean) => {
									includeField.handleChange(value);
									handleFieldChange('logoInclude', value);
								}}
								id='logo'
							/>
						)}
					</Field>
				)}
			</Field>
		</FormSection>
	);
};
