import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { DEFAULTS } from '@/config';
import type { Education, Experience, ResumeDetails } from '@/types';

type ResumeState = {
	resumeDetails: ResumeDetails;
	setResumeDetails: (details: ResumeDetails) => void;
	setResumeField: (field: keyof ResumeDetails, value: any) => void;
	setEducation: (education: Education[]) => void;
	addEducation: (education: Education) => void;
	removeEducation: (index: number) => void;
	updateEducation: (index: number, education: Education) => void;
	setExperience: (experience: Experience[]) => void;
	addExperience: (experience: Experience) => void;
	removeExperience: (index: number) => void;
	updateExperience: (index: number, experience: Experience) => void;
	clearResume: () => void;
};

export const useResumeStore = create<ResumeState>()(
	devtools(
		persist(
			(set) => ({
				resumeDetails: {
					summary: DEFAULTS.INITIAL_STATES.RESUME.summary,
					experience: [
						{
							id: crypto.randomUUID(),
							include: true,
							title: '',
							company: '',
							start: '',
							end: '',
							bullets: [],
						},
					],
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

				setExperience: (experience) =>
					set((state) => ({
						resumeDetails: {
							...state.resumeDetails,
							experience,
						},
					})),

				addExperience: (experience) =>
					set((state) => ({
						resumeDetails: {
							...state.resumeDetails,
							experience: [...state.resumeDetails.experience, experience],
						},
					})),

				removeExperience: (index) =>
					set((state) => {
						const updatedExperience = state.resumeDetails.experience.filter(
							(_, i) => i !== index,
						);

						if (updatedExperience.length === 0) {
							updatedExperience.push({
								id: crypto.randomUUID(),
								include: true,
								title: '',
								company: '',
								start: '',
								end: '',
								bullets: [],
							});
						}

						return {
							resumeDetails: {
								...state.resumeDetails,
								experience: updatedExperience,
							},
						};
					}),

				updateExperience: (index, experience) =>
					set((state) => {
						const updatedExperience = [...state.resumeDetails.experience];
						updatedExperience[index] = experience;

						return {
							resumeDetails: {
								...state.resumeDetails,
								experience: updatedExperience,
							},
						};
					}),

				clearResume: () =>
					set({
						resumeDetails: {
							summary: DEFAULTS.INITIAL_STATES.RESUME.summary,
							experience: [
								{
									id: crypto.randomUUID(),
									include: true,
									title: '',
									company: '',
									start: '',
									end: '',
									bullets: [],
								},
							],
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
