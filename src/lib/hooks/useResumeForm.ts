'use client';

import { useCallback } from 'react';
import { useForm } from '@tanstack/react-form';

import { useAppStore, useResumeStore, useTemplatesStore } from '@/lib/stores';
import { DEFAULTS } from '@/config';
import type { Education } from '@/types';

export type ResumeFormValues = {
	includeResume: boolean;
	summary: string;
	experience: string;
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

const formatEducationText = (education: Education[]): string => {
	return education
		.filter((edu) => edu.include !== false && (edu.degree || edu.institution))
		.map((edu) => {
			const locationText = edu.location ? ` | ${edu.location}` : '';
			return `<h3>${edu.degree}</h3>
<p><span class="text-shadow">${edu.institution}</span>${locationText}</p>`;
		})
		.join('\n\n');
};

const createResumeTemplate = (
	summary: string,
	experience: string,
	education: Education[],
): string => {
	return `<h2>Summary</h2>
{{summary}}

<h2>Skills</h2>
{{skills}}

<h2>Experience</h2>
{{experience}}

<h2>Education</h2>
{{education}}`;
};

const parseResumeTemplate = (template: string) => {
	const sections = {
		summary: '',
		experience: '',
		education: [] as Education[],
	};
	const lines = template.split('\n');
	let currentSection: 'summary' | 'experience' | 'education' = 'summary';
	let sectionContent: string[] = [];

	for (const line of lines) {
		const trimmedLine = line.trim();
		const lowerLine = trimmedLine.toLowerCase();

		if (lowerLine.startsWith('<h2>summary</h2>')) {
			if (currentSection === 'summary')
				sections.summary = sectionContent.join('\n').trim();
			currentSection = 'summary';
			sectionContent = [];
		} else if (lowerLine.startsWith('<h2>skills</h2>')) {
			if (currentSection === 'summary')
				sections.summary = sectionContent.join('\n').trim();
			currentSection = 'summary';
			sectionContent = [];
		} else if (lowerLine.startsWith('<h2>experience</h2>')) {
			if (currentSection === 'summary')
				sections.summary = sectionContent.join('\n').trim();
			currentSection = 'experience';
			sectionContent = [];
		} else if (lowerLine.startsWith('<h2>education</h2>')) {
			if (currentSection === 'summary')
				sections.summary = sectionContent.join('\n').trim();
			else if (currentSection === 'experience')
				sections.experience = sectionContent.join('\n').trim();
			currentSection = 'education';
			sectionContent = [];
		} else if (trimmedLine) {
			sectionContent.push(line);
		}
	}

	if (currentSection === 'summary')
		sections.summary = sectionContent.join('\n').trim();
	else if (currentSection === 'experience')
		sections.experience = sectionContent.join('\n').trim();

	return sections;
};

export function useResumeForm(
	onSubmit: (
		includeResume: boolean,
		summary: string,
		experience: string,
		education: Education[],
	) => void,
) {
	const { includeResume, setIncludeResume } = useAppStore();
	const { resumeDetails, setResumeDetails, setEducation } = useResumeStore();
	const { resumeTemplate, setResumeTemplate } = useTemplatesStore();

	const existingSections = parseResumeTemplate(resumeTemplate);
	const initialEducation =
		resumeDetails.education.length > 0
			? resumeDetails.education
			: existingSections.education.length > 0
				? existingSections.education
				: [createDefaultEducation()];

	const form = useForm({
		defaultValues: {
			includeResume,
			summary:
				resumeDetails.summary ||
				existingSections.summary ||
				DEFAULTS.INITIAL_STATES.RESUME.summary,
			experience:
				resumeDetails.experience ||
				existingSections.experience ||
				DEFAULTS.INITIAL_STATES.RESUME.experience,
			education: initialEducation,
		},
		onSubmit: async ({ value }) => {
			setIncludeResume(value.includeResume);
			setResumeDetails({
				summary: value.summary,
				experience: value.experience,
				education: value.education,
			});
			setResumeTemplate(
				createResumeTemplate(value.summary, value.experience, value.education),
			);
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
			setResumeTemplate(
				createResumeTemplate(
					values.summary || '',
					values.experience || '',
					values.education || [],
				),
			);
		},
		[setResumeDetails, setResumeTemplate],
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
		sortEducationByYear,
	};
}
