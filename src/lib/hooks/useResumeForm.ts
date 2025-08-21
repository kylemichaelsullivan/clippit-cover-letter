'use client';

import { useCallback } from 'react';
import { useForm } from '@tanstack/react-form';

import { useAppStore, useResumeStore } from '@/lib/stores';
import { DEFAULTS } from '@/config';
import type { Education, Experience } from '@/types';

export type ResumeFormValues = {
	includeResume: boolean;
	summary: string;
	experience: Experience[];
	education: Education[];
};

const createDefaultEducation = (): Education => ({
	id: crypto.randomUUID(),
	include: true,
	degree: '',
	graduationYear: '',
	institution: '',
	location: '',
});

const createDefaultExperience = (): Experience => ({
	id: crypto.randomUUID(),
	include: true,
	title: '',
	company: '',
	start: '',
	end: '',
	bullets: [],
});

export function useResumeForm(
	onSubmit: (
		includeResume: boolean,
		summary: string,
		experience: Experience[],
		education: Education[],
	) => void,
) {
	const { includeResume, setIncludeResume } = useAppStore();
	const { resumeDetails, setResumeDetails, setEducation, setExperience } =
		useResumeStore();
	const initialEducation =
		resumeDetails.education.length > 0
			? resumeDetails.education
			: [createDefaultEducation()];

	const initialExperience =
		resumeDetails.experience.length > 0
			? resumeDetails.experience
			: [createDefaultExperience()];

	const form = useForm({
		defaultValues: {
			includeResume,
			summary: resumeDetails.summary || DEFAULTS.INITIAL_STATES.RESUME.summary,
			experience: initialExperience,
			education: initialEducation,
		},
		onSubmit: async ({ value }) => {
			setIncludeResume(value.includeResume);
			setResumeDetails({
				summary: value.summary,
				experience: value.experience,
				education: value.education,
			});
			onSubmit(
				value.includeResume,
				value.summary,
				value.experience,
				value.education,
			);
		},
	});

	const updateTemplate = useCallback(
		(values: ResumeFormValues) => {
			setResumeDetails({
				summary: values.summary || '',
				experience: values.experience || '',
				education: values.education || [],
			});
		},
		[setResumeDetails],
	);

	const handleFieldChange = useCallback(
		(fieldName: string, value: any) => {
			if (fieldName === 'includeResume') {
				setIncludeResume(value);
				return;
			}

			const currentValues = form.state.values;
			updateTemplate(currentValues);
		},
		[setIncludeResume, updateTemplate, form.state.values],
	);

	const addEducation = useCallback(() => {
		const currentEducation = form.getFieldValue('education') || [];
		const newEducation = createDefaultEducation();
		const updatedEducation = [...currentEducation, newEducation];

		form.setFieldValue('education', updatedEducation);
		setEducation(updatedEducation);
		updateTemplate({ ...form.state.values, education: updatedEducation });

		return currentEducation.length;
	}, [form, setEducation, updateTemplate]);

	const addExperience = useCallback(() => {
		const currentExperience = form.getFieldValue('experience') || [];
		const newExperience = createDefaultExperience();
		const updatedExperience = [...currentExperience, newExperience];

		form.setFieldValue('experience', updatedExperience);
		setExperience(updatedExperience);
		updateTemplate({ ...form.state.values, experience: updatedExperience });

		return currentExperience.length;
	}, [form, setExperience, updateTemplate]);

	const removeEducation = useCallback(
		(educationIndex: number) => {
			const currentEducation = form.getFieldValue('education') || [];
			let updatedEducation = currentEducation.filter(
				(_: Education, index: number) => index !== educationIndex,
			);

			if (updatedEducation.length === 0) {
				updatedEducation = [createDefaultEducation()];
			}

			form.setFieldValue('education', updatedEducation);
			setEducation(updatedEducation);
			updateTemplate({ ...form.state.values, education: updatedEducation });
		},
		[form, setEducation, updateTemplate],
	);

	const removeExperience = useCallback(
		(experienceIndex: number) => {
			const currentExperience = form.getFieldValue('experience') || [];
			let updatedExperience = currentExperience.filter(
				(_: Experience, index: number) => index !== experienceIndex,
			);

			if (updatedExperience.length === 0) {
				updatedExperience = [createDefaultExperience()];
			}

			form.setFieldValue('experience', updatedExperience);
			setExperience(updatedExperience);
			updateTemplate({ ...form.state.values, experience: updatedExperience });
		},
		[form, setExperience, updateTemplate],
	);

	const sortEducationByYear = useCallback(() => {
		const currentEducation = form.getFieldValue('education') || [];
		const sortedEducation = [...currentEducation].sort((a, b) => {
			const yearA = parseInt(a.graduationYear || '', 10);
			const yearB = parseInt(b.graduationYear || '', 10);
			const isValidA = !Number.isNaN(yearA);
			const isValidB = !Number.isNaN(yearB);
			if (isValidA && isValidB) return yearB - yearA;
			if (isValidA) return -1;
			if (isValidB) return 1;
			return 0;
		});

		form.setFieldValue('education', sortedEducation);
		setEducation(sortedEducation);
		updateTemplate({ ...form.state.values, education: sortedEducation });
	}, [form, setEducation, updateTemplate]);

	return {
		form,
		handleFieldChange,
		addEducation,
		removeEducation,
		addExperience,
		removeExperience,
		sortEducationByYear,
	};
}
