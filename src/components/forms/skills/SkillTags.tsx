'use client';

import { useState } from 'react';
import type { KeyboardEvent, ClipboardEvent, MouseEvent } from 'react';

import { Button } from '@/components/ui/buttons';
import { ConfirmationDialog, Error } from '@/components/ui/feedback';
import { faTimes, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { Field } from '@tanstack/react-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormFieldContainer } from '@/components/forms/core';
import { FormFieldLabel } from '@/components/ui/FormFieldLabel';
import { PLACEHOLDERS } from '@/config';
import { skillsSchema, validateSchema } from '@/lib/schemas';
import { SkipLink } from '@/components/ui/navigation';
import { sortSkillsInGroup } from '@/lib/utils';

import type { SkillGroup } from '@/types';

type SkillTagsProps = {
	form: any; // TanStack Form
	groupIndex: number;
	isLastGroup?: boolean;
};

const hasDuplicateSkillInGroup = (
	skills: string[],
	newSkill: string,
): boolean => {
	return skills.some(
		(skill) => skill.toLowerCase().trim() === newSkill.toLowerCase().trim(),
	);
};

const hasDuplicateSkillInOtherGroups = (
	groups: SkillGroup[],
	currentGroupIndex: number,
	newSkill: string,
): boolean => {
	return groups.some(
		(group, index) =>
			index !== currentGroupIndex &&
			group.skills.some(
				(skill) => skill.toLowerCase().trim() === newSkill.toLowerCase().trim(),
			),
	);
};

const parsePastedSkills = (text: string): string[] => {
	return text
		.split(/[,\n\r]+/)
		.map((skill) => skill.trim())
		.filter((skill) => skill.length > 0);
};

export function SkillTags({ form, groupIndex, isLastGroup }: SkillTagsProps) {
	const [inputValue, setInputValue] = useState('');
	const [error, setError] = useState<string>('');
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [pendingSkill, setPendingSkill] = useState<string>('');
	const [showImportConfirmation, setShowImportConfirmation] = useState(false);
	const [pendingSkills, setPendingSkills] = useState<string[]>([]);

	const addSkill = (skill: string) => {
		if (!skill.trim()) return;

		const currentGroups = (form.getFieldValue('groups') as SkillGroup[]) || [];
		const currentSkills = currentGroups[groupIndex]?.skills || [];

		if (hasDuplicateSkillInGroup(currentSkills, skill)) {
			setError(
				'This skill already exists in this group. Please choose a different skill.',
			);
			return;
		}

		if (hasDuplicateSkillInOtherGroups(currentGroups, groupIndex, skill)) {
			setPendingSkill(skill);
			setShowConfirmation(true);
			return;
		}

		const updatedGroups = [...currentGroups];
		updatedGroups[groupIndex] = {
			...updatedGroups[groupIndex],
			skills: [...currentSkills, skill.trim()],
		};
		form.setFieldValue('groups', updatedGroups);
		setError('');
	};

	const addMultipleSkills = (skills: string[]) => {
		const currentGroups = (form.getFieldValue('groups') as SkillGroup[]) || [];
		const currentSkills = currentGroups[groupIndex]?.skills || [];

		const newSkills = skills.filter((skill) => {
			const trimmedSkill = skill.trim();
			if (!trimmedSkill) return false;

			if (hasDuplicateSkillInGroup(currentSkills, trimmedSkill)) {
				return false;
			}

			if (
				hasDuplicateSkillInOtherGroups(currentGroups, groupIndex, trimmedSkill)
			) {
				return false;
			}

			return true;
		});

		if (newSkills.length > 0) {
			const updatedGroups = [...currentGroups];
			updatedGroups[groupIndex] = {
				...updatedGroups[groupIndex],
				skills: [...currentSkills, ...newSkills.map((skill) => skill.trim())],
			};
			form.setFieldValue('groups', updatedGroups);
		}
	};

	const handleConfirmAdd = () => {
		if (pendingSkill) {
			const currentGroups =
				(form.getFieldValue('groups') as SkillGroup[]) || [];
			const currentSkills = currentGroups[groupIndex]?.skills || [];

			const updatedGroups = [...currentGroups];
			updatedGroups[groupIndex] = {
				...updatedGroups[groupIndex],
				skills: [...currentSkills, pendingSkill.trim()],
			};
			form.setFieldValue('groups', updatedGroups);
		}
		setShowConfirmation(false);
		setPendingSkill('');
		setError('');
	};

	const handleCancelAdd = () => {
		setShowConfirmation(false);
		setPendingSkill('');
		setError('');
	};

	const handleConfirmImport = () => {
		if (pendingSkills.length > 0) {
			addMultipleSkills(pendingSkills);
		}
		setShowImportConfirmation(false);
		setPendingSkills([]);
		setInputValue('');
		setError('');
	};

	const handleCancelImport = () => {
		setShowImportConfirmation(false);
		setPendingSkills([]);
		setInputValue('');
		setError('');
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		setError('');
	};

	const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			addSkill(inputValue);
			setInputValue('');
		}
	};

	const handleInputPaste = (e: ClipboardEvent<HTMLInputElement>) => {
		const pastedText = e.clipboardData.getData('text');
		const parsedSkills = parsePastedSkills(pastedText);

		if (parsedSkills.length > 1) {
			e.preventDefault();
			setPendingSkills(parsedSkills);
			setShowImportConfirmation(true);
		}
	};

	const handleRemoveSkill = (skillToRemove: string) => {
		const currentGroups = (form.getFieldValue('groups') as SkillGroup[]) || [];
		const currentSkills = currentGroups[groupIndex]?.skills || [];

		const updatedSkills = currentSkills.filter(
			(skill) => skill !== skillToRemove,
		);

		const updatedGroups = [...currentGroups];
		updatedGroups[groupIndex] = {
			...updatedGroups[groupIndex],
			skills: updatedSkills,
		};
		form.setFieldValue('groups', updatedGroups);
	};

	const handleAddClick = (e?: MouseEvent<HTMLButtonElement>) => {
		if (e) {
			e.preventDefault();
		}

		const skill = inputValue.trim();
		if (skill) {
			addSkill(skill);
			setInputValue('');
		}
	};

	return (
		<>
			<div className='SkillTags flex flex-col gap-2' id='skills-tags'>
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
								disabled={!inputValue.trim()}
							>
								<FontAwesomeIcon icon={faThumbtack} aria-hidden='true' />
							</Button>
						}
						spaced
					>
						Skill
					</FormFieldLabel>
					<input
						id={`skill-input-${groupIndex}`}
						type='text'
						value={inputValue}
						onChange={handleInputChange}
						placeholder={PLACEHOLDERS.SKILLS.SKILL}
						onKeyDown={handleInputKeyDown}
						onPaste={handleInputPaste}
						className='text-sm sm:text-base'
					/>
				</FormFieldContainer>

				{error && <Error componentName='SkillTagsError'>{error}</Error>}

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
										key={`${skill}-${index}`}
										className='SkillTag text-gray bg-light-gray flex items-center gap-1 rounded px-1.5 py-0.5 text-xs text-black sm:px-2 sm:py-1 sm:text-sm'
									>
										{skill}
										<Button
											componentName='SkillTagRemoveButton'
											color='secondary'
											size='xs'
											aria-label={`Remove ${skill}`}
											title={`Remove ${skill}`}
											onClick={() => handleRemoveSkill(skill)}
										>
											<FontAwesomeIcon icon={faTimes} aria-hidden='true' />
										</Button>
									</span>
								))}
							</div>
						);
					}}
				</Field>

				{isLastGroup ? (
					<SkipLink href='#AddSkillGroupButton' destination='Add Group' />
				) : (
					<SkipLink
						href={`#skill-group-${groupIndex + 2}`}
						destination='Next Group'
					/>
				)}
			</div>

			<ConfirmationDialog
				isOpen={showConfirmation}
				onClose={handleCancelAdd}
				onConfirm={handleConfirmAdd}
				title='Duplicate Skill Found'
				message={`The skill "${pendingSkill}" already exists in another group. Do you want to add it to this group as well?`}
				confirmText='Add Anyway'
				cancelText='Cancel'
			/>

			<ConfirmationDialog
				isOpen={showImportConfirmation}
				onClose={handleCancelImport}
				onConfirm={handleConfirmImport}
				title='Import Multiple Skills'
				message={`Import the following skills?\n\n${pendingSkills.join(', ')}`}
				confirmText='Import'
				cancelText='Cancel'
			/>
		</>
	);
}
