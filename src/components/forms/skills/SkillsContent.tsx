'use client';

import { Field } from '@tanstack/react-form';
import { memo } from 'react';

import { EmptySkillsMessage } from '@/components/ui/feedback';
import { SkipLinkTarget } from '@/components/ui/navigation';
import { SkillGroupName, SkillTags } from './';

import type { SkillGroup } from '@/types';
import type { CSSProperties } from 'react';

type SkillsContentProps = {
	form: any; // TanStack Form
	removeSkillGroup: (groupIndex: number) => void;
	registerFocusRef?: (
		groupIndex: number,
		inputElement: HTMLInputElement | null
	) => void;
};

export const SkillsContent = memo(function SkillsContent({
	form,
	removeSkillGroup,
	registerFocusRef,
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
									className='SkillGroupCard skill-group-card border-light-gray flex flex-col gap-3 rounded-lg border bg-white p-3 sm:gap-4 sm:p-4'
									id={`skill-group-${groupIndex + 1}`}
									key={`${group.id}-${groupIndex}`}
									style={{ '--group-index': groupIndex } as CSSProperties}
								>
									<SkillGroupName
										form={form}
										groupIndex={groupIndex}
										onRemove={handleRemoveSkillGroup}
										registerFocusRef={registerFocusRef}
									/>
									<SkillTags
										form={form}
										groupIndex={groupIndex}
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
});
