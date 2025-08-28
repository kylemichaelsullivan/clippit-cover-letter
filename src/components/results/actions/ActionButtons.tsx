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
		<div className={clsx('ActionButtons flex flex-wrap gap-2 pt-2', className)}>
			<CopyButton text={text} disabled={disabled} documentType={documentType} />

			<DownloadButtonPDF
				content={text}
				title='PDF'
				fontSize={fontSize}
				filename={filename}
				documentType={documentType}
				candidateDetails={candidateDetails}
				disabled={disabled}
			/>

			<DownloadButtonMD
				content={text}
				title='MD'
				size='flex'
				filename={filename}
				documentType={documentType}
				disabled={disabled}
			/>

			<DownloadButtonTXT
				content={text}
				title='TXT'
				filename={filename}
				documentType={documentType}
				disabled={disabled}
			/>
		</div>
	);
}
