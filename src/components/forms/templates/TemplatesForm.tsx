'use client';

import { memo, useState } from 'react';
import { Field } from '@tanstack/react-form';

import { Button } from '@/components/ui/buttons';
import { CONSTANTS, PLACEHOLDERS } from '@/config';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, FormSection } from '@/components/forms/core';
import { MustacheReplacementModal } from '@/components/ui/feedback';
import { TipTapEditor } from '@/components/ui/input';
import { TabTitle } from '@/components/ui';
import { templatesSchema, validateSchema } from '@/lib/schemas';
import { usePhaseStore } from '@/lib/stores';
import { useTemplatesForm } from '@/lib/hooks';

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
					componentName='TemplatesFormHelpButton'
					color='primary'
					size='md'
					title='Template Variables Help'
					onClick={handleOpenHelpModal}
				>
					<FontAwesomeIcon icon={faCircleQuestion} aria-hidden='true' />
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
									<TipTapEditor
										className='min-h-64 w-full font-mono sm:min-h-96 sm:text-base'
										value={contentField.state.value || ''}
										onChange={(value: string) => {
											contentField.handleChange(value);
											handleFieldChange('coverLetterContent', value);
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
						>
							<Field
								name='resumeContent'
								form={form}
								validators={{
									onChange: validateSchema(templatesSchema, 'resumeContent'),
								}}
							>
								{(contentField) => (
									<TipTapEditor
										className='min-h-64 w-full font-mono sm:min-h-96 sm:text-base'
										value={contentField.state.value || ''}
										onChange={(value: string) => {
											contentField.handleChange(value);
											handleFieldChange('resumeContent', value);
										}}
										placeholder={PLACEHOLDERS.TEMPLATES.RESUME}
										aria-label={CONSTANTS.ARIA_LABELS.RESUME_CONTENT}
										componentName='FormSectionTipTapEditor'
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
