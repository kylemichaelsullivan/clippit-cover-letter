import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BulletManager } from '@/components/forms/core/BulletManager';

// Mock the Bullet and DraggableBullet components
vi.mock('@/components/forms/resume/Bullet', () => ({
	Bullet: ({ value, onChange, onRemove, onDoubleClick }: any) => (
		<div data-testid='bullet'>
			<input
				data-testid='bullet-input'
				placeholder='Enter bullet point...'
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			<button onClick={onRemove} data-testid='remove-bullet'>
				Remove
			</button>
			<button onClick={onDoubleClick} data-testid='enable-drag'>
				Enable Drag
			</button>
		</div>
	),
}));

vi.mock('@/components/forms/resume/DraggableBullet', () => ({
	DraggableBullet: ({ value, onChange, onRemove, onDoubleClick }: any) => (
		<div data-testid='draggable-bullet'>
			<input
				data-testid='draggable-bullet-input'
				placeholder='Enter bullet point...'
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			<button onClick={onRemove} data-testid='remove-draggable-bullet'>
				Remove
			</button>
			<button onClick={onDoubleClick} data-testid='disable-drag'>
				Disable Drag
			</button>
		</div>
	),
}));

// Mock TanStack Form Field
vi.mock('@tanstack/react-form', () => ({
	Field: ({ children, name, form }: any) => {
		const mockField = {
			state: { value: form.getFieldValue(name) || [] },
			handleChange: vi.fn(),
		};
		return children(mockField);
	},
}));

describe('BulletManager', () => {
	const mockForm = {
		getFieldValue: vi.fn(),
		setFieldValue: vi.fn(),
	};
	const defaultProps = {
		form: mockForm,
		fieldPath: 'experience.0.bullets',
		placeholder: 'Enter achievement...',
		label: 'Achievements',
	};

	beforeEach(() => {
		vi.clearAllMocks();
		mockForm.getFieldValue.mockReturnValue(['First bullet', 'Second bullet']);
	});

	it('renders with correct label', () => {
		render(<BulletManager {...defaultProps} />);

		expect(screen.getByText('Achievements')).toBeInTheDocument();
	});

	it('renders toggle drag mode button', () => {
		render(<BulletManager {...defaultProps} />);

		const dragButton = screen.getByTitle('Enable Drag Mode');
		expect(dragButton).toBeInTheDocument();
	});

	it('renders add bullet button', () => {
		render(<BulletManager {...defaultProps} />);

		const addButton = screen.getByTitle('Add Bullet Point');
		expect(addButton).toBeInTheDocument();
	});

	it('toggles drag mode when toggle button is clicked', () => {
		render(<BulletManager {...defaultProps} />);

		const dragButton = screen.getByTitle('Enable Drag Mode');
		fireEvent.click(dragButton);

		expect(screen.getByTitle('Disable Drag Mode')).toBeInTheDocument();
	});

	it('adds new bullet when add button is clicked', () => {
		render(<BulletManager {...defaultProps} />);

		const addButton = screen.getByTitle('Add Bullet Point');
		fireEvent.click(addButton);

		expect(mockForm.setFieldValue).toHaveBeenCalledWith(
			'experience.0.bullets',
			['First bullet', 'Second bullet', ''],
		);
	});

	it('calls onFieldChange when adding bullet', () => {
		const mockOnFieldChange = vi.fn();
		render(
			<BulletManager {...defaultProps} onFieldChange={mockOnFieldChange} />,
		);

		const addButton = screen.getByTitle('Add Bullet Point');
		fireEvent.click(addButton);

		expect(mockOnFieldChange).toHaveBeenCalledWith('experience.0.bullets', [
			'First bullet',
			'Second bullet',
			'',
		]);
	});

	it('renders existing bullets in normal mode by default', () => {
		render(<BulletManager {...defaultProps} />);

		expect(screen.getAllByTestId('bullet')).toHaveLength(2);
		expect(screen.queryByTestId('draggable-bullet')).not.toBeInTheDocument();
	});

	it('renders bullets in drag mode when enabled', () => {
		render(<BulletManager {...defaultProps} />);

		const dragButton = screen.getByTitle('Enable Drag Mode');
		fireEvent.click(dragButton);

		expect(screen.getAllByTestId('draggable-bullet')).toHaveLength(2);
		expect(screen.queryByTestId('bullet')).not.toBeInTheDocument();
	});

	it('shows empty state message when no bullets exist', () => {
		// Create a new mock form for this test
		const emptyMockForm = {
			getFieldValue: vi.fn().mockReturnValue([]),
			setFieldValue: vi.fn(),
		};

		render(<BulletManager {...defaultProps} form={emptyMockForm} />);

		expect(
			screen.getByText('No bullets yet. Click the + button to add your items.'),
		).toBeInTheDocument();
	});

	it('applies custom className when provided', () => {
		render(<BulletManager {...defaultProps} className='custom-class' />);

		const container = screen.getByText('Achievements').closest('div');
		expect(container).toHaveClass('custom-class');
	});

	it('uses default placeholder when not provided', () => {
		const propsWithoutPlaceholder = {
			form: mockForm,
			fieldPath: 'experience.0.bullets',
		};

		render(<BulletManager {...propsWithoutPlaceholder} />);

		const inputs = screen.getAllByPlaceholderText('Enter bullet point...');
		expect(inputs).toHaveLength(2);
	});

	it('uses default label when not provided', () => {
		const propsWithoutLabel = {
			form: mockForm,
			fieldPath: 'experience.0.bullets',
		};

		render(<BulletManager {...propsWithoutLabel} />);

		expect(screen.getByText('Bullets')).toBeInTheDocument();
	});
});
