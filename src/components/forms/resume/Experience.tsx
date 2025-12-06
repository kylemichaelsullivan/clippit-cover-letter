'use client';

import { Field } from '@tanstack/react-form';
import { memo } from 'react';

import { TipTapEditor } from '@/components/ui/input';
import { PLACEHOLDERS } from '@/config';

type ExperienceProps = {
	form: any;
	handleFieldChange: (field: string, value: any) => void;
};

export const Experience = memo(function Experience({
	form,
	handleFieldChange,
}: ExperienceProps) {
	return (
		<Field name='experience' form={form}>
			{(experienceField) => (
				<TipTapEditor
					className='min-h-32 w-full font-mono sm:min-h-48 sm:text-base'
					value={String(experienceField.state.value || '')}
					onChange={(value: string) => {
						experienceField.handleChange(value);
						handleFieldChange('experience', value);
					}}
					placeholder={PLACEHOLDERS.RESUME.EXPERIENCE}
					aria-label='Resume experience section'
					componentName='ResumeExperienceEditor'
				/>
			)}
		</Field>
	);
});
