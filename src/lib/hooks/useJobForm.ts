'use client';

import { useForm } from '@tanstack/react-form';
import { useCallback, useEffect, useRef } from 'react';

import { jobDetailsSchema } from '@/lib/schemas';
import { useJobStore } from '@/lib/stores';

import type { Job } from '@/types';

export type JobFormValues = {
	companyName: string;
	jobTitle: string;
	jobDescription: string;
	hiringManager: string;
	companyAddress: string;
};

export function useJobForm(onSubmit: (job: Job) => void) {
	const { setJobDetails, setJobField, jobDetails } = useJobStore();
	const lastValuesRef = useRef(jobDetails);

	const handleFieldChange = useCallback(
		(fieldName: string, value: any) => {
			switch (fieldName) {
				case 'companyName':
					setJobField('companyName', value);
					break;
				case 'jobTitle':
					setJobField('jobTitle', value);
					break;
				case 'jobDescription':
					setJobField('jobDescription', value);
					break;
				case 'hiringManager':
					setJobField('hiringManager', value);
					break;
				case 'companyAddress':
					setJobField('companyAddress', value);
					break;
			}
		},
		[setJobField]
	);

	const form = useForm({
		defaultValues: jobDetails,
		onSubmit: async ({ value }) => {
			const result = jobDetailsSchema.safeParse(value);
			if (!result.success) {
				console.error('Validation errors:', result.error.issues);
				return;
			}
			onSubmit(result.data);
		},
	});

	useEffect(() => {
		if (
			jobDetails &&
			JSON.stringify(jobDetails) !== JSON.stringify(form.state.values)
		) {
			form.reset(jobDetails);
		}
	}, [jobDetails, form]);

	useEffect(() => {
		const values = form.state.values;
		const valuesString = JSON.stringify(values);
		const lastValuesString = JSON.stringify(lastValuesRef.current);

		if (valuesString !== lastValuesString) {
			lastValuesRef.current = values;
			const result = jobDetailsSchema.safeParse(values);
			if (result.success) {
				setJobDetails(result.data);
			}
		}
	}, [form.state.values, setJobDetails]);

	return { form, handleFieldChange };
}
