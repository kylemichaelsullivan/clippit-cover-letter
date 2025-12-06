'use client';

import { Button } from '@/components/ui/buttons';
import { skillsSchema, validateSchema } from '@/lib/schemas';
import { sortSkillsInGroup } from '@/lib/utils';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field } from '@tanstack/react-form';

type SkillTagsListProps = {
	form: any; // TanStack Form
	groupIndex: number;
	onRemoveSkill: (skill: string) => void;
};

export function SkillTagsList({
	form,
	groupIndex,
	onRemoveSkill,
}: SkillTagsListProps) {
	return (
		<Field
			name={`groups.${groupIndex}.skills`}
			form={form}
			validators={{
				onChange: validateSchema(skillsSchema, 'groups'),
			}}
		>
			{(field) => {
				const skills = (field.state.value as string[]) || [];
				if (skills.length === 0) return null;

				const sortedSkills = sortSkillsInGroup(skills);

				return (
					<div className='SkillTagsList flex flex-wrap gap-1.5 pt-1 sm:gap-2'>
						{sortedSkills.map((skill, index) => (
							<span
								className='SkillTag text-gray bg-light-gray flex items-center gap-1 rounded px-1.5 py-0.5 text-xs text-black sm:px-2 sm:py-1 sm:text-sm'
								key={`${skill}-${index}`}
							>
								{skill}
								<Button
									componentName='SkillTagRemoveButton'
									color='secondary'
									size='xs'
									aria-label={`Remove ${skill}`}
									title={`Remove ${skill}`}
									onClick={() => onRemoveSkill(skill)}
								>
									<FontAwesomeIcon icon={faTimes} aria-hidden='true' />
								</Button>
							</span>
						))}
					</div>
				);
			}}
		</Field>
	);
}
