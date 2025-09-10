import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EducationDialogs } from '@/components/forms/resume/EducationDialogs';
import type { ParsedEducation } from '@/lib/utils';

describe('EducationDialogs', () => {
	const mockOnConfirmImport = vi.fn();
	const mockOnCancelImport = vi.fn();

	const sampleEducation: ParsedEducation[] = [
		{
			degree: 'Juris Doctor',
			institution: 'Western Michigan University Thomas M. Cooley Law School',
			location: 'Grand Rapids, MI',
			graduationYear: undefined,
		},
		{
			degree: "Bachelor's Degree",
			institution: 'University of Michigan',
			location: 'Ann Arbor, MI',
			graduationYear: '2020',
		},
	];

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders confirmation dialog when showImportConfirmation is true', () => {
		render(
			<EducationDialogs
				pendingEducation={sampleEducation}
				showImportConfirmation={true}
				onConfirmImport={mockOnConfirmImport}
				onCancelImport={mockOnCancelImport}
			/>,
		);

		expect(
			screen.getByText('Import Multiple Education Entries'),
		).toBeInTheDocument();
		expect(screen.getByText('Import')).toBeInTheDocument();
		expect(screen.getByText('Cancel')).toBeInTheDocument();
	});

	it('does not render dialog when showImportConfirmation is false', () => {
		render(
			<EducationDialogs
				pendingEducation={sampleEducation}
				showImportConfirmation={false}
				onConfirmImport={mockOnConfirmImport}
				onCancelImport={mockOnCancelImport}
			/>,
		);

		expect(
			screen.queryByText('Import Multiple Education Entries'),
		).not.toBeInTheDocument();
	});

	it('displays formatted education entries in the message', () => {
		render(
			<EducationDialogs
				pendingEducation={sampleEducation}
				showImportConfirmation={true}
				onConfirmImport={mockOnConfirmImport}
				onCancelImport={mockOnCancelImport}
			/>,
		);

		expect(screen.getByText(/Degree: Juris Doctor/)).toBeInTheDocument();
		expect(
			screen.getByText(
				/Institution: Western Michigan University Thomas M. Cooley Law School/,
			),
		).toBeInTheDocument();
		expect(screen.getByText(/Location: Grand Rapids, MI/)).toBeInTheDocument();
		expect(screen.getByText(/Degree: Bachelor's Degree/)).toBeInTheDocument();
		expect(
			screen.getByText(/Institution: University of Michigan/),
		).toBeInTheDocument();
		expect(screen.getByText(/Location: Ann Arbor, MI/)).toBeInTheDocument();
		expect(screen.getByText(/Graduation Year: 2020/)).toBeInTheDocument();
	});

	it('handles education entries without location', () => {
		const educationWithoutLocation: ParsedEducation[] = [
			{
				degree: 'Bachelor of Science',
				institution: 'University of California',
				location: '',
				graduationYear: undefined,
			},
		];

		render(
			<EducationDialogs
				pendingEducation={educationWithoutLocation}
				showImportConfirmation={true}
				onConfirmImport={mockOnConfirmImport}
				onCancelImport={mockOnCancelImport}
			/>,
		);

		expect(screen.getByText(/Degree: Bachelor of Science/)).toBeInTheDocument();
		expect(
			screen.getByText(/Institution: University of California/),
		).toBeInTheDocument();
		expect(screen.queryByText(/Location:/)).not.toBeInTheDocument();
	});

	it('calls onConfirmImport when Import button is clicked', () => {
		render(
			<EducationDialogs
				pendingEducation={sampleEducation}
				showImportConfirmation={true}
				onConfirmImport={mockOnConfirmImport}
				onCancelImport={mockOnCancelImport}
			/>,
		);

		const importButton = screen.getByText('Import');
		fireEvent.click(importButton);

		expect(mockOnConfirmImport).toHaveBeenCalled();
	});

	it('calls onCancelImport when Cancel button is clicked', () => {
		render(
			<EducationDialogs
				pendingEducation={sampleEducation}
				showImportConfirmation={true}
				onConfirmImport={mockOnConfirmImport}
				onCancelImport={mockOnCancelImport}
			/>,
		);

		const cancelButton = screen.getByText('Cancel');
		fireEvent.click(cancelButton);

		expect(mockOnCancelImport).toHaveBeenCalled();
	});

	it('handles empty education array', () => {
		render(
			<EducationDialogs
				pendingEducation={[]}
				showImportConfirmation={true}
				onConfirmImport={mockOnConfirmImport}
				onCancelImport={mockOnCancelImport}
			/>,
		);

		expect(screen.getByText('Import Education Entry')).toBeInTheDocument();
		// Empty array should show no education data
		expect(screen.queryByText(/Degree:/)).not.toBeInTheDocument();
	});

	it('formats education entries correctly with all fields', () => {
		const completeEducation: ParsedEducation[] = [
			{
				degree: 'Master of Science',
				institution: 'Stanford University',
				location: 'Stanford, CA',
				graduationYear: '2022',
			},
		];

		render(
			<EducationDialogs
				pendingEducation={completeEducation}
				showImportConfirmation={true}
				onConfirmImport={mockOnConfirmImport}
				onCancelImport={mockOnCancelImport}
			/>,
		);

		expect(screen.getByText(/Degree: Master of Science/)).toBeInTheDocument();
		expect(
			screen.getByText(/Institution: Stanford University/),
		).toBeInTheDocument();
		expect(screen.getByText(/Location: Stanford, CA/)).toBeInTheDocument();
		expect(screen.getByText(/Graduation Year: 2022/)).toBeInTheDocument();
	});
});
