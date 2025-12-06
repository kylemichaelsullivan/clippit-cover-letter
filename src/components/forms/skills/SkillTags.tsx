'use client';

import { Error } from '@/components/ui/feedback';
import { SkipLink } from '@/components/ui/navigation';
import { useSkillsStore } from '@/lib/stores';
import type { SkillGroup } from '@/types';
import { useState } from 'react';
import { SkillDialogs, SkillInput, SkillTagsList } from './';

type SkillTagsProps = {
	form: any; // TanStack Form
	groupIndex: number;
	isLastGroup?: boolean;
};

const hasDuplicateSkillInGroup = (
	skills: string[],
	newSkill: string
): boolean => {
	return skills.some(
		(skill) => skill.toLowerCase().trim() === newSkill.toLowerCase().trim()
	);
};

const hasDuplicateSkillInOtherGroups = (
	groups: SkillGroup[],
	currentGroupIndex: number,
	newSkill: string
): boolean => {
	return groups.some(
		(group, index) =>
			index !== currentGroupIndex &&
			group.skills.some(
				(skill) => skill.toLowerCase().trim() === newSkill.toLowerCase().trim()
			)
	);
};

export function SkillTags({ form, groupIndex, isLastGroup }: SkillTagsProps) {
	const [inputValue, setInputValue] = useState('');
	const [error, setError] = useState<string>('');
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [pendingSkill, setPendingSkill] = useState<string>('');
	const [showImportConfirmation, setShowImportConfirmation] = useState(false);
	const [pendingSkills, setPendingSkills] = useState<string[]>([]);
	const { skills, setSkills } = useSkillsStore();

	const updateStoreAndForm = (updatedGroups: SkillGroup[]) => {
		setSkills({
			...skills,
			groups: updatedGroups,
		});
		form.setFieldValue('groups', updatedGroups);
	};

	const addSkill = (skill: string) => {
		if (!skill.trim()) return;

		const currentGroups = (form.getFieldValue('groups') as SkillGroup[]) || [];
		const currentSkills = currentGroups[groupIndex]?.skills || [];

		if (hasDuplicateSkillInGroup(currentSkills, skill)) {
			setError(
				'This skill already exists in this group. Please choose a different skill.'
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
		updateStoreAndForm(updatedGroups);
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
			updateStoreAndForm(updatedGroups);
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
			updateStoreAndForm(updatedGroups);
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

	const handleInputChange = (value: string) => {
		setInputValue(value);
		setError('');
	};

	const handleInputAdd = (skill: string) => {
		addSkill(skill);
		setInputValue('');
	};

	const handleInputPaste = (skills: string[]) => {
		setPendingSkills(skills);
		setShowImportConfirmation(true);
	};

	const handleRemoveSkill = (skillToRemove: string) => {
		const currentGroups = (form.getFieldValue('groups') as SkillGroup[]) || [];
		const currentSkills = currentGroups[groupIndex]?.skills || [];

		const updatedSkills = currentSkills.filter(
			(skill) => skill !== skillToRemove
		);

		const updatedGroups = [...currentGroups];
		updatedGroups[groupIndex] = {
			...updatedGroups[groupIndex],
			skills: updatedSkills,
		};
		updateStoreAndForm(updatedGroups);
	};

	return (
		<>
			<div className='SkillTags flex flex-col gap-2' id='skills-tags'>
				<SkillInput
					value={inputValue}
					groupIndex={groupIndex}
					onChange={handleInputChange}
					onAdd={handleInputAdd}
					onPaste={handleInputPaste}
				/>

				{error && <Error componentName='SkillTagsError'>{error}</Error>}

				{isLastGroup ? (
					<SkipLink href='#AddSkillGroupButton' destination='Add Group' />
				) : (
					<SkipLink
						href={`#skill-group-${groupIndex + 2}`}
						destination='Next Group'
					/>
				)}

				<SkillTagsList
					form={form}
					groupIndex={groupIndex}
					onRemoveSkill={handleRemoveSkill}
				/>
			</div>

			<SkillDialogs
				pendingSkill={pendingSkill}
				pendingSkills={pendingSkills}
				showConfirmation={showConfirmation}
				showImportConfirmation={showImportConfirmation}
				onConfirmAdd={handleConfirmAdd}
				onCancelAdd={handleCancelAdd}
				onConfirmImport={handleConfirmImport}
				onCancelImport={handleCancelImport}
			/>
		</>
	);
}
