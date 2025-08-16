'use client';

import { useState } from 'react';
import type { KeyboardEvent, MouseEvent, ClipboardEvent } from 'react';

import { Button } from '@/components/ui/buttons';
import { Confirmation, Error } from '@/components/ui/feedback';
import { faTimes, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { Field } from '@tanstack/react-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormFieldContainer } from '@/components/forms/core';
import { PLACEHOLDERS } from '@/config';
import { skillsSchema, validateSchema } from '@/lib/schemas';
import { SkipLink } from '@/components/ui/navigation';
import { sortSkillsInGroup } from '@/lib/utils';

import type { SkillGroup } from '@/types';

type SkillTagsProps = {
	form: any; // TanStack Form
	groupIndex: number;
	handleFieldChange?: (fieldName: string, value: any) => void;
	isLastGroup?: boolean;
};

const hasDuplicateSkillInGroup = (
	skills: string[],
	newSkill: string,
): boolean => {
	const normalizedNewSkill = newSkill.toLowerCase().trim();
	return skills.some(
		(skill) => skill.toLowerCase().trim() === normalizedNewSkill,
	);
};

const hasDuplicateSkillInOtherGroups = (
	groups: SkillGroup[],
	currentGroupIndex: number,
	newSkill: string,
): boolean => {
	const normalizedNewSkill = newSkill.toLowerCase().trim();
	return groups.some(
		(group, index) =>
			index !== currentGroupIndex &&
			group.skills.some(
				(skill) => skill.toLowerCase().trim() === normalizedNewSkill,
			),
	);
};

const parsePastedSkills = (pastedText: string): string[] => {
	const lines = pastedText.split('\n').filter((line) => line.trim());

	if (lines.length > 1) {
		return lines
			.map((line) => {
				const cleaned = line.replace(/^[\s]*[-*•\d]+[\s\.]*/, '').trim();
				return cleaned;
			})
			.filter((skill) => skill.length > 0);
	} else {
		return pastedText
			.split(',')
			.map((skill) => skill.trim())
			.filter((skill) => skill.length > 0);
	}
};

export function SkillTags({
	form,
	groupIndex,
	handleFieldChange,
	isLastGroup,
}: SkillTagsProps) {
	const [inputValue, setInputValue] = useState('');
	const [error, setError] = useState<string>('');
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [pendingSkill, setPendingSkill] = useState<string>('');
	const [showImportConfirmation, setShowImportConfirmation] = useState(false);
	const [pendingSkills, setPendingSkills] = useState<string[]>([]);
	const [originalPastedText, setOriginalPastedText] = useState<string>('');

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
		if (handleFieldChange) {
			handleFieldChange('groups', updatedGroups);
		}
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
			if (handleFieldChange) {
				handleFieldChange('groups', updatedGroups);
			}
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
			if (handleFieldChange) {
				handleFieldChange('groups', updatedGroups);
			}
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
		setOriginalPastedText('');
		setInputValue('');
		setError('');
	};

	const handleCancelImport = () => {
		setShowImportConfirmation(false);
		setInputValue(originalPastedText);
		setPendingSkills([]);
		setOriginalPastedText('');
		setError('');
	};

	const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
		const pastedText = e.clipboardData.getData('text');
		const parsedSkills = parsePastedSkills(pastedText);

		if (parsedSkills.length > 1) {
			e.preventDefault();
			setPendingSkills(parsedSkills);
			setOriginalPastedText(pastedText);
			setShowImportConfirmation(true);
		}
	};

	const removeSkill = (skillIndex: number) => {
		const currentGroups = (form.getFieldValue('groups') as SkillGroup[]) || [];
		const currentSkills = currentGroups[groupIndex]?.skills || [];
		const updatedGroups = [...currentGroups];
		updatedGroups[groupIndex] = {
			...updatedGroups[groupIndex],
			skills: currentSkills.filter(
				(_: any, index: number) => index !== skillIndex,
			),
		};
		form.setFieldValue('groups', updatedGroups);
		if (handleFieldChange) {
			handleFieldChange('groups', updatedGroups);
		}
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

	const handleInputChange = (value: string) => {
		setInputValue(value);
		setError('');
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			const skill = inputValue.trim();
			if (skill) {
				addSkill(skill);
				setInputValue('');
			}
		}
	};

	return (
		<div className='SkillTags flex flex-col gap-2' id='skills-tags'>
			<FormFieldContainer className='relative pb-1'>
				<label
					htmlFor={`skill-input-${groupIndex}`}
					className='FormFieldLabel flex items-center justify-between text-base font-medium text-black'
				>
					<span>Skill</span>
				</label>
				<input
					id={`skill-input-${groupIndex}`}
					type='text'
					value={inputValue}
					onChange={(e) => handleInputChange(e.target.value)}
					placeholder={PLACEHOLDERS.SKILLS.SKILL}
					onKeyDown={handleKeyDown}
					onPaste={handlePaste}
					className='text-sm sm:text-base'
				/>
				<Button
					componentName='SkillTagsAddButton'
					color='success'
					size='sm'
					aria-label='Add Skill'
					title='Add Skill'
					onClick={handleAddClick}
					disabled={!inputValue.trim()}
				>
					<FontAwesomeIcon icon={faThumbtack} aria-hidden='true' />
				</Button>
			</FormFieldContainer>

			{error && <Error componentName='SkillTagsError'>{error}</Error>}

			{showConfirmation && (
				<Confirmation
					onConfirm={handleConfirmAdd}
					onCancel={handleCancelAdd}
					componentName='SkillTagsConfirmation'
				>
					&ldquo;{pendingSkill}&rdquo; is in another group already. Do you want
					to add it to this group as well?
				</Confirmation>
			)}

			{showImportConfirmation && (
				<Confirmation
					onConfirm={handleConfirmImport}
					onCancel={handleCancelImport}
					confirmText='Yes'
					cancelText='No'
					componentName='SkillTagsImportConfirmation'
				>
					Import {pendingSkills.length} skills as separate skill tags?
					<br />
					<small className='text-gray'>
						{pendingSkills.slice(0, 5).join(', ')}
						{pendingSkills.length > 5 &&
							` and ${pendingSkills.length - 5} more...`}
					</small>
				</Confirmation>
			)}

			{isLastGroup ? (
				<SkipLink href='#AddSkillGroupButton' destination='Add Group' />
			) : (
				<SkipLink
					href={`#skill-group-${groupIndex + 2}`}
					destination='Next Group'
				/>
			)}

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

					const sortedSkills = sortSkillsInGroup(skills).map((skill) => ({
						skill,
						originalIndex: skills.indexOf(skill),
					}));

					return (
						<div className='SkillTagsList flex flex-wrap gap-1.5 pt-1 sm:gap-2'>
							{sortedSkills.map(({ skill, originalIndex }) => (
								<span
									key={originalIndex}
									className='SkillTag text-gray bg-light-gray flex items-center gap-1 rounded px-1.5 py-0.5 text-xs text-black sm:px-2 sm:py-1 sm:text-sm'
								>
									{skill}
									<Button
										componentName='SkillTagRemoveButton'
										color='secondary'
										size='xs'
										aria-label={`Remove ${skill}`}
										title={`Remove ${skill}`}
										onClick={() => removeSkill(originalIndex)}
									>
										<FontAwesomeIcon icon={faTimes} aria-hidden='true' />
									</Button>
								</span>
							))}
						</div>
					);
				}}
			</Field>
		</div>
	);
}
