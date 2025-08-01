'use client';

import { memo, useState } from 'react';
import { Field } from '@tanstack/react-form';

import { Form, FormSection } from '../core';
import { MarkdownInput } from '@/components/ui/input';
import { TabTitle } from '@/components/ui';
import { Button } from '@/components/ui/buttons';
import { MustacheReplacementModal } from '@/components/ui/feedback';
import { CONSTANTS, PLACEHOLDERS } from '@/config';
import { useTemplatesForm } from '@/lib/hooks';
import { usePhaseStore } from '@/lib/stores';
import { templatesSchema, validateSchema } from '@/lib/schemas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

type TemplatesFormProps = {
	onSubmit: (
		includeCoverLetter: boolean,
		includeResume: boolean,
		coverLetterTemplate: string,
		resumeTemplate: string,
	) => void;
};

export const TemplatesForm = memo(function TemplatesForm({
	onSubmit,
}: TemplatesFormProps) {
	const { currentPhase } = usePhaseStore();
	const [showHelpModal, setShowHelpModal] = useState(false);

	const { form, handleFieldChange } = useTemplatesForm(onSubmit);

	if (currentPhase !== 'templates') {
		return null;
	}

	const handleSubmit = () => {
		form.handleSubmit();
	};

	const handleOpenHelpModal = () => {
		setShowHelpModal(true);
	};

	const handleCloseHelpModal = () => {
		setShowHelpModal(false);
	};

	return (
		<div className='TemplatesForm flex flex-col gap-6'>
			<div className='flex items-center justify-between'>
				<TabTitle title='Templates' componentName='TemplatesFormTitle' />
				<Button
					color='primary'
					size='xs'
					onClick={handleOpenHelpModal}
					title='Template Variables Help'
					componentName='TemplatesFormHelpButton'
				>
					<FontAwesomeIcon
						icon={faCircleQuestion}
						className='h-5 w-5 text-white'
						aria-hidden='true'
					/>
				</Button>
			</div>
			<Form componentName='TemplatesFormContent' onSubmit={handleSubmit}>
				<Field name='includeCoverLetter' form={form}>
					{(field) => (
						<FormSection
							id='includeCoverLetter'
							title='Cover Letter'
							checked={field.state.value as boolean}
							onCheckedChange={(value: boolean) => {
								field.handleChange(value as boolean);
								handleFieldChange('includeCoverLetter', value);
							}}
							value={form.getFieldValue('coverLetterContent')}
							onValueChange={(value: string) => {
								form.setFieldValue('coverLetterContent', value);
								handleFieldChange('coverLetterContent', value);
							}}
							placeholder={PLACEHOLDERS.TEMPLATES.COVER_LETTER}
							ariaLabel={CONSTANTS.ARIA_LABELS.COVER_LETTER_TEMPLATE}
						>
							<Field
								name='coverLetterContent'
								form={form}
								validators={{
									onChange: validateSchema(
										templatesSchema,
										'coverLetterContent',
									),
								}}
							>
								{(contentField) => (
									<MarkdownInput
										className={CONSTANTS.CLASS_NAMES.MARKDOWN_INPUT}
										value={contentField.state.value || ''}
										onChange={(value: string) => {
											contentField.handleChange(value);
											handleFieldChange('coverLetterContent', value);
										}}
										placeholder={PLACEHOLDERS.TEMPLATES.COVER_LETTER}
										aria-label={CONSTANTS.ARIA_LABELS.COVER_LETTER_TEMPLATE}
										componentName='FormSectionMarkdownInput'
									/>
								)}
							</Field>
						</FormSection>
					)}
				</Field>

				<Field name='includeResume' form={form}>
					{(field) => (
						<FormSection
							id='includeResume'
							title='Resume'
							checked={field.state.value as boolean}
							onCheckedChange={(value: boolean) => {
								field.handleChange(value as boolean);
								handleFieldChange('includeResume', value);
							}}
							value={form.getFieldValue('resumeContent')}
							onValueChange={(value: string) => {
								form.setFieldValue('resumeContent', value);
								handleFieldChange('resumeContent', value);
							}}
							placeholder={PLACEHOLDERS.TEMPLATES.RESUME}
							ariaLabel={CONSTANTS.ARIA_LABELS.RESUME_CONTENT}
						>
							<Field
								name='resumeContent'
								form={form}
								validators={{
									onChange: validateSchema(templatesSchema, 'resumeContent'),
								}}
							>
								{(contentField) => (
									<MarkdownInput
										className={CONSTANTS.CLASS_NAMES.MARKDOWN_INPUT}
										value={contentField.state.value || ''}
										onChange={(value: string) => {
											contentField.handleChange(value);
											handleFieldChange('resumeContent', value);
										}}
										placeholder={PLACEHOLDERS.TEMPLATES.RESUME}
										aria-label={CONSTANTS.ARIA_LABELS.RESUME_CONTENT}
										componentName='FormSectionMarkdownInput'
									/>
								)}
							</Field>
						</FormSection>
					)}
				</Field>
			</Form>

			<MustacheReplacementModal
				isOpen={showHelpModal}
				onClose={handleCloseHelpModal}
			/>
		</div>
	);
});
