'use client';

import { Field } from '@tanstack/react-form';

import { EmptyExperienceMessage } from '@/components/ui/feedback';
import { SkipLinkTarget } from '@/components/ui/navigation';
import { ExperienceItem } from './ExperienceItem';

import type { Experience } from '@/types';
import type { CSSProperties } from 'react';

type ExperienceContentProps = {
	form: any; // TanStack Form
	removeExperience: (experienceIndex: number) => void;
	handleFieldChange?: (fieldName: string, value: any) => void;
	registerFocusRef?: (
		experienceIndex: number,
		inputElement: HTMLInputElement | null
	) => void;
};

export function ExperienceContent({
	form,
	removeExperience,
	handleFieldChange,
	registerFocusRef,
}: ExperienceContentProps) {
	return (
		<Field name='experience' form={form}>
			{(field) => {
				const experienceItems = Array.isArray(field.state.value)
					? field.state.value
					: [];

				if (experienceItems.length === 0) {
					return <EmptyExperienceMessage />;
				}

				return (
					<div className='ExperienceContent flex flex-col gap-3 sm:gap-4'>
						{experienceItems.map(
							(experience: Experience, experienceIndex: number) => {
								const handleRemoveExperience = () => {
									removeExperience(experienceIndex);
								};

								return (
									<SkipLinkTarget
										key={`${experience.id}-${experienceIndex}`}
										id={`experience-item-${experienceIndex + 1}`}
										className='ExperienceCard experience-card border-light-gray flex flex-col gap-3 rounded-lg border bg-white p-3 sm:gap-4 sm:p-4'
										style={
											{ '--experience-index': experienceIndex } as CSSProperties
										}
									>
										<ExperienceItem
											form={form}
											experienceIndex={experienceIndex}
											onRemove={handleRemoveExperience}
											handleFieldChange={handleFieldChange}
											registerFocusRef={registerFocusRef}
										/>
									</SkipLinkTarget>
								);
							}
						)}
					</div>
				);
			}}
		</Field>
	);
}
