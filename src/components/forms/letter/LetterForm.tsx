'use client';

import { memo } from 'react';
import { CoverLetterSection } from './CoverLetterSection';
import { Form } from '@/components/forms/core';
import { LetterFormHeader } from './LetterFormHeader';
import { MustacheReplacementModal } from '@/components/ui/feedback';
import { useLetterForm } from '@/lib/hooks';
import { useHelpModal } from '@/lib/hooks/useHelpModal';

type LetterFormProps = {
	onSubmit: (includeCoverLetter: boolean, coverLetterTemplate: string) => void;
};

export const LetterForm = memo(function LetterForm({
	onSubmit,
}: LetterFormProps) {
	const { form, handleFieldChange } = useLetterForm(onSubmit);
	const { isOpen, openModal, closeModal } = useHelpModal();

	const handleSubmit = () => {
		form.handleSubmit();
	};

	return (
		<div className='LetterForm flex flex-col gap-6'>
			<LetterFormHeader onOpenHelp={openModal} />

			<Form componentName='LetterFormContent' onSubmit={handleSubmit}>
				<CoverLetterSection form={form} onFieldChange={handleFieldChange} />
			</Form>

			<MustacheReplacementModal isOpen={isOpen} onClose={closeModal} />
		</div>
	);
});
