'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useForm } from '@tanstack/react-form';

import { useCandidateStore } from '@/lib/stores';
import { candidateDetailsSchema } from '@/lib/schemas';

import type { CandidateDetails } from '@/types';

export type CandidateFormValues = {
	fullName: string;
	email: string;
	phone: string;
	location: string;
	linkedin: string;
	portfolio: string;
};

export function useCandidateForm(
	onSubmit: (details: CandidateDetails) => void,
) {
	const { candidateDetails, setCandidateDetails, setCandidateField } =
		useCandidateStore();
	const lastValuesRef = useRef(candidateDetails);

	const handleFieldChange = useCallback(
		(fieldName: string, value: any) => {
			switch (fieldName) {
				case 'fullName':
					setCandidateField('fullName', value);
					break;
				case 'email':
					setCandidateField('email', value);
					break;
				case 'phone':
					setCandidateField('phone', value);
					break;
				case 'location':
					setCandidateField('location', value);
					break;
				case 'linkedin':
					setCandidateField('linkedin', value);
					break;
				case 'portfolio':
					setCandidateField('portfolio', value);
					break;
			}
		},
		[setCandidateField],
	);

	const form = useForm({
		defaultValues: candidateDetails,
		onSubmit: async ({ value }) => {
			const result = candidateDetailsSchema.safeParse(value);
			if (!result.success) {
				console.error('Validation errors:', result.error.issues);
				return;
			}
			onSubmit(result.data);
		},
	});

	useEffect(() => {
		if (
			candidateDetails &&
			JSON.stringify(candidateDetails) !== JSON.stringify(form.state.values)
		) {
			form.reset(candidateDetails);
		}
	}, [candidateDetails, form]);

	useEffect(() => {
		const values = form.state.values;
		const valuesString = JSON.stringify(values);
		const lastValuesString = JSON.stringify(lastValuesRef.current);

		if (valuesString !== lastValuesString) {
			lastValuesRef.current = values;
			const result = candidateDetailsSchema.safeParse(values);
			if (result.success) {
				setCandidateDetails(result.data);
			}
		}
	}, [form.state.values, setCandidateDetails]);

	return { form, handleFieldChange };
}
