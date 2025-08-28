'use client';

import { Button } from '@/components/ui/buttons';
import { downloadTXT } from '@/lib/utils';
import { useIsClient } from '@/lib/hooks';

type DownloadButtonTXTProps = {
	content: string;
	title: string;
	filename: string;
	documentType?: string;
	disabled?: boolean;
};

export function DownloadButtonTXT({
	content,
	title,
	filename,
	documentType,
	disabled = false,
}: DownloadButtonTXTProps) {
	const isClient = useIsClient();
	const hasContent = content && content.trim() !== '';
	const isDisabled = !isClient || disabled || !hasContent;

	const handleDownloadTXT = () => {
		if (isClient && hasContent) {
			downloadTXT(content, filename, documentType);
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
