'use client';

import { Field } from '@tanstack/react-form';

import { SkillGroupName, SkillTags } from './';
import { EmptySkillsMessage } from '@/components/ui/feedback';
import { SkipLinkTarget } from '@/components/ui/navigation';

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
								<SkipLinkTarget
									key={`${group.id}-${groupIndex}`}
									id={`skill-group-${groupIndex + 1}`}
									className='SkillGroupCard skill-group-card border-light-gray flex flex-col gap-3 rounded-lg border bg-white p-3 sm:gap-4 sm:p-4'
									style={{ '--group-index': groupIndex } as React.CSSProperties}
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
										isLastGroup={groupIndex === groups.length - 1}
									/>
								</SkipLinkTarget>
							);
						})}
					</div>
				);
			}}
		</Field>
	);
}
