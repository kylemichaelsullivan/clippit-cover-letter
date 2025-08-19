'use client';

import { Button } from '@/components/ui/buttons';
import { EducationContent } from './';
import { Error } from '@/components/ui/feedback';
import { Field } from '@tanstack/react-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { SkipLinkTarget } from '@/components/ui/navigation';
import { useFocusNewEducation } from '@/lib/hooks';

type EducationSectionProps = {
	form: any; // TanStack Form
	error?: string;
	addEducation: () => void;
	removeEducation: (educationIndex: number) => void;
	handleFieldChange?: (fieldName: string, value: any) => void;
};

export function EducationSection({
	form,
	error,
	addEducation,
	removeEducation,
	handleFieldChange,
}: EducationSectionProps) {
	const { registerFocusRef, focusNewEducation } = useFocusNewEducation();

	return (
		<div className={`EducationSection p-4 sm:p-6`}>
			<Field name='education' form={form}>
				{() => {
					return (
						<>
							{error && (
								<Error componentName='EducationSectionError'>{error}</Error>
							)}

							<EducationContent
								form={form}
								removeEducation={removeEducation}
								handleFieldChange={handleFieldChange}
								registerFocusRef={registerFocusRef}
							/>

							<SkipLinkTarget
								className='flex justify-center pt-2'
								id='AddEducationButton'
							>
								<Button
									componentName='AddEducationButton'
									onClick={() => {
										const newEducationIndex = addEducation();
										if (newEducationIndex !== undefined) {
											focusNewEducation(newEducationIndex);
										}
									}}
									title='Add Education'
									color='secondary'
									id='AddEducationButton'
								>
									<FontAwesomeIcon icon={faPlus} aria-hidden='true' />
								</Button>
							</SkipLinkTarget>
						</>
					);
				}}
			</Field>
		</div>
	);
}
