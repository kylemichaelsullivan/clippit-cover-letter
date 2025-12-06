import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the components
vi.mock('@/components/ui/feedback', () => ({
	ConfirmationDialog: ({
		isOpen,
		onClose,
		onConfirm,
		title,
		message,
		confirmText,
		cancelText,
	}: any) => {
		if (!isOpen) return null;
		return (
			<div data-testid='confirmation-dialog'>
				<h2>{title}</h2>
				<p>{message}</p>
				<button onClick={onConfirm} data-testid='confirm-button'>
					{confirmText}
				</button>
				<button onClick={onClose} data-testid='cancel-button'>
					{cancelText}
				</button>
			</div>
		);
	},
}));

import { SkillDialogs } from '@/components/forms/skills/SkillDialogs';

describe('SkillDialogs', () => {
	const mockOnConfirmAdd = vi.fn();
	const mockOnCancelAdd = vi.fn();
	const mockOnConfirmImport = vi.fn();
	const mockOnCancelImport = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders duplicate skill confirmation dialog when showConfirmation is true', () => {
		render(
			<SkillDialogs
				pendingSkill='React'
				pendingSkills={[]}
				showConfirmation={true}
				showImportConfirmation={false}
				onConfirmAdd={mockOnConfirmAdd}
				onCancelAdd={mockOnCancelAdd}
				onConfirmImport={mockOnConfirmImport}
				onCancelImport={mockOnCancelImport}
			/>
		);

		expect(screen.getByTestId('confirmation-dialog')).toBeInTheDocument();
		expect(screen.getByText('Duplicate Skill Found')).toBeInTheDocument();
		expect(
			screen.getByText(
				'The skill "React" already exists in another group. Do you want to add it to this group as well?'
			)
		).toBeInTheDocument();
		expect(screen.getByText('Add Anyway')).toBeInTheDocument();
		expect(screen.getByText('Cancel')).toBeInTheDocument();
	});

	it('renders import skills confirmation dialog when showImportConfirmation is true', () => {
		const pendingSkills = ['React', 'Vue', 'Angular'];
		render(
			<SkillDialogs
				pendingSkill=''
				pendingSkills={pendingSkills}
				showConfirmation={false}
				showImportConfirmation={true}
				onConfirmAdd={mockOnConfirmAdd}
				onCancelAdd={mockOnCancelAdd}
				onConfirmImport={mockOnConfirmImport}
				onCancelImport={mockOnCancelImport}
			/>
		);

		expect(screen.getByTestId('confirmation-dialog')).toBeInTheDocument();
		expect(screen.getByText('Import Multiple Skills')).toBeInTheDocument();
		expect(
			screen.getByText(/Import the following skills\?/)
		).toBeInTheDocument();
		expect(screen.getByText(/React, Vue, Angular/)).toBeInTheDocument();
		expect(screen.getByText('Import')).toBeInTheDocument();
		expect(screen.getByText('Cancel')).toBeInTheDocument();
	});

	it('does not render any dialog when both showConfirmation and showImportConfirmation are false', () => {
		render(
			<SkillDialogs
				pendingSkill=''
				pendingSkills={[]}
				showConfirmation={false}
				showImportConfirmation={false}
				onConfirmAdd={mockOnConfirmAdd}
				onCancelAdd={mockOnCancelAdd}
				onConfirmImport={mockOnConfirmImport}
				onCancelImport={mockOnCancelImport}
			/>
		);

		expect(screen.queryByTestId('confirmation-dialog')).not.toBeInTheDocument();
	});

	it('calls onConfirmAdd when confirm button is clicked in duplicate skill dialog', () => {
		render(
			<SkillDialogs
				pendingSkill='TypeScript'
				pendingSkills={[]}
				showConfirmation={true}
				showImportConfirmation={false}
				onConfirmAdd={mockOnConfirmAdd}
				onCancelAdd={mockOnCancelAdd}
				onConfirmImport={mockOnConfirmImport}
				onCancelImport={mockOnCancelImport}
			/>
		);

		const confirmButton = screen.getByTestId('confirm-button');
		fireEvent.click(confirmButton);

		expect(mockOnConfirmAdd).toHaveBeenCalledTimes(1);
	});

	it('calls onCancelAdd when cancel button is clicked in duplicate skill dialog', () => {
		render(
			<SkillDialogs
				pendingSkill='JavaScript'
				pendingSkills={[]}
				showConfirmation={true}
				showImportConfirmation={false}
				onConfirmAdd={mockOnConfirmAdd}
				onCancelAdd={mockOnCancelAdd}
				onConfirmImport={mockOnConfirmImport}
				onCancelImport={mockOnCancelImport}
			/>
		);

		const cancelButton = screen.getByTestId('cancel-button');
		fireEvent.click(cancelButton);

		expect(mockOnCancelAdd).toHaveBeenCalledTimes(1);
	});

	it('calls onConfirmImport when confirm button is clicked in import dialog', () => {
		render(
			<SkillDialogs
				pendingSkill=''
				pendingSkills={['React', 'Vue']}
				showConfirmation={false}
				showImportConfirmation={true}
				onConfirmAdd={mockOnConfirmAdd}
				onCancelAdd={mockOnCancelAdd}
				onConfirmImport={mockOnConfirmImport}
				onCancelImport={mockOnCancelImport}
			/>
		);

		const confirmButton = screen.getByTestId('confirm-button');
		fireEvent.click(confirmButton);

		expect(mockOnConfirmImport).toHaveBeenCalledTimes(1);
	});

	it('calls onCancelImport when cancel button is clicked in import dialog', () => {
		render(
			<SkillDialogs
				pendingSkill=''
				pendingSkills={['Angular', 'Svelte']}
				showConfirmation={false}
				showImportConfirmation={true}
				onConfirmAdd={mockOnConfirmAdd}
				onCancelAdd={mockOnCancelAdd}
				onConfirmImport={mockOnConfirmImport}
				onCancelImport={mockOnCancelImport}
			/>
		);

		const cancelButton = screen.getByTestId('cancel-button');
		fireEvent.click(cancelButton);

		expect(mockOnCancelImport).toHaveBeenCalledTimes(1);
	});

	it('displays correct message for duplicate skill with special characters', () => {
		render(
			<SkillDialogs
				pendingSkill='C++'
				pendingSkills={[]}
				showConfirmation={true}
				showImportConfirmation={false}
				onConfirmAdd={mockOnConfirmAdd}
				onCancelAdd={mockOnCancelAdd}
				onConfirmImport={mockOnConfirmImport}
				onCancelImport={mockOnCancelImport}
			/>
		);

		expect(
			screen.getByText(
				'The skill "C++" already exists in another group. Do you want to add it to this group as well?'
			)
		).toBeInTheDocument();
	});

	it('displays correct message for import dialog with empty skills array', () => {
		render(
			<SkillDialogs
				pendingSkill=''
				pendingSkills={[]}
				showConfirmation={false}
				showImportConfirmation={true}
				onConfirmAdd={mockOnConfirmAdd}
				onCancelAdd={mockOnCancelAdd}
				onConfirmImport={mockOnConfirmImport}
				onCancelImport={mockOnCancelImport}
			/>
		);

		expect(
			screen.getByText(/Import the following skills\?/)
		).toBeInTheDocument();
	});

	it('displays correct message for import dialog with single skill', () => {
		render(
			<SkillDialogs
				pendingSkill=''
				pendingSkills={['React']}
				showConfirmation={false}
				showImportConfirmation={true}
				onConfirmAdd={mockOnConfirmAdd}
				onCancelAdd={mockOnCancelAdd}
				onConfirmImport={mockOnConfirmImport}
				onCancelImport={mockOnCancelImport}
			/>
		);

		expect(
			screen.getByText(/Import the following skills\?/)
		).toBeInTheDocument();
		expect(screen.getByText(/React/)).toBeInTheDocument();
	});

	it('displays correct message for import dialog with multiple skills', () => {
		const skills = ['React', 'Vue', 'Angular', 'Svelte', 'Next.js'];
		render(
			<SkillDialogs
				pendingSkill=''
				pendingSkills={skills}
				showConfirmation={false}
				showImportConfirmation={true}
				onConfirmAdd={mockOnConfirmAdd}
				onCancelAdd={mockOnCancelAdd}
				onConfirmImport={mockOnConfirmImport}
				onCancelImport={mockOnCancelImport}
			/>
		);

		expect(
			screen.getByText(/Import the following skills\?/)
		).toBeInTheDocument();
		expect(
			screen.getByText(/React, Vue, Angular, Svelte, Next\.js/)
		).toBeInTheDocument();
	});

	it('renders both dialogs when both showConfirmation and showImportConfirmation are true', () => {
		render(
			<SkillDialogs
				pendingSkill='React'
				pendingSkills={['Vue', 'Angular']}
				showConfirmation={true}
				showImportConfirmation={true}
				onConfirmAdd={mockOnConfirmAdd}
				onCancelAdd={mockOnCancelAdd}
				onConfirmImport={mockOnConfirmImport}
				onCancelImport={mockOnCancelImport}
			/>
		);

		const dialogs = screen.getAllByTestId('confirmation-dialog');
		expect(dialogs).toHaveLength(2);
	});

	it('handles empty pendingSkill in duplicate skill dialog', () => {
		render(
			<SkillDialogs
				pendingSkill=''
				pendingSkills={[]}
				showConfirmation={true}
				showImportConfirmation={false}
				onConfirmAdd={mockOnConfirmAdd}
				onCancelAdd={mockOnCancelAdd}
				onConfirmImport={mockOnConfirmImport}
				onCancelImport={mockOnCancelImport}
			/>
		);

		expect(
			screen.getByText(
				'The skill "" already exists in another group. Do you want to add it to this group as well?'
			)
		).toBeInTheDocument();
	});

	it('handles skills with commas in import dialog', () => {
		const skills = ['React, Redux', 'Vue, Vuex', 'Angular, RxJS'];
		render(
			<SkillDialogs
				pendingSkill=''
				pendingSkills={skills}
				showConfirmation={false}
				showImportConfirmation={true}
				onConfirmAdd={mockOnConfirmAdd}
				onCancelAdd={mockOnCancelAdd}
				onConfirmImport={mockOnConfirmImport}
				onCancelImport={mockOnCancelImport}
			/>
		);

		expect(
			screen.getByText(/Import the following skills\?/)
		).toBeInTheDocument();
		expect(
			screen.getByText(/React, Redux, Vue, Vuex, Angular, RxJS/)
		).toBeInTheDocument();
	});
});
