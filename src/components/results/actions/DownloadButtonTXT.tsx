'use client';

import { Button } from '@/components/ui/buttons';
import { useIsClient } from '@/lib/hooks';
import { downloadTXT } from '@/lib/utils';

import type { CandidateDetails, DocumentType } from '@/types';

type DownloadButtonTXTProps = {
	content: string;
	title: string;
	filename: string;
	documentType?: DocumentType;
	candidateDetails?: CandidateDetails;
	disabled?: boolean;
};

export function DownloadButtonTXT({
	content,
	title,
	filename,
	documentType,
	candidateDetails,
	disabled = false,
}: DownloadButtonTXTProps) {
	const isClient = useIsClient();
	const hasContent = content && content.trim() !== '';
	const isDisabled = !isClient || disabled || !hasContent;

	const handleDownloadTXT = () => {
		if (isClient && hasContent) {
			downloadTXT(content, filename, documentType, candidateDetails);
		}
	};

	return (
		<Button
			componentName='DownloadButtonTXT'
			color='primary'
			size='flex'
			disabled={isDisabled}
			title={`${title}`}
			aria-label={`${title} as TXT`}
			onClick={handleDownloadTXT}
		>
			{title}
		</Button>
	);
}
