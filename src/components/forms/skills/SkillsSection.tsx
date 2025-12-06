'use client';

import { Button } from '@/components/ui/buttons';
import { Error } from '@/components/ui/feedback';
import { SkipLinkTarget } from '@/components/ui/navigation';
import { CONSTANTS } from '@/config';
import { useFocusNewSkillGroup } from '@/lib/hooks';
import { useSkillsStore } from '@/lib/stores';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field } from '@tanstack/react-form';
import { memo } from 'react';
import { SkillsContent, SkillsHeader } from './';

type SkillsSectionProps = {
	form: any; // TanStack Form
	error?: string;
	addSkillGroup: () => void;
	alphabetizeGroups: () => void;
	removeSkillGroup: (groupIndex: number) => void;
};

export const SkillsSection = memo(function SkillsSection({
	form,
	error,
	addSkillGroup,
	alphabetizeGroups,
	removeSkillGroup,
}: SkillsSectionProps) {
	const { focusNewGroup, registerFocusRef } = useFocusNewSkillGroup();
	const { skills } = useSkillsStore();

	return (
		<section
			className={`SkillsSection ${CONSTANTS.CLASS_NAMES.FORM_SECTION} p-4 sm:p-6`}
		>
			<Field name='groups' form={form}>
				{() => {
					return (
						<>
							<SkillsHeader
								onAlphabetizeGroups={alphabetizeGroups}
								groupsCount={skills.groups?.length || 0}
								activeGroupsCount={
									skills.groups?.filter((group) => group.include).length || 0
								}
							/>

							{error && (
								<Error componentName='SkillsSectionError'>{error}</Error>
							)}

							<SkillsContent
								form={form}
								removeSkillGroup={removeSkillGroup}
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
});
