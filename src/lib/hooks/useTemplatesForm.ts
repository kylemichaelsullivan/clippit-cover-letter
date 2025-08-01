'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useForm } from '@tanstack/react-form';

import { useAppStore, useTemplatesStore } from '@/lib/stores';
import { templatesSchema } from '@/lib/schemas';

export type TemplatesFormValues = {
	includeCoverLetter: boolean;
	coverLetterContent: string;
	includeResume: boolean;
	resumeContent: string;
};

export function useTemplatesForm(
	onSubmit: (
		includeCoverLetter: boolean,
		includeResume: boolean,
		coverLetterTemplate: string,
		resumeTemplate: string,
	) => void,
) {
	const {
		includeCoverLetter,
		includeResume,
		setIncludeCoverLetter,
		setIncludeResume,
	} = useAppStore();
	const {
		coverLetterTemplate,
		resumeTemplate,
		setCoverLetterTemplate,
		setResumeTemplate,
	} = useTemplatesStore();

	const lastValuesRef = useRef({
		includeCoverLetter,
		coverLetterContent: coverLetterTemplate,
		includeResume,
		resumeContent: resumeTemplate,
	});

	const handleFieldChange = useCallback(
		(fieldName: string, value: any) => {
			switch (fieldName) {
				case 'includeCoverLetter':
					setIncludeCoverLetter(value);
					break;
				case 'includeResume':
					setIncludeResume(value);
					break;
				case 'coverLetterContent':
					setCoverLetterTemplate(value);
					break;
				case 'resumeContent':
					setResumeTemplate(value);
					break;
			}
		},
		[
			setIncludeCoverLetter,
			setIncludeResume,
			setCoverLetterTemplate,
			setResumeTemplate,
		],
	);

	const form = useForm({
		defaultValues: {
			includeCoverLetter,
			coverLetterContent: coverLetterTemplate,
			includeResume,
			resumeContent: resumeTemplate,
		},
		onSubmit: async ({ value }) => {
			const result = templatesSchema.safeParse(value);
			if (!result.success) {
				console.error('Validation errors:', result.error.issues);
				return;
			}

			setIncludeCoverLetter(result.data.includeCoverLetter);
			setIncludeResume(result.data.includeResume);
			setCoverLetterTemplate(result.data.coverLetterContent);
			setResumeTemplate(result.data.resumeContent);

			onSubmit(
				result.data.includeCoverLetter,
				result.data.includeResume,
				result.data.coverLetterContent,
				result.data.resumeContent,
			);
		},
	});

	useEffect(() => {
		const storeValues = {
			includeCoverLetter,
			coverLetterContent: coverLetterTemplate,
			includeResume,
			resumeContent: resumeTemplate,
		};

		if (JSON.stringify(storeValues) !== JSON.stringify(form.state.values)) {
			form.reset(storeValues);
		}
	}, [
		coverLetterTemplate,
		resumeTemplate,
		includeCoverLetter,
		includeResume,
		form,
	]);

	useEffect(() => {
		const values = form.state.values;
		const valuesString = JSON.stringify(values);
		const lastValuesString = JSON.stringify(lastValuesRef.current);

		if (valuesString !== lastValuesString) {
			lastValuesRef.current = values;
			const result = templatesSchema.safeParse(values);
			if (result.success) {
				setIncludeCoverLetter(result.data.includeCoverLetter);
				setIncludeResume(result.data.includeResume);
				setCoverLetterTemplate(result.data.coverLetterContent);
				setResumeTemplate(result.data.resumeContent);
			}
		}
	}, [
		form.state.values,
		setIncludeCoverLetter,
		setIncludeResume,
		setCoverLetterTemplate,
		setResumeTemplate,
	]);

	return { form, handleFieldChange };
}
