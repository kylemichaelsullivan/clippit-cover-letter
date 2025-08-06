'use client';

import { Field } from '@tanstack/react-form';
import { SkillsHeader, SkillsContent } from './';
import { Button } from '@/components/ui/buttons';
import { SkipLinkTarget } from '@/components/ui/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Error } from '@/components/ui/feedback';
import { CONSTANTS } from '@/config';
import { useFocusNewSkillGroup } from '@/lib/hooks';

import type { SkillGroup } from '@/types';

type SkillsSectionProps = {
	form: any; // TanStack Form
	includeSkills: boolean;
	onIncludeSkillsChange: (include: boolean) => void;
	error?: string;
	addSkillGroup: () => void;
	alphabetizeGroups: () => void;
	removeSkillGroup: (groupIndex: number) => void;
	handleFieldChange?: (fieldName: string, value: any) => void;
};

export function SkillsSection({
	form,
	includeSkills,
	onIncludeSkillsChange,
	error,
	addSkillGroup,
	alphabetizeGroups,
	removeSkillGroup,
	handleFieldChange,
}: SkillsSectionProps) {
	const { registerFocusRef, focusNewGroup } = useFocusNewSkillGroup();
	return (
		<section
			className={`SkillsSection ${CONSTANTS.CLASS_NAMES.FORM_SECTION} p-4 sm:p-6`}
		>
			<Field name='groups' form={form}>
				{(field) => {
					const groups = (field.state.value as SkillGroup[]) || [];
					const skillsCount = groups.reduce(
						(total, group) => total + (group.skills?.length || 0),
						0,
					);

					return (
						<>
							<SkillsHeader
								includeSkills={includeSkills}
								onIncludeSkillsChange={onIncludeSkillsChange}
								onAlphabetizeGroups={alphabetizeGroups}
								skillsCount={skillsCount}
							/>

							{error && (
								<Error componentName='SkillsSectionError'>{error}</Error>
							)}

							<SkillsContent
								form={form}
								removeSkillGroup={removeSkillGroup}
								handleFieldChange={handleFieldChange}
								registerFocusRef={registerFocusRef}
							/>

							<SkipLinkTarget
								className='flex justify-center pt-2'
								id='AddSkillGroupButton'
							>
								<Button
									componentName='AddSkillGroupButton'
									onClick={() => {
										const newGroupIndex = addSkillGroup();
										if (newGroupIndex !== undefined) {
											focusNewGroup(newGroupIndex);
										}
									}}
									title='Add Skill Group'
									color='secondary'
									id='AddSkillGroupButton'
								>
									<FontAwesomeIcon icon={faPlus} aria-hidden='true' />
								</Button>
							</SkipLinkTarget>
						</>
					);
				}}
			</Field>
		</section>
	);
}
