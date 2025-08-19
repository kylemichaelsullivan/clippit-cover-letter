'use client';

import { useCallback } from 'react';
import { useForm } from '@tanstack/react-form';

import { useAppStore, useTemplatesStore } from '@/lib/stores';
import { templatesSchema } from '@/lib/schemas';

export type SummaryFormValues = {
	includeCoverLetter: boolean;
	coverLetterContent: string;
};

export function useSummaryForm(
	onSubmit: (includeCoverLetter: boolean, coverLetterTemplate: string) => void,
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
		[setIncludeCoverLetter, setCoverLetterTemplate],
	);

	return { form, handleFieldChange };
}
