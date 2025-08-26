'use client';

import { memo, useState } from 'react';

import { Button } from '@/components/ui/buttons';
import { Checkbox } from '@/components/ui/input';
import { FormFieldContainer } from '@/components/forms/core';
import { FormFieldLabel } from '@/components/ui/FormFieldLabel';
import { ModalBackdrop } from '@/components/ui/feedback/ModalBackdrop';
import { ModalHeader } from '@/components/ui/feedback/ModalHeader';
import { useModalClose } from '@/lib/hooks/useModalClose';

type DatePickerProps = {
	label: string;
	value: string;
	onChange: (value: string) => void;
	isEndDate?: boolean;
	className?: string;
};

const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const generateYearOptions = () => {
	const currentYear = new Date().getFullYear();
	const years = [];
	for (let year = currentYear; year >= 1970; year--) {
		years.push({ value: year.toString(), label: year.toString() });
	}
	return years;
};

const YEARS = generateYearOptions();

export const DatePicker = memo(function DatePicker({
	label,
	value,
	onChange,
	isEndDate = false,
	className,
}: DatePickerProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [tempMonth, setTempMonth] = useState('');
	const [tempYear, setTempYear] = useState('');
	const [tempIsPresent, setTempIsPresent] = useState(false);

	const modalRef = useModalClose({ onClose: () => setIsOpen(false), isOpen });

	const parseDate = (dateString: string) => {
		if (dateString === 'Present') return { month: '', year: '' };

		const parts = dateString.split(' ');
		if (parts.length === 2) {
			return { month: parts[0], year: parts[1] };
		}
		return { month: '', year: '' };
	};

	const formatDate = (month: string, year: string) => {
		if (!month && !year) return '';
		if (!month) return year;
		if (!year) return month;
		return `${month} ${year}`;
	};

	const { month: currentMonth, year: currentYear } = parseDate(value);
	const isPresent = value === 'Present';

	const handleOpen = () => {
		setTempMonth(currentMonth);
		setTempYear(currentYear);
		setTempIsPresent(isPresent);
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	const handleSave = () => {
		if (tempIsPresent) {
			onChange('Present');
		} else {
			const newDate = formatDate(tempMonth, tempYear);
			onChange(newDate);
		}
		setIsOpen(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleOpen();
		}
	};

	const displayValue = value || '';

	return (
		<>
			<FormFieldContainer className={className}>
				<FormFieldLabel title={label} aria-label={label}>
					{label}
				</FormFieldLabel>

				<input
					type='text'
					role='button'
					value={displayValue}
					className='w-full cursor-pointer text-sm sm:text-base'
					readOnly
					placeholder='Select date…'
					tabIndex={0}
					aria-haspopup='dialog'
					aria-expanded={isOpen}
					aria-label={`Select ${label.toLowerCase()}. Press Enter or Space to open date picker.`}
					title={`Select ${label}`}
					onClick={handleOpen}
					onKeyDown={handleKeyDown}
				/>
			</FormFieldContainer>

			{isOpen && (
				<ModalBackdrop ref={modalRef} className='DatePickerModal'>
					<ModalHeader title={`Select ${label}`} onClose={handleClose} />

					<div className='flex flex-col gap-4'>
						{isEndDate && (
							<div className='flex justify-center'>
								<Checkbox
									label='Present'
									checked={tempIsPresent}
									title='Present Position?'
									aria-label='Mark as present position?'
									onChange={setTempIsPresent}
								/>
							</div>
						)}

						<div
							className={`flex gap-2 ${tempIsPresent ? 'pointer-events-none opacity-50' : ''}`}
						>
							<select
								value={tempMonth}
								className={`flex-1 text-sm sm:text-base ${tempIsPresent ? 'cursor-not-allowed' : ''}`}
								disabled={tempIsPresent}
								aria-label='Select month'
								title='Select Month'
								onChange={(e) => setTempMonth(e.target.value)}
							>
								<option value=''>Month</option>
								{MONTHS.map((month) => (
									<option key={month} value={month}>
										{month}
									</option>
								))}
							</select>

							<div className='flex-1'>
								<input
									type='text'
									value={tempYear}
									onChange={(e) => setTempYear(e.target.value)}
									className={`w-full text-sm sm:text-base ${tempIsPresent ? 'cursor-not-allowed' : ''}`}
									placeholder='Year'
									list='year-options'
									disabled={tempIsPresent}
									aria-label='Enter or select year'
									title='Select Year'
								/>
								<datalist id='year-options'>
									{YEARS.map((year) => (
										<option key={year.value} value={year.value} />
									))}
								</datalist>
							</div>
						</div>

						<div className='flex justify-center gap-3'>
							<Button
								componentName='DatePickerSaveButton'
								color='primary'
								size='sm'
								aria-label='Save date'
								title='Save Date'
								onClick={handleSave}
							>
								Save
							</Button>
						</div>
					</div>
				</ModalBackdrop>
			)}
		</>
	);
});
