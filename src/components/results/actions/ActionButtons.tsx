'use client';

import clsx from 'clsx';

import {
	DownloadButtonMD,
	DownloadButtonPDF,
	DownloadButtonTXT,
	CopyButton,
} from './';

type ActionButtonsProps = {
	text: string;
	filename: string;
	className?: string;
	disabled?: boolean;
};

export function ActionButtons({
	text,
	filename,
	className,
	disabled = false,
}: ActionButtonsProps) {
	return (
		<div
			className={clsx(
				'ActionButtons border-gray flex flex-wrap gap-2 border-t pt-3 sm:flex-row sm:justify-end sm:gap-2 sm:pt-4',
				className,
			)}
		>
			<CopyButton text={text} disabled={disabled} />

			<DownloadButtonPDF
				content={text}
				title='PDF'
				filename={filename}
				disabled={disabled}
			/>

			<DownloadButtonMD
				content={text}
				size='flex'
				title='MD'
				filename={filename}
				disabled={disabled}
			/>

			<DownloadButtonTXT
				content={text}
				title='TXT'
				filename={filename}
				disabled={disabled}
			/>
		</div>
	);
}
