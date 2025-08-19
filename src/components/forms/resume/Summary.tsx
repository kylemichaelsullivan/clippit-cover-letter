'use client';

import { memo } from 'react';
import { Field } from '@tanstack/react-form';

import { TipTapEditor } from '@/components/ui/input';
import { PLACEHOLDERS } from '@/config';

type SummaryProps = {
	form: any;
	handleFieldChange: (field: string, value: any) => void;
};

export const Summary = memo(function Summary({
	form,
	handleFieldChange,
}: SummaryProps) {
	return (
		<Field name='summary' form={form}>
			{(summaryField) => (
				<TipTapEditor
					className='min-h-32 w-full font-mono sm:min-h-48 sm:text-base'
					value={String(summaryField.state.value || '')}
					onChange={(value: string) => {
						summaryField.handleChange(value);
						handleFieldChange('summary', value);
					}}
					placeholder={PLACEHOLDERS.RESUME.SUMMARY}
					aria-label='Resume summary section'
					componentName='ResumeSummaryEditor'
				/>
			)}
		</Field>
	);
});
