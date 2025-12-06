'use client';

import clsx from 'clsx';

import type { CandidateDetails, DocumentType, FontSize } from '@/types';
import {
	CopyButton,
	DownloadButtonMD,
	DownloadButtonPDF,
	DownloadButtonTXT,
} from './';

type ActionButtonsProps = {
	text: string;
	filename: string;
	candidateDetails: CandidateDetails;
	className?: string;
	documentType?: DocumentType;
	fontSize?: FontSize;
	disabled?: boolean;
};

export function ActionButtons({
	text,
	filename,
	candidateDetails,
	className,
	documentType,
	fontSize,
	disabled = false,
}: ActionButtonsProps) {
	return (
		<div className={clsx('ActionButtons flex flex-wrap gap-2 pt-2', className)}>
			<CopyButton
				text={text}
				disabled={disabled}
				documentType={documentType}
				candidateDetails={candidateDetails}
			/>

			<DownloadButtonPDF
				content={text}
				title='PDF'
				fontSize={fontSize ? `${fontSize[0]}${fontSize[1]}` : '11pt'}
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
				candidateDetails={candidateDetails}
			/>

			<DownloadButtonTXT
				content={text}
				title='TXT'
				filename={filename}
				documentType={documentType}
				disabled={disabled}
				candidateDetails={candidateDetails}
			/>
		</div>
	);
}
