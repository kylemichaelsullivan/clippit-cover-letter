import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { JobFormHeader } from '@/components/forms/job/JobFormHeader';
import { useJobStore } from '@/lib/stores';

vi.mock('@/lib/stores', () => ({
	useJobStore: vi.fn(),
}));

vi.mock('@/components/ui', () => ({
	TabTitle: ({
		title,
		actionButton,
	}: {
		title: string;
		actionButton: React.ReactNode;
	}) => (
		<div data-testid='tab-title'>
			<h2>{title}</h2>
			{actionButton}
		</div>
	),
	Button: ({ children, onClick, ...props }: any) => (
		<button onClick={onClick} {...props}>
			{children}
		</button>
	),
}));

vi.mock('@/components/ui/feedback', () => ({
	ConfirmationDialog: ({ isOpen, onConfirm, onClose, title, message }: any) =>
		isOpen ? (
			<div data-testid='confirmation-dialog'>
				<h3>{title}</h3>
				<p>{message}</p>
				<button onClick={onConfirm}>Confirm</button>
				<button onClick={onClose}>Cancel</button>
			</div>
		) : null,
}));

vi.mock('@fortawesome/react-fontawesome', () => ({
	FontAwesomeIcon: ({ icon }: { icon: any }) => (
		<span data-testid='icon'>{icon.iconName}</span>
	),
}));

vi.mock('@fortawesome/free-solid-svg-icons', () => ({
	faTrash: { iconName: 'trash' },
}));

describe('JobFormHeader', () => {
	const mockSetJobDetails = vi.fn();
	const mockUseJobStore = vi.mocked(useJobStore);

	beforeEach(() => {
		vi.clearAllMocks();
		mockUseJobStore.mockReturnValue({
			jobDetails: {
				companyName: '',
				jobTitle: '',
				hiringManager: '',
				companyAddress: '',
				jobDescription: '',
			},
			setJobDetails: mockSetJobDetails,
			setJobField: vi.fn(),
		});

		Object.defineProperty(window, 'localStorage', {
			value: {
				removeItem: vi.fn(),
			},
			writable: true,
		});

		Object.defineProperty(console, 'log', {
			value: vi.fn(),
			writable: true,
		});

		Object.defineProperty(console, 'error', {
			value: vi.fn(),
			writable: true,
		});
	});

	it('renders the header with title and clear button', () => {
		render(<JobFormHeader />);

		expect(screen.getByTestId('tab-title')).toBeInTheDocument();
		expect(screen.getByText('Job Details')).toBeInTheDocument();
		expect(screen.getByText('Clear')).toBeInTheDocument();
		expect(screen.getByTestId('icon')).toBeInTheDocument();
	});

	it('shows confirmation dialog when clear button is clicked', () => {
		render(<JobFormHeader />);

		const clearButton = screen.getByText('Clear');
		fireEvent.click(clearButton);

		expect(screen.getByTestId('confirmation-dialog')).toBeInTheDocument();
		expect(screen.getByText('Clear Job Data')).toBeInTheDocument();
		expect(
			screen.getByText(
				/This will permanently delete all your saved job details/,
			),
		).toBeInTheDocument();
	});

	it('closes confirmation dialog when cancel is clicked', async () => {
		render(<JobFormHeader />);

		const clearButton = screen.getByText('Clear');
		fireEvent.click(clearButton);

		expect(screen.getByTestId('confirmation-dialog')).toBeInTheDocument();

		const cancelButton = screen.getByText('Cancel');
		fireEvent.click(cancelButton);

		await waitFor(() => {
			expect(
				screen.queryByTestId('confirmation-dialog'),
			).not.toBeInTheDocument();
		});
	});

	it('clears job data when confirmed', async () => {
		render(<JobFormHeader />);

		const clearButton = screen.getByText('Clear');
		fireEvent.click(clearButton);

		const confirmButton = screen.getByText('Confirm');
		fireEvent.click(confirmButton);

		await waitFor(() => {
			expect(mockSetJobDetails).toHaveBeenCalledWith({
				companyName: '',
				jobTitle: '',
				hiringManager: '',
				companyAddress: '',
				jobDescription: '',
			});
			expect(window.localStorage.removeItem).toHaveBeenCalledWith('job-store');
			expect(console.log).toHaveBeenCalledWith('Job data cleared successfully');
		});

		expect(screen.queryByTestId('confirmation-dialog')).not.toBeInTheDocument();
	});

	it('handles errors when clearing job data', async () => {
		const consoleErrorSpy = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});
		mockSetJobDetails.mockImplementationOnce(() => {
			throw new Error('Failed to clear');
		});

		render(<JobFormHeader />);

		const clearButton = screen.getByText('Clear');
		fireEvent.click(clearButton);

		const confirmButton = screen.getByText('Confirm');
		fireEvent.click(confirmButton);

		await waitFor(() => {
			expect(consoleErrorSpy).toHaveBeenCalledWith(
				'Failed to clear job data:',
				expect.any(Error),
			);
		});

		expect(screen.queryByTestId('confirmation-dialog')).not.toBeInTheDocument();
		consoleErrorSpy.mockRestore();
	});
});
