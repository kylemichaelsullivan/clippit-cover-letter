'use client';

import { memo } from 'react';
import { JobFormField } from './JobFormField';
import { PLACEHOLDERS } from '@/config';

type JobFormFieldsProps = {
	form: any;
	handleFieldChange: (fieldName: string, value: any) => void;
};

export const JobFormFields = memo(function JobFormFields({
	form,
	handleFieldChange,
}: JobFormFieldsProps) {
	return (
		<>
			<JobFormField
				label='Company Name'
				name='companyName'
				form={form}
				placeholder={PLACEHOLDERS.JOB.COMPANY_NAME}
				handleFieldChange={handleFieldChange}
			/>

			<JobFormField
				label='Job Title'
				name='jobTitle'
				form={form}
				placeholder={PLACEHOLDERS.JOB.JOB_TITLE}
				handleFieldChange={handleFieldChange}
			/>

			<JobFormField
				label='Hiring Manager'
				name='hiringManager'
				form={form}
				placeholder={PLACEHOLDERS.JOB.HIRING_MANAGER}
				handleFieldChange={handleFieldChange}
			/>

			<JobFormField
				label='Company Address'
				name='companyAddress'
				form={form}
				placeholder={PLACEHOLDERS.JOB.COMPANY_ADDRESS}
				handleFieldChange={handleFieldChange}
			/>

			<JobFormField
				type='textarea'
				className='min-h-64 sm:min-h-96'
				label='Job Description'
				name='jobDescription'
				form={form}
				placeholder={PLACEHOLDERS.JOB.JOB_DESCRIPTION}
				handleFieldChange={handleFieldChange}
				rows={8}
			/>
		</>
	);
});
