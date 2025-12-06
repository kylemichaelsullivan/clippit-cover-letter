import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock TanStack Form
vi.mock('@tanstack/react-form', () => ({
	Field: ({ children }: any) => {
		const mockField = {
			state: { value: [] },
		};
		return children(mockField);
	},
}));

// Mock the stores
vi.mock('@/lib/stores', () => ({
	useSkillsStore: () => ({
		skills: {
			groups: [
				{
					id: '1',
					name: 'Programming Languages',
					skills: ['JavaScript', 'TypeScript'],
					include: true,
				},
				{
					id: '2',
					name: 'Frameworks',
					skills: ['React', 'Next.js'],
					include: false,
				},
			],
		},
	}),
}));

// Mock the hooks
vi.mock('@/lib/hooks', () => ({
	useFocusNewSkillGroup: () => ({
		focusNewGroup: vi.fn(),
		registerFocusRef: vi.fn(),
	}),
}));

// Mock the components
vi.mock('@/components/ui/buttons', () => ({
	Button: ({ children, onClick, title, ...props }: any) => (
		<button onClick={onClick} title={title} {...props}>
			{children}
		</button>
	),
}));

vi.mock('@/components/ui/navigation', () => ({
	SkipLinkTarget: ({ children, id }: any) => (
		<div data-testid={`skip-link-${id}`}>{children}</div>
	),
}));

vi.mock('@/components/ui/feedback', () => ({
	Error: ({ children }: any) => <div data-testid='error'>{children}</div>,
}));

vi.mock('@/components/forms/skills', () => ({
	SkillsHeader: ({
		onAlphabetizeGroups,
		groupsCount,
		activeGroupsCount,
	}: any) => (
		<div data-testid='skills-header'>
			<div>Groups: {groupsCount}</div>
			<div>Active: {activeGroupsCount}</div>
			{onAlphabetizeGroups && (
				<button onClick={onAlphabetizeGroups} data-testid='alphabetize-button'>
					Alphabetize
				</button>
			)}
		</div>
	),
	SkillsContent: ({ form, removeSkillGroup, registerFocusRef }: any) => (
		<div data-testid='skills-content'>
			<div>Form: {form ? 'present' : 'missing'}</div>
			<button
				onClick={() => removeSkillGroup(0)}
				data-testid='remove-group-button'
			>
				Remove Group
			</button>
			<div>Register Focus: {registerFocusRef ? 'present' : 'missing'}</div>
		</div>
	),
}));

// Mock Font Awesome
vi.mock('@fortawesome/react-fontawesome', () => ({
	FontAwesomeIcon: ({ icon }: any) => (
		<span data-testid='font-awesome-icon'>{icon?.iconName || 'icon'}</span>
	),
}));

vi.mock('@fortawesome/free-solid-svg-icons', () => ({
	faPlus: { iconName: 'plus' },
}));

// Mock config
vi.mock('@/config', () => ({
	CONSTANTS: {
		CLASS_NAMES: {
			FORM_SECTION: 'form-section',
		},
	},
}));

import { SkillsSection } from '@/components/forms/skills/SkillsSection';

describe('SkillsSection', () => {
	const mockForm = {
		getFieldValue: vi.fn(),
		setFieldValue: vi.fn(),
	};
	const mockError = 'Test error message';
	const mockAddSkillGroup = vi.fn(() => 2);
	const mockAlphabetizeGroups = vi.fn();
	const mockRemoveSkillGroup = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders skills section with correct structure', () => {
		render(
			<SkillsSection
				form={mockForm}
				error={mockError}
				addSkillGroup={mockAddSkillGroup}
				alphabetizeGroups={mockAlphabetizeGroups}
				removeSkillGroup={mockRemoveSkillGroup}
			/>
		);

		expect(screen.getByTestId('skills-header')).toBeInTheDocument();
		expect(screen.getByTestId('skills-content')).toBeInTheDocument();
		expect(
			screen.getByTestId('skip-link-AddSkillGroupButton')
		).toBeInTheDocument();
	});

	it('displays error message when error is provided', () => {
		render(
			<SkillsSection
				form={mockForm}
				error={mockError}
				addSkillGroup={mockAddSkillGroup}
				alphabetizeGroups={mockAlphabetizeGroups}
				removeSkillGroup={mockRemoveSkillGroup}
			/>
		);

		expect(screen.getByTestId('error')).toBeInTheDocument();
		expect(screen.getByText('Test error message')).toBeInTheDocument();
	});

	it('does not display error message when error is not provided', () => {
		render(
			<SkillsSection
				form={mockForm}
				error={undefined}
				addSkillGroup={mockAddSkillGroup}
				alphabetizeGroups={mockAlphabetizeGroups}
				removeSkillGroup={mockRemoveSkillGroup}
			/>
		);

		expect(screen.queryByTestId('error')).not.toBeInTheDocument();
	});

	it('passes correct props to SkillsHeader', () => {
		render(
			<SkillsSection
				form={mockForm}
				error={mockError}
				addSkillGroup={mockAddSkillGroup}
				alphabetizeGroups={mockAlphabetizeGroups}
				removeSkillGroup={mockRemoveSkillGroup}
			/>
		);

		expect(screen.getByText('Groups: 2')).toBeInTheDocument();
		expect(screen.getByText('Active: 1')).toBeInTheDocument();
	});

	it('handles alphabetize groups action', () => {
		render(
			<SkillsSection
				form={mockForm}
				error={mockError}
				addSkillGroup={mockAddSkillGroup}
				alphabetizeGroups={mockAlphabetizeGroups}
				removeSkillGroup={mockRemoveSkillGroup}
			/>
		);

		const alphabetizeButton = screen.getByTestId('alphabetize-button');
		fireEvent.click(alphabetizeButton);

		expect(mockAlphabetizeGroups).toHaveBeenCalledTimes(1);
	});

	it('passes correct props to SkillsContent', () => {
		render(
			<SkillsSection
				form={mockForm}
				error={mockError}
				addSkillGroup={mockAddSkillGroup}
				alphabetizeGroups={mockAlphabetizeGroups}
				removeSkillGroup={mockRemoveSkillGroup}
			/>
		);

		expect(screen.getByText('Form: present')).toBeInTheDocument();
		expect(screen.getByText('Register Focus: present')).toBeInTheDocument();
	});

	it('handles remove skill group action', () => {
		render(
			<SkillsSection
				form={mockForm}
				error={mockError}
				addSkillGroup={mockAddSkillGroup}
				alphabetizeGroups={mockAlphabetizeGroups}
				removeSkillGroup={mockRemoveSkillGroup}
			/>
		);

		const removeButton = screen.getByTestId('remove-group-button');
		fireEvent.click(removeButton);

		expect(mockRemoveSkillGroup).toHaveBeenCalledWith(0);
	});

	it('handles add skill group action with focus', () => {
		render(
			<SkillsSection
				form={mockForm}
				error={mockError}
				addSkillGroup={mockAddSkillGroup}
				alphabetizeGroups={mockAlphabetizeGroups}
				removeSkillGroup={mockRemoveSkillGroup}
			/>
		);

		const addButton = screen
			.getByTestId('skip-link-AddSkillGroupButton')
			.querySelector('button');
		expect(addButton).toBeInTheDocument();
		if (addButton) {
			fireEvent.click(addButton);
			expect(mockAddSkillGroup).toHaveBeenCalledTimes(1);
		}
	});

	it('renders add skill group button with correct attributes', () => {
		render(
			<SkillsSection
				form={mockForm}
				error={mockError}
				addSkillGroup={mockAddSkillGroup}
				alphabetizeGroups={mockAlphabetizeGroups}
				removeSkillGroup={mockRemoveSkillGroup}
			/>
		);

		const addButton = screen
			.getByTestId('skip-link-AddSkillGroupButton')
			.querySelector('button');
		expect(addButton).toBeInTheDocument();
		if (addButton) {
			expect(addButton).toHaveAttribute('title', 'Add Skill Group');
			expect(addButton).toHaveAttribute('id', 'AddSkillGroupButton');
		}
	});

	it('applies correct CSS classes', () => {
		const { container } = render(
			<SkillsSection
				form={mockForm}
				error={mockError}
				addSkillGroup={mockAddSkillGroup}
				alphabetizeGroups={mockAlphabetizeGroups}
				removeSkillGroup={mockRemoveSkillGroup}
			/>
		);

		const section = container.querySelector('section');
		expect(section).toHaveClass(
			'SkillsSection',
			'form-section',
			'p-4',
			'sm:p-6'
		);
	});
});
