'use client';

import { Button } from '@/components/ui/buttons';
import { useIsClient } from '@/lib/hooks';
import { showToast } from '@/lib/toast';

type DownloadButtonTXTProps = {
	content: string;
	title: string;
	filename: string;
	disabled?: boolean;
};

export function DownloadButtonTXT({
	content,
	title,
	filename,
	disabled = false,
}: DownloadButtonTXTProps) {
	const isClient = useIsClient();
	const hasContent = content && content.trim() !== '';
	const isDisabled = !isClient || disabled || !hasContent;

	const handleDownloadTXT = () => {
		if (isClient && hasContent) {
			try {
				const blob = new Blob([content], { type: 'text/plain' });
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = `${filename}.txt`;
				a.click();
				URL.revokeObjectURL(url);
				showToast.success('Text file downloaded');
			} catch {
				showToast.error('Failed to download text file');
			}
		}
	};

	return (
		<Button
			componentName='DownloadButtonTXT'
			color='primary'
			size='flex'
			title={`${title}`}
			aria-label={`${title} as TXT`}
			onClick={handleDownloadTXT}
			disabled={isDisabled}
		>
			{title}
		</Button>
	);
}
