'use client';

import { Button } from '@/components/ui/buttons';
import { Error } from '@/components/ui/feedback';
import { SkipLinkTarget } from '@/components/ui/navigation';
import { useFocusNewExperience } from '@/lib/hooks/useFocusNewExperience';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field } from '@tanstack/react-form';
import { ExperienceContent } from './';

type ExperienceSectionProps = {
	form: any; // TanStack Form
	error?: string;
	addExperience: () => void;
	removeExperience: (experienceIndex: number) => void;
	handleFieldChange?: (fieldName: string, value: any) => void;
};

export function ExperienceSection({
	form,
	error,
	addExperience,
	removeExperience,
	handleFieldChange,
}: ExperienceSectionProps) {
	const { registerFocusRef, focusNewExperience } = useFocusNewExperience();

	return (
		<div className='ExperienceSection'>
			<Field name='experience' form={form}>
				{() => {
					return (
						<>
							{error && (
								<Error componentName='ExperienceSectionError'>{error}</Error>
							)}

							<ExperienceContent
								form={form}
								removeExperience={removeExperience}
								handleFieldChange={handleFieldChange}
								registerFocusRef={registerFocusRef}
							/>

							<SkipLinkTarget
								className='flex justify-center pt-4'
								id='AddExperienceButton'
							>
								<Button
									componentName='AddExperienceButton'
									onClick={() => {
										const newExperienceIndex = addExperience();
										if (newExperienceIndex !== undefined) {
											focusNewExperience(newExperienceIndex);
										}
									}}
									title='Add Experience'
									color='secondary'
									id='AddExperienceButton'
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
