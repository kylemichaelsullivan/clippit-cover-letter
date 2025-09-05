import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { JobForm } from '@/components/forms/job/JobForm';
import { useJobForm } from '@/lib/hooks';
import { usePhaseStore } from '@/lib/stores';

vi.mock('@/lib/hooks', () => ({
	useJobForm: vi.fn(),
}));

vi.mock('@/lib/stores', () => ({
	usePhaseStore: vi.fn(),
}));

vi.mock('@/components/forms/core', () => ({
	Form: ({ children, onSubmit, componentName }: any) => (
		<form onSubmit={onSubmit} data-testid={componentName}>
			{children}
		</form>
	),
}));

vi.mock('@/components/forms/job/JobFormHeader', () => ({
	JobFormHeader: () => <div data-testid='job-form-header'>Job Form Header</div>,
}));

vi.mock('@/components/forms/job/JobFormFields', () => ({
	JobFormFields: ({ form, handleFieldChange }: any) => (
		<div data-testid='job-form-fields'>
			<span>Form: {form ? 'present' : 'missing'}</span>
			<span>Handler: {handleFieldChange ? 'present' : 'missing'}</span>
		</div>
	),
}));

vi.mock('@/components/forms/job/JobSkillsSection', () => ({
	JobSkillsSection: () => (
		<div data-testid='job-skills-section'>Job Skills Section</div>
	),
}));

describe('JobForm', () => {
	const mockHandleFieldChange = vi.fn();
	const mockHandleSubmit = vi.fn();
	const mockForm = {
		handleSubmit: mockHandleSubmit,
		state: { values: {} },
	} as any;
	const mockUseJobForm = vi.mocked(useJobForm);
	const mockUsePhaseStore = vi.mocked(usePhaseStore);

	beforeEach(() => {
		vi.clearAllMocks();
		mockUseJobForm.mockReturnValue({
			form: mockForm,
			handleFieldChange: mockHandleFieldChange,
		});
		mockUsePhaseStore.mockReturnValue({
			currentPhase: 'job',
		} as any);
	});

	it('renders all components when current phase is job', () => {
		render(<JobForm onSubmit={vi.fn()} />);

		expect(screen.getByTestId('job-form-header')).toBeInTheDocument();
		expect(screen.getByTestId('job-form-fields')).toBeInTheDocument();
		expect(screen.getByTestId('job-skills-section')).toBeInTheDocument();
		expect(screen.getByTestId('JobFormContent')).toBeInTheDocument();
	});

	it('passes form and handleFieldChange to JobFormFields', () => {
		render(<JobForm onSubmit={vi.fn()} />);

		const formFields = screen.getByTestId('job-form-fields');
		expect(formFields).toHaveTextContent('Form: present');
		expect(formFields).toHaveTextContent('Handler: present');
	});

	it('calls form.handleSubmit when form is submitted', () => {
		render(<JobForm onSubmit={vi.fn()} />);

		const form = screen.getByTestId('JobFormContent');
		fireEvent.submit(form);

		expect(mockHandleSubmit).toHaveBeenCalled();
	});

	it('returns null when current phase is not job', () => {
		mockUsePhaseStore.mockReturnValue({
			currentPhase: 'candidate',
		} as any);

		const { container } = render(<JobForm onSubmit={vi.fn()} />);

		expect(container.firstChild).toBeNull();
	});

	it('returns null when current phase is undefined', () => {
		mockUsePhaseStore.mockReturnValue({
			currentPhase: undefined,
		} as any);

		const { container } = render(<JobForm onSubmit={vi.fn()} />);

		expect(container.firstChild).toBeNull();
	});

	it('calls onSubmit prop when form is submitted', async () => {
		const mockOnSubmit = vi.fn();
		render(<JobForm onSubmit={mockOnSubmit} />);

		const form = screen.getByTestId('JobFormContent');
		fireEvent.submit(form);

		expect(mockHandleSubmit).toHaveBeenCalled();
	});

	it('renders with correct CSS classes', () => {
		render(<JobForm onSubmit={vi.fn()} />);

		const jobForm = screen.getByTestId('JobFormContent').parentElement;
		expect(jobForm).toHaveClass('JobForm', 'flex', 'flex-col', 'gap-6');
	});

	it('handles different phase values correctly', () => {
		const phases = ['candidate', 'skills', 'letter', 'resume', 'templates'];

		phases.forEach((phase) => {
			mockUsePhaseStore.mockReturnValue({
				currentPhase: phase,
			} as any);

			const { container, unmount } = render(<JobForm onSubmit={vi.fn()} />);
			expect(container.firstChild).toBeNull();
			unmount();
		});
	});
});
