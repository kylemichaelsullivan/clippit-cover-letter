'use client';

import { Field } from '@tanstack/react-form';

import { EmptyEducationMessage } from '@/components/ui/feedback';
import { SkipLinkTarget } from '@/components/ui/navigation';
import { EducationItem } from './EducationItem';

import type { Education } from '@/types';
import type { CSSProperties } from 'react';

type EducationContentProps = {
	form: any; // TanStack Form
	removeEducation: (educationIndex: number) => void;
	handleFieldChange?: (fieldName: string, value: any) => void;
	onPaste?: (educationEntries: any[], educationIndex?: number) => void;
	registerFocusRef?: (
		educationIndex: number,
		inputElement: HTMLInputElement | null
	) => void;
};

export function EducationContent({
	form,
	removeEducation,
	handleFieldChange,
	onPaste,
	registerFocusRef,
}: EducationContentProps) {
	return (
		<Field name='education' form={form}>
			{(field) => {
				const educationItems = (field.state.value as Education[]) || [];

				if (educationItems.length === 0) {
					return <EmptyEducationMessage />;
				}

				return (
					<div className='EducationContent flex flex-col gap-3 sm:gap-4'>
						{educationItems.map(
							(education: Education, educationIndex: number) => {
								const handleRemoveEducation = () => {
									removeEducation(educationIndex);
								};

								return (
									<SkipLinkTarget
										className='EducationCard education-card border-light-gray flex flex-col rounded-lg border bg-white p-3 sm:p-4'
										style={
											{ '--education-index': educationIndex } as CSSProperties
										}
										key={`${education.id}-${educationIndex}`}
										id={`education-item-${educationIndex + 1}`}
									>
										<EducationItem
											form={form}
											educationIndex={educationIndex}
											handleFieldChange={handleFieldChange}
											onPaste={onPaste}
											onRemove={handleRemoveEducation}
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
