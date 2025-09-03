'use client';

import { ConfirmationDialog } from '@/components/ui/feedback';

type SkillDialogsProps = {
	pendingSkill: string;
	pendingSkills: string[];
	showConfirmation: boolean;
	showImportConfirmation: boolean;
	onConfirmAdd: () => void;
	onCancelAdd: () => void;
	onConfirmImport: () => void;
	onCancelImport: () => void;
};

export function SkillDialogs({
	pendingSkill,
	pendingSkills,
	showConfirmation,
	showImportConfirmation,
	onConfirmAdd,
	onCancelAdd,
	onConfirmImport,
	onCancelImport,
}: SkillDialogsProps) {
	return (
		<>
			<ConfirmationDialog
				title='Duplicate Skill Found'
				message={`The skill "${pendingSkill}" already exists in another group. Do you want to add it to this group as well?`}
				confirmText='Add Anyway'
				cancelText='Cancel'
				isOpen={showConfirmation}
				onConfirm={onConfirmAdd}
				onClose={onCancelAdd}
			/>

			<ConfirmationDialog
				title='Import Multiple Skills'
				message={`Import the following skills?\n\n${pendingSkills.join(', ')}`}
				confirmText='Import'
				cancelText='Cancel'
				isOpen={showImportConfirmation}
				onConfirm={onConfirmImport}
				onClose={onCancelImport}
			/>
		</>
	);
}
