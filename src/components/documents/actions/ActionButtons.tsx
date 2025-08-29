'use client';

import clsx from 'clsx';

import {
	DownloadButtonMD,
	DownloadButtonPDF,
	DownloadButtonTXT,
	CopyButton,
} from './';
import type { CandidateDetails } from '@/types';

type ActionButtonsProps = {
	text: string;
	filename: string;
	candidateDetails: CandidateDetails;
	className?: string;
	disabled?: boolean;
	fontSize?: number;
	documentType?: string;
};

export function ActionButtons({
	text,
	filename,
	candidateDetails,
	className,
	disabled = false,
	fontSize,
	documentType,
}: ActionButtonsProps) {
	return (
		<div
			className={clsx(
				'ActionButtons border-gray flex flex-wrap gap-2 border-t pt-3 sm:flex-row sm:justify-end sm:gap-2 sm:pt-4',
				className,
			)}
		>
			<CopyButton
				text={text}
				documentType={documentType}
				candidateDetails={candidateDetails}
				disabled={disabled}
			/>

			<DownloadButtonPDF
				content={text}
				title='PDF'
				filename={filename}
				documentType={documentType}
				candidateDetails={candidateDetails}
				fontSize={fontSize}
				disabled={disabled}
			/>

			<DownloadButtonMD
				content={text}
				size='flex'
				title='MD'
				filename={filename}
				documentType={documentType}
				candidateDetails={candidateDetails}
				disabled={disabled}
			/>

			<DownloadButtonTXT
				content={text}
				filename={filename}
				documentType={documentType}
				candidateDetails={candidateDetails}
				disabled={disabled}
				aria-label='Download TXT'
				title='Download TXT'
			/>
		</div>
	);
}
