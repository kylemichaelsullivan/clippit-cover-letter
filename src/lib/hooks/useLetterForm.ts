'use client';

import { useForm } from '@tanstack/react-form';
import { useCallback } from 'react';

import { templatesSchema } from '@/lib/schemas';
import { useAppStore, useTemplatesStore } from '@/lib/stores';

export type LetterFormValues = {
	includeCoverLetter: boolean;
	coverLetterContent: string;
};

export function useLetterForm(
	onSubmit: (includeCoverLetter: boolean, coverLetterTemplate: string) => void
) {
	const { includeCoverLetter, setIncludeCoverLetter } = useAppStore();
	const { coverLetterTemplate, setCoverLetterTemplate } = useTemplatesStore();

	const form = useForm({
		defaultValues: {
			includeCoverLetter,
			coverLetterContent: coverLetterTemplate,
		},
		onSubmit: async ({ value }) => {
			const result = templatesSchema
				.pick({
					includeCoverLetter: true,
					coverLetterContent: true,
				})
				.safeParse(value);

			if (!result.success) {
				console.error('Validation errors:', result.error.issues);
				return;
			}

			setIncludeCoverLetter(result.data.includeCoverLetter);
			setCoverLetterTemplate(result.data.coverLetterContent);

			onSubmit(result.data.includeCoverLetter, result.data.coverLetterContent);
		},
	});

	const handleFieldChange = useCallback(
		(fieldName: string, value: any) => {
			switch (fieldName) {
				case 'includeCoverLetter':
					setIncludeCoverLetter(value);
					break;
				case 'coverLetterContent':
					setCoverLetterTemplate(value);
					break;
			}
		},
		[setIncludeCoverLetter, setCoverLetterTemplate]
	);

	return { form, handleFieldChange };
}
