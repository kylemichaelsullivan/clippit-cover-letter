'use client';

import { FormSection } from '@/components/forms/core';
import { TipTapEditor } from '@/components/ui/input';
import { CONSTANTS, PLACEHOLDERS } from '@/config';
import { templatesSchema, validateSchema } from '@/lib/schemas';
import { Field } from '@tanstack/react-form';
import { memo } from 'react';

type CoverLetterSectionProps = {
	form: any;
	onFieldChange: (fieldName: string, value: any) => void;
};

export const CoverLetterSection = memo(function CoverLetterSection({
	form,
	onFieldChange,
}: CoverLetterSectionProps) {
	return (
		<Field name='includeCoverLetter' form={form}>
			{(field) => (
				<FormSection
					title='Cover Letter'
					checked={field.state.value as boolean}
					id='includeCoverLetter'
					onCheckedChange={(value: boolean) => {
						field.handleChange(value as boolean);
						onFieldChange('includeCoverLetter', value);
					}}
				>
					<Field
						name='coverLetterContent'
						form={form}
						validators={{
							onChange: validateSchema(templatesSchema, 'coverLetterContent'),
						}}
					>
						{(contentField) => (
							<TipTapEditor
								className='min-h-64 w-full font-mono sm:min-h-96 sm:text-base'
								value={(contentField.state.value as string) || ''}
								onChange={(value: string) => {
									contentField.handleChange(value);
									onFieldChange('coverLetterContent', value);
								}}
								placeholder={PLACEHOLDERS.TEMPLATES.COVER_LETTER}
								aria-label={CONSTANTS.ARIA_LABELS.COVER_LETTER_TEMPLATE}
								componentName='FormSectionTipTapEditor'
							/>
						)}
					</Field>
				</FormSection>
			)}
		</Field>
	);
});
