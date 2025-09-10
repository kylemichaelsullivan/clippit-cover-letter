'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/buttons';
import { EducationContent } from './';
import { EducationDialogs } from './EducationDialogs';
import { Error } from '@/components/ui/feedback';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Field } from '@tanstack/react-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SkipLinkTarget } from '@/components/ui/navigation';
import { useFocusNewEducation } from '@/lib/hooks';

import type { ParsedEducation } from '@/lib/utils';

type EducationSectionProps = {
	form: any; // TanStack Form
	addEducation: () => void;
	handleFieldChange?: (fieldName: string, value: any) => void;
	removeEducation: (educationIndex: number) => void;
	error?: string;
	onPaste?: (educationEntries: any[], educationIndex?: number) => void;
};

export function EducationSection({
	form,
	addEducation,
	handleFieldChange,
	removeEducation,
	error,
	onPaste,
}: EducationSectionProps) {
	const { registerFocusRef, focusNewEducation } = useFocusNewEducation();
	const [showImportConfirmation, setShowImportConfirmation] = useState(false);
	const [pendingEducation, setPendingEducation] = useState<ParsedEducation[]>(
		[],
	);
	const [pendingEducationIndex, setPendingEducationIndex] = useState<
		number | undefined
	>();

	const handleEducationPaste = (
		educationEntries: ParsedEducation[],
		educationIndex?: number,
	) => {
		setPendingEducation(educationEntries);
		setPendingEducationIndex(educationIndex);
		setShowImportConfirmation(true);
	};

	const handleConfirmImport = () => {
		setShowImportConfirmation(false);
		setPendingEducation([]);
		setPendingEducationIndex(undefined);
		onPaste?.(pendingEducation, pendingEducationIndex);
	};

	const handleCancelImport = () => {
		setShowImportConfirmation(false);
		setPendingEducation([]);
		setPendingEducationIndex(undefined);
	};

	return (
		<div className='EducationSection'>
			<Field name='education' form={form}>
				{() => {
					return (
						<>
							{error && (
								<Error componentName='EducationSectionError'>{error}</Error>
							)}

							<EducationContent
								form={form}
								removeEducation={removeEducation}
								handleFieldChange={handleFieldChange}
								onPaste={handleEducationPaste}
								registerFocusRef={registerFocusRef}
							/>

							<SkipLinkTarget
								className='flex justify-center pt-4'
								id='AddEducationButton'
							>
								<Button
									componentName='AddEducationButton'
									onClick={() => {
										const newEducationIndex = addEducation();
										if (newEducationIndex !== undefined) {
											focusNewEducation(newEducationIndex);
										}
									}}
									title='Add Education'
									color='secondary'
									id='AddEducationButton'
								>
									<FontAwesomeIcon icon={faPlus} aria-hidden='true' />
								</Button>
							</SkipLinkTarget>
						</>
					);
				}}
			</Field>

			<EducationDialogs
				pendingEducation={pendingEducation}
				showImportConfirmation={showImportConfirmation}
				onConfirmImport={handleConfirmImport}
				onCancelImport={handleCancelImport}
			/>
		</div>
	);
}
