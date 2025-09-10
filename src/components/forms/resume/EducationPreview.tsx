'use client';

import { toCamelCase } from '@/lib/utils';
import type { ParsedEducation } from '@/lib/utils';

const EDUCATION_FIELDS = [
	'Degree',
	'Institution',
	'Location',
	'Graduation Year',
] as const;

type EducationPreviewProps = {
	education: ParsedEducation[];
};

export function EducationPreview({ education }: EducationPreviewProps) {
	return (
		<>
			{education.map((entry, index) => {
				const isMultiple = education.length > 1;

				return (
					<div key={index}>
						{isMultiple && (
							<div className='pb-2 font-semibold'>Education {index + 1}:</div>
						)}
						<div className='flex flex-col gap-1'>
							{EDUCATION_FIELDS.map((label) => {
								const key = toCamelCase(label) as keyof ParsedEducation;
								const value = entry[key];
								return value ? (
									<div key={label}>
										<span className='font-semibold'>{label}:</span> {value}
									</div>
								) : null;
							}).filter(Boolean)}
						</div>
					</div>
				);
			})}
		</>
	);
}
