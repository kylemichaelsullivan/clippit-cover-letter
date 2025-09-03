'use client';

import { Button } from '@/components/ui/buttons';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormFieldContainer } from '@/components/forms/core';
import { FormFieldLabel } from '@/components/ui/FormFieldLabel';
import { PLACEHOLDERS } from '@/config';
import type {
	ChangeEvent,
	KeyboardEvent,
	ClipboardEvent,
	MouseEvent,
} from 'react';

type SkillInputProps = {
	value: string;
	groupIndex: number;
	onChange: (value: string) => void;
	onAdd: (skill: string) => void;
	onPaste: (skills: string[]) => void;
};

export function SkillInput({
	value,
	groupIndex,
	onChange,
	onAdd,
	onPaste,
}: SkillInputProps) {
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			onAdd(value);
		}
	};

	const handleInputPaste = (e: ClipboardEvent<HTMLInputElement>) => {
		const pastedText = e.clipboardData.getData('text');
		const parsedSkills = parsePastedSkills(pastedText);

		if (parsedSkills.length > 1) {
			e.preventDefault();
			onPaste(parsedSkills);
		}
	};

	const handleAddClick = (e?: MouseEvent<HTMLButtonElement>) => {
		if (e) {
			e.preventDefault();
		}

		const skill = value.trim();
		if (skill) {
			onAdd(skill);
		}
	};

	return (
		<FormFieldContainer className='relative pb-1'>
			<FormFieldLabel
				htmlFor={`skill-input-${groupIndex}`}
				title='Skill'
				aria-label='Skill'
				labelContent={
					<Button
						componentName='SkillTagsAddButton'
						color='success'
						size='sm'
						positioned
						aria-label='Add Skill'
						title='Add Skill'
						onClick={handleAddClick}
						disabled={!value.trim()}
					>
						<FontAwesomeIcon icon={faThumbtack} aria-hidden='true' />
					</Button>
				}
				spaced
			>
				Skill
			</FormFieldLabel>
			<input
				type='text'
				className='text-sm sm:text-base'
				value={value}
				placeholder={PLACEHOLDERS.SKILLS.SKILL}
				onChange={handleInputChange}
				onKeyDown={handleInputKeyDown}
				onPaste={handleInputPaste}
				id={`skill-input-${groupIndex}`}
			/>
		</FormFieldContainer>
	);
}

const parsePastedSkills = (text: string): string[] => {
	return text
		.split(/[,\n\r]+/)
		.map((skill) => skill.trim())
		.filter((skill) => skill.length > 0);
};
