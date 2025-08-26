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

	const sortExperienceByDate = useCallback(() => {
		const currentExperience = form.getFieldValue('experience') || [];
		const sortedExperience = [...currentExperience].sort((a, b) => {
			// Parse end dates
			const endDateA = a.end;
			const endDateB = b.end;

			// Handle "Present" as later than any month/year
			if (endDateA === 'Present' && endDateB !== 'Present') return -1;
			if (endDateA !== 'Present' && endDateB === 'Present') return 1;
			if (endDateA === 'Present' && endDateB === 'Present') {
				// Both are "Present", sort by start date descending
				return compareDates(b.start, a.start);
			}

			// Compare end dates first (descending)
			const endComparison = compareDates(endDateB, endDateA);
			if (endComparison !== 0) return endComparison;

			// If end dates are equal, sort by start date descending
			return compareDates(b.start, a.start);
		});

		form.setFieldValue('experience', sortedExperience);
		setExperience(sortedExperience);
		updateTemplate({ ...form.state.values, experience: sortedExperience });
	}, [form, setExperience, updateTemplate]);

	// Helper function to compare dates
	const compareDates = (dateA: string, dateB: string) => {
		// Handle empty dates
		if (!dateA && !dateB) return 0;
		if (!dateA) return 1;
		if (!dateB) return -1;

		// Parse dates in "Month Year" format
		const parseDate = (dateStr: string) => {
			const parts = dateStr.split(' ');
			if (parts.length !== 2) return null;

			const month = parts[0];
			const year = parseInt(parts[1], 10);

			if (Number.isNaN(year)) return null;

			const monthIndex = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December',
			].indexOf(month);

			if (monthIndex === -1) return null;

			return { year, month: monthIndex };
		};

		const parsedA = parseDate(dateA);
		const parsedB = parseDate(dateB);

		if (!parsedA && !parsedB) return 0;
		if (!parsedA) return 1;
		if (!parsedB) return -1;

		// Compare by year first, then by month
		if (parsedA.year !== parsedB.year) {
			return parsedA.year - parsedB.year; // Descending (newer years first)
		}
		return parsedA.month - parsedB.month; // Descending (newer months first)
	};

	return {
		form,
		handleFieldChange,
		addEducation,
		removeEducation,
		addExperience,
		removeExperience,
		sortEducationByYear,
		sortExperienceByDate,
	};
}
