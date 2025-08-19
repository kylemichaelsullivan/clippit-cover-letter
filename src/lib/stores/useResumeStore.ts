import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { DEFAULTS } from '@/config';
import type { Education, ResumeDetails } from '@/types';

type ResumeState = {
	resumeDetails: ResumeDetails;
	setResumeDetails: (details: ResumeDetails) => void;
	setResumeField: (field: keyof ResumeDetails, value: any) => void;
	setEducation: (education: Education[]) => void;
	addEducation: (education: Education) => void;
	removeEducation: (index: number) => void;
	updateEducation: (index: number, education: Education) => void;
	clearResume: () => void;
};

export const useResumeStore = create<ResumeState>()(
	devtools(
		persist(
			(set) => ({
				resumeDetails: {
					summary: DEFAULTS.INITIAL_STATES.RESUME.summary,
					experience: DEFAULTS.INITIAL_STATES.RESUME.experience,
					education: [
						{
							id: crypto.randomUUID(),
							include: true,
							degree: '',
							graduationYear: '',
							institution: '',
							location: '',
						},
					],
				},

				setResumeDetails: (details) => set({ resumeDetails: details }),

				setResumeField: (field, value) =>
					set((state) => ({
						resumeDetails: {
							...state.resumeDetails,
							[field]: value,
						},
					})),

				setEducation: (education) =>
					set((state) => ({
						resumeDetails: {
							...state.resumeDetails,
							education,
						},
					})),

				addEducation: (education) =>
					set((state) => ({
						resumeDetails: {
							...state.resumeDetails,
							education: [...state.resumeDetails.education, education],
						},
					})),

				removeEducation: (index) =>
					set((state) => {
						const updatedEducation = state.resumeDetails.education.filter(
							(_, i) => i !== index,
						);

						if (updatedEducation.length === 0) {
							updatedEducation.push({
								id: crypto.randomUUID(),
								include: true,
								degree: '',
								graduationYear: '',
								institution: '',
								location: '',
							});
						}

						return {
							resumeDetails: {
								...state.resumeDetails,
								education: updatedEducation,
							},
						};
					}),

				updateEducation: (index, education) =>
					set((state) => {
						const updatedEducation = [...state.resumeDetails.education];
						updatedEducation[index] = education;

						return {
							resumeDetails: {
								...state.resumeDetails,
								education: updatedEducation,
							},
						};
					}),

				clearResume: () =>
					set({
						resumeDetails: {
							summary: DEFAULTS.INITIAL_STATES.RESUME.summary,
							experience: DEFAULTS.INITIAL_STATES.RESUME.experience,
							education: [
								{
									id: crypto.randomUUID(),
									include: true,
									degree: '',
									graduationYear: '',
									institution: '',
									location: '',
								},
							],
						},
					}),
			}),
			{
				name: 'resume-store',
			},
		),
		{
			name: 'resume-store',
		},
	),
);
