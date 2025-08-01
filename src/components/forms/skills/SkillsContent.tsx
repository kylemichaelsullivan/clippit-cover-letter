'use client';

import { Field } from '@tanstack/react-form';

import { SkillGroupName, SkillTags } from './';
import { EmptySkillsMessage } from '@/components/ui/feedback';

import type { SkillGroup } from '@/types';

type SkillsContentProps = {
	form: any; // TanStack Form
	removeSkillGroup: (groupIndex: number) => void;
	handleFieldChange?: (fieldName: string, value: any) => void;
};

export function SkillsContent({
	form,
	removeSkillGroup,
	handleFieldChange,
}: SkillsContentProps) {
	return (
		<Field name='groups' form={form}>
			{(field) => {
				const groups = (field.state.value as SkillGroup[]) || [];

				if (groups.length === 0) {
					return <EmptySkillsMessage />;
				}

				return (
					<div className='SkillsContent flex flex-col gap-3 sm:gap-4'>
						{groups.map((group: SkillGroup, groupIndex: number) => {
							const handleRemoveSkillGroup = () => {
								removeSkillGroup(groupIndex);
							};

							return (
								<div
									key={`${group.id}-${groupIndex}`}
									className='SkillGroupCard border-light-gray flex flex-col gap-3 rounded-lg border bg-white p-3 sm:gap-4 sm:p-4'
								>
									<SkillGroupName
										form={form}
										groupIndex={groupIndex}
										onRemove={handleRemoveSkillGroup}
										handleFieldChange={handleFieldChange}
									/>
									<SkillTags
										form={form}
										groupIndex={groupIndex}
										handleFieldChange={handleFieldChange}
									/>
								</div>
							);
						})}
					</div>
				);
			}}
		</Field>
	);
}
